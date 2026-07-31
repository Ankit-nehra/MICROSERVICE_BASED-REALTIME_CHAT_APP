import crypto from "crypto";

import {
  redisClient,
} from "../config/redis.js";


const SESSION_EXPIRE_SECONDS =
  Number(process.env.SESSION_EXPIRE_SECONDS) ||
  60 * 60 * 24 * 7;


// Create new session
export const createSession = async (
  userId
) => {


  if(
    !redisClient.isReady
  ){

    throw new Error(
      "Redis is not ready"
    );

  }


  // Remove previous active session
  const oldSessionId =
    await redisClient.get(
      `user_active_session:${userId}`
    );


 if(oldSessionId){
  const deleted =
    await redisClient.del(
      `session:${oldSessionId}`
    );

}



  const sessionId =
    crypto.randomUUID();



  const sessionData = {

    userId,

    createdAt:
      new Date().toISOString(),

  };


await redisClient.set(
  `session:${sessionId}`,
  JSON.stringify(sessionData),
  {
    EX: SESSION_EXPIRE_SECONDS,
  }
);

await redisClient.set(
  `user_active_session:${userId}`,
  sessionId,
  {
    EX: SESSION_EXPIRE_SECONDS,
  }
);

return sessionId;



  

};





// Get session
export const getSession = async (
  sessionId
) => {


  if(
    !redisClient.isReady
  ){

    return null;

  }



  const session =
    await redisClient.get(
      `session:${sessionId}`
    );



  if(!session){

    return null;

  }



  return JSON.parse(
    session
  );

};





// Delete session
export const deleteSession = async (
  sessionId,
  userId
) => {

await redisClient.del(
  `session:${sessionId}`
);

if(userId){

const activeSession =
 await redisClient.get(
 `user_active_session:${userId}`
 );

if(
 activeSession === sessionId
){

 await redisClient.del(
  `user_active_session:${userId}`
 );


}

}


};