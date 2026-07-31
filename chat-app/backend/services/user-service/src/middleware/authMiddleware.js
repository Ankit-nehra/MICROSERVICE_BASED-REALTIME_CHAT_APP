import AppError from "../utils/AppError.js";


const authMiddleware = (
 req,
 res,
 next
)=>{


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



const userId =
req.headers["x-auth-user-id"];



if(!userId){

 return next(
  new AppError(
   "User identity missing",
   401
  )
 );

}



req.user = {

 userId

};



next();


};


export default authMiddleware;