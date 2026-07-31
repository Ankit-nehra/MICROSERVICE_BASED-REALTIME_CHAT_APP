import {
  sendMessage,
  getConversation,
  markMessagesAsRead,
  getUnreadCount,
} from "../services/chat.service.js";

import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/ApiResponse.js";



export const send = asyncHandler(
  async (req, res) => {

    const result =
      await sendMessage({

        ...req.body,

        senderId:
          req.user.userId,

      });

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Message sent successfully",
          result
        )
      );

  }
);



export const getMessages = asyncHandler(
  async (req, res) => {

    const result =
      await getConversation(

        req.user.userId,

        req.params.otherUserId

      );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Messages fetched successfully",
          result
        )
      );

  }
);



export const markAsRead = asyncHandler(
  async (req, res) => {

    await markMessagesAsRead(

      req.body.senderId,

      req.user.userId

    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Messages marked as read"
        )
      );

  }
);



export const unreadCount = asyncHandler(
  async (req, res) => {

    const count =
      await getUnreadCount(
        req.user.userId
      );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Unread count fetched successfully",
          {
            unreadCount: count,
          }
        )
      );

  }
);