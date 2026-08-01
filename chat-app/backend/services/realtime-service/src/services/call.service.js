// services/call.service.js

import {
  redisClient
} from "../config/redis.js";


const activeCallKey = (userId)=>
`active_call:${String(userId)}`;


const incomingCallKey = (userId)=>
`incoming_call:${String(userId)}`;



// ==============================
// CHECK ACTIVE CALL
// ==============================

export const isUserBusy = async(userId)=>{

  const result =
    await redisClient.exists(
      activeCallKey(userId)
    );


  return result === 1;

};





// ==============================
// SAVE INCOMING CALL
// ==============================

export const createIncomingCall = async(
receiverId,
data
)=>{


 await redisClient.set(

  incomingCallKey(receiverId),

  JSON.stringify(data),

  {
    EX:60
  }

 );


};






// ==============================
// GET INCOMING CALL
// ==============================

export const getIncomingCall = async(
receiverId
)=>{


 const data =
 await redisClient.get(
  incomingCallKey(receiverId)
 );


 if(!data)
 return null;



 return JSON.parse(data);


};






// ==============================
// REMOVE INCOMING CALL
// ==============================

export const removeIncomingCall = async(
userId
)=>{


 await redisClient.del(

  incomingCallKey(userId)

 );


};







// ==============================
// START ACTIVE CALL
// ==============================

export const startCall = async(
user1,
user2,
callType
)=>{


const time =
new Date().toISOString();



await redisClient.set(

activeCallKey(user1),

JSON.stringify({

with:String(user2),

type:callType,

startedAt:time

}),

{
EX:3600
}

);





await redisClient.set(

activeCallKey(user2),

JSON.stringify({

with:String(user1),

type:callType,

startedAt:time

}),

{
EX:3600
}

);



};








// ==============================
// GET ACTIVE CALL
// ==============================

export const getActiveCall = async(
userId
)=>{


const data =
await redisClient.get(
activeCallKey(userId)
);



if(!data)
return null;



return JSON.parse(data);


};








// ==============================
// END CALL
// ==============================

export const endCall = async(
userId
)=>{


const current =
await getActiveCall(userId);



if(!current)
return null;



await redisClient.del(

activeCallKey(userId)

);



await redisClient.del(

activeCallKey(
current.with
)

);



return current.with;


};