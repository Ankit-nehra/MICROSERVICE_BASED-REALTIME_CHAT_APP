import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";

import {
  redisClient,
} from "../config/redis.js";



const authMiddleware =
async (
 req,
 res,
 next
)=>{


try{


const authHeader =
req.headers.authorization;



if(
 !authHeader ||
 !authHeader.startsWith("Bearer ")
){

 return next(
  new AppError(
   "Authentication required",
   401
  )
 );

}



const token =
authHeader.split(" ")[1];



const decoded =
jwt.verify(
 token,
 process.env.JWT_SECRET
);



const {
 userId,
 sessionId,
} = decoded;



if(
 !userId ||
 !sessionId
){

 return next(
  new AppError(
   "Invalid token",
   401
  )
 );

}




const session =
await redisClient.get(
 `session:${sessionId}`
);



if(!session){

 return next(
  new AppError(
   "Session expired",
   401
  )
 );

}




const sessionData =
JSON.parse(session);



if(
 sessionData.userId !== userId
){

 return next(
  new AppError(
   "Invalid session",
   401
  )
 );

}




const activeSession =
await redisClient.get(
 `user_active_session:${userId}`
);



if(
 activeSession !== sessionId
){

 return next(
  new AppError(
   "Session expired on another device",
   401
  )
 );

}




req.user={

 userId,

 sessionId,

};



next();



}
catch(error){


if(
 error.name === "JsonWebTokenError" ||
 error.name === "TokenExpiredError"
){

 return next(
  new AppError(
   "Invalid or expired token",
   401
  )
 );

}


next(error);


}


};



export default authMiddleware;