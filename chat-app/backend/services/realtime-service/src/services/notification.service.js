import { redisClient } from "../config/redis.js";

const key = (userId) => `notifications:${userId}`;

/*
{
 senderId:{
    senderId,
    senderName,
    senderAvatar,
    messages:[
       {
         messageId,
         receiverId,
         content,
         createdAt
       }
    ]
 }
}
*/

export const saveNotification = async (
  receiverId,
  notification
) => {

  const redisKey = key(receiverId);

  const existing =
    await redisClient.get(redisKey);

  let data = {};

  if (existing) {
    data = JSON.parse(existing);
  }

  const senderId =
    String(notification.senderId);

  if (!data[senderId]) {

    data[senderId] = {

      senderId,

      senderName:
        notification.senderName,

      senderAvatar:
        notification.senderAvatar,

      messages: []

    };

  }

  const alreadyExists =
    data[senderId].messages.some(

      (msg) =>
        msg.messageId ===
        notification.messageId

    );

  if (!alreadyExists) {

    data[senderId].messages.push({

      messageId:
        notification.messageId,

      receiverId:
        notification.receiverId,

      content:
        notification.content,

      createdAt:
        notification.createdAt

    });

  }

  await redisClient.set(
    redisKey,
    JSON.stringify(data)
  );

};

export const getNotifications = async (
  userId
) => {

  const data =
    await redisClient.get(
      key(userId)
    );

  if (!data) {

    return [];

  }

  return Object.values(
    JSON.parse(data)
  );

};

export const removeNotification = async (
  receiverId,
  senderId
) => {

  const redisKey =
    key(receiverId);


  const existing =
    await redisClient.get(redisKey);


  if(!existing)
    return;



  const data =
    JSON.parse(existing);



  delete data[String(senderId)];



  if(Object.keys(data).length===0){

    await redisClient.del(
      redisKey
    );

  }
  else{

    await redisClient.set(
      redisKey,
      JSON.stringify(data)
    );

  }


};