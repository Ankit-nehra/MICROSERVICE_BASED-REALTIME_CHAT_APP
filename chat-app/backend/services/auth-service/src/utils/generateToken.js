import jwt from "jsonwebtoken";

import AppError from "./AppError.js";


export const generateToken = (
  userId,
  sessionId
) => {


  if(!process.env.JWT_SECRET){

    throw new AppError(
      "JWT configuration missing",
      500
    );

  }


  return jwt.sign(

    {
      userId,
      sessionId,
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "7d",
    }

  );

};