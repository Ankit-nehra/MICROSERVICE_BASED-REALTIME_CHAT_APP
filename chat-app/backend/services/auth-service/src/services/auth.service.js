import bcrypt from "bcryptjs";
import axios from "axios";
import User from "../models/user.model.js";

import AppError from "../utils/AppError.js";
import {
  createSession,
  deleteSession,
  
} from "./session.service.js";

import {
  generateToken,
} from "../utils/generateToken.js";

import sanitizeUser from "../utils/sanitizeUser.js";


export const registerUser = async ({
  name,
  email,
  password,
}) => {

  const userExists =
    await User.findOne({
      email,
    });


  if(userExists){

    throw new AppError(
      "User already exists",
      409
    );

  }


  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );


  const user =
    await User.create({

      email,

      password: hashedPassword,

    });


  // create user profile in user-service
  await axios.post(
    "http://user-service:5002/api/users/profile",
    {
      userId: user._id.toString(),
      name,
      email
    }
  );


  return {

    user:
    sanitizeUser(user),

  };

};




export const loginUser = async ({
  email,
  password,
}) => {


  const user =
    await User.findOne({
      email,
    })
    .select("+password");



  if(!user){

    throw new AppError(
      "Invalid credentials",
      401
    );

  }



  const isMatch =
    await bcrypt.compare(

      password,

      user.password

    );



  if(!isMatch){

    throw new AppError(
      "Invalid credentials",
      401
    );

  }




  // createSession automatically removes old device session

  const sessionId =
    await createSession(
      user._id.toString()
    );



  const token =
    generateToken(

      user._id.toString(),

      sessionId

    );



  return {

    user:
      sanitizeUser(user),

    token,

  };

};



export const logoutUser = async (
  sessionId,
  userId
)=>{


  if (!sessionId) {

    throw new AppError(
      "Session not found",
      400
    );

  }


  await deleteSession(
    sessionId,
    userId
  );


};