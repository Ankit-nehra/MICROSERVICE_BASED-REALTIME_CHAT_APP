import {
  redisClient
} from "../config/redis.js";

import {
  redisKeys
} from "../utils/redisKeys.js";



const PRESENCE_EXPIRE =
  60 * 60 * 24;



export const setUserOnline =
async (
  userId,
  socketId
)=>{


  const data = {

    socketId,

    status:
      "online",

    lastSeen:
      new Date()
      .toISOString(),

  };



  await redisClient.set(

    redisKeys.userPresence(userId),

    JSON.stringify(data),

    {
      EX:
      PRESENCE_EXPIRE
    }

  );



  await redisClient.sAdd(

    redisKeys.onlineUsers,

    userId

  );


};





export const setUserOffline =
async (
 userId
)=>{


 await redisClient.del(

   redisKeys.userPresence(userId)

 );


 await redisClient.sRem(

   redisKeys.onlineUsers,

   userId

 );


};





export const getUserPresence =
async(
 userId
)=>{


 const data =
 await redisClient.get(

  redisKeys.userPresence(userId)

 );


 if(!data){

  return null;

 }


 return JSON.parse(data);


};





export const getOnlineUsers =
async()=>{


 const users =
 await redisClient.sMembers(

   redisKeys.onlineUsers

 );


 return users;


};