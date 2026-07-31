

import {
  createUserProfile,
  getAllUsers,
  getMyProfile,
  getUserById,
  updateProfile,
} from "../services/user.service.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";



export const createUser = asyncHandler(
  async (req, res) => {

    const user =
      await createUserProfile(
        req.body
      );

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "User profile created",
          user
        )
      );

  }
);



export const fetchAllUsers = asyncHandler(
  async (req, res) => {

    const users =
      await getAllUsers();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Users fetched successfully",
          users
        )
      );

  }
);



export const fetchMyProfile = asyncHandler(
  async (req, res) => {

    const user =
      await getMyProfile(
        req.user.userId
      );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Profile fetched successfully",
          user
        )
      );

  }
);



export const fetchUserProfile = asyncHandler(
  async (req, res) => {

    const user =
      await getUserById(
        req.params.userId
      );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "User fetched successfully",
          user
        )
      );

  }
);



export const editProfile = asyncHandler(
  async (req, res) => {

    const updatedUser =
      await updateProfile(
        req.user.userId,
        req.body
      );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Profile updated successfully",
          updatedUser
        )
      );

  }
);

