import express from "express";

import {
  registerProxy,
  loginProxy,
  logoutProxy,
} from "../proxy/auth.proxy.js";


import authMiddleware from "../middleware/authMiddleware.js";


const router =
express.Router();



router.post(
"/register",
registerProxy
);



router.post(
"/login",
loginProxy
);



router.post(
"/logout",
authMiddleware,
logoutProxy
);



export default router;