// import express from "express";

// import {
//  fetchAllUsers,
//  createUser
// } from "../controllers/user.controller.js";

// import authMiddleware from "../middleware/authMiddleware.js";


// const router =
// express.Router();



// router.post(
//  "/profile",
//  createUser
// );



// router.use(
//  authMiddleware
// );



// router.get(
//  "/",
//  fetchAllUsers
// );



// export default router;
import express from "express";

import {
  fetchAllUsers,
  createUser,
  fetchMyProfile,
  fetchUserProfile,
  editProfile,
} from "../controllers/user.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// ---------- Public Routes ----------

router.post(
  "/profile",
  createUser
);


// ---------- Protected Routes ----------

router.use(
  authMiddleware
);


// Current Logged-in User

router.get(
  "/me",
  fetchMyProfile
);


// All Users

router.get(
  "/",
  fetchAllUsers
);


// Single User Profile

router.get(
  "/:userId",
  fetchUserProfile
);


// Update Profile

router.patch(
  "/profile",
  editProfile
);


export default router;