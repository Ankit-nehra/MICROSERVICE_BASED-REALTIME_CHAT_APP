import express from "express";

import {
  send,
  getMessages,
  markAsRead,
  unreadCount,
} from "../controllers/chat.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import validate from "../middleware/validate.middleware.js";

import {
  sendMessageSchema,
  markAsReadSchema,
} from "../validators/chat.validator.js";

const router = express.Router();

router.use(
  authMiddleware
);

router.post(
  "/send",
  validate(sendMessageSchema),
  send
);

router.get(
  "/conversation/:otherUserId",
  getMessages
);

router.patch(
  "/read",
  validate(markAsReadSchema),
  markAsRead
);

router.get(
  "/unread",
  unreadCount
);

export default router;