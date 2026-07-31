

import api from "./axios";


// Get all users
export const getUsers = () =>
  api.get("/users");



// Get current logged-in user profile
export const getMyProfile = () =>
  api.get("/users/me");



// Get any user's profile by id
export const getUserProfile = (
  userId
) =>
  api.get(
    `/users/${userId}`
  );



// Update current user's profile
export const updateProfile = (
  data
) =>
  api.patch(
    "/users/profile",
    data
  );



// Optional: online users
export const getOnlineUsers = () =>
  api.get("/users/online");