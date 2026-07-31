
import express from "express";

import {
  getUsersProxy,
  getMyProfileProxy,
  getUserProfileProxy,
  updateProfileProxy,
} from "../proxy/user.proxy.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// All routes require authentication

router.use(
  authMiddleware
);


// Current logged-in user

router.get(
  "/me",
  getMyProfileProxy
);


// All users

router.get(
  "/",
  getUsersProxy
);


// Single user profile

router.get(
  "/:userId",
  getUserProfileProxy
);


// Update profile

router.patch(
  "/profile",
  updateProfileProxy
);


export default router;