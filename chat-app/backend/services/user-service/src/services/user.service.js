

import User from "../models/user.model.js";

import AppError from "../utils/AppError.js";



export const createUserProfile = async ({
  userId,
  name,
  email,
}) => {

  const existingUser =
    await User.findOne({
      userId,
    });

  if (existingUser) {

    return existingUser;

  }


  const user =
    await User.create({

      userId,

      name,

      email,

    });


  return user;

};





export const getAllUsers = async () => {

  return await User.find(
    {},
    "userId name email description avatar"
  );

};





export const getMyProfile = async (
  userId
) => {

  const user =
    await User.findOne(
      {
        userId,
      },
      "userId name email description avatar"
    );


  if (!user) {

    throw new AppError(
      "Profile not found",
      404
    );

  }


  return user;

};





export const getUserById = async (
  userId
) => {

  const user =
    await User.findOne(
      {
        userId,
      },
      "userId name email description avatar"
    );


  if (!user) {

    throw new AppError(
      "User not found",
      404
    );

  }


  return user;

};






export const updateProfile = async (
  userId,
  payload
) => {

  const updates = {};


  if (
    payload.name !== undefined
  ) {

    updates.name =
      payload.name.trim();

  }


  if (
    payload.description !== undefined
  ) {

    updates.description =
      payload.description.trim();

  }


  if (
    payload.avatar !== undefined
  ) {

    updates.avatar =
      payload.avatar;

  }


  const updatedUser =
    await User.findOneAndUpdate(

      {
        userId,
      },

      {
        $set: updates,
      },

      {
        new: true,
        runValidators: true,
      }

    );


  if (!updatedUser) {

    throw new AppError(
      "Profile not found",
      404
    );

  }


  return updatedUser;

};