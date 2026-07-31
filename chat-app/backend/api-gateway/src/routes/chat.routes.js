import express from "express";


import {
 sendMessageProxy,
 getConversationProxy,
 markReadProxy,
 unreadCountProxy,
} from "../proxy/chat.proxy.js";


import authMiddleware from "../middleware/authMiddleware.js";


const router =
express.Router();



router.use(
authMiddleware
);



router.post(
"/send",
sendMessageProxy
);



router.get(
"/conversation/:otherUserId",
getConversationProxy
);



router.patch(
"/read",
markReadProxy
);



router.get(
"/unread",
unreadCountProxy
);



export default router;