import Message from "../models/message.model.js";

import AppError from "../utils/AppError.js";


export const sendMessage = async ({
  senderId,
  receiverId,
  content,
  messageType = "text",
}) => {
   console.log("SAVE MESSAGE", {
   senderId,
   receiverId
 });

  if (
    !senderId ||
    !receiverId
  ) {

    throw new AppError(
      "Sender and receiver are required",
      400
    );

  }


  if (
    !content?.trim()
  ) {

    throw new AppError(
      "Message cannot be empty",
      400
    );

  }


  const newMessage =
    await Message.create({

      senderId,

      receiverId,

      content:
        content.trim(),

      messageType,

    });


  return newMessage;

};



export const getConversation = async (
 userId,
 otherUserId
)=>{


 const messages =
 await Message.find({

  $or:[

   {
    senderId:userId,
    receiverId:otherUserId
   },

   {
    senderId:otherUserId,
    receiverId:userId
   }

  ]

 })
 .sort({
   createdAt:1
 });


 console.log(
  "FETCH CHAT",
  {
   userId,
   otherUserId,
   count:messages.length
  }
 );


 return messages;

};




export const markMessagesAsRead = async (
  senderId,
  receiverId
) => {

  await Message.updateMany(

    {

      senderId,

      receiverId,

      read: false,

    },

    {

      $set: {

        read: true,

        delivered: true,

        readAt: new Date(),

      },

    }

  );

};




export const getUnreadCount = async (
  receiverId
) => {

  const unreadCount =
    await Message.countDocuments({

      receiverId,

      read: false,

    });


  return unreadCount;

};
