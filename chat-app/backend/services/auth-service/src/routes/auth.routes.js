import express from "express";

import {
  login,
  register,
  logout,
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router =
  express.Router();



router.post(
  "/register",
  
  register
);



router.post(
  "/login",
  validate(loginSchema),
  login
);



router.post(
  "/logout",
  authMiddleware,
  logout
);



export default router;