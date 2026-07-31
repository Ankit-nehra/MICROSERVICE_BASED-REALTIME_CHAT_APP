import express from "express";


import {
 realtimeHealthProxy,
} from "../proxy/realtime.proxy.js";


import authMiddleware from "../middleware/authMiddleware.js";


const router =
express.Router();



router.get(
"/health",
authMiddleware,
realtimeHealthProxy
);



export default router;