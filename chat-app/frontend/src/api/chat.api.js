import api from "./axios";



export const sendMessage = (data) =>
  api.post(
    "/chat/send",
    data
  );



export const getMessages = (
  otherUserId
) =>
  api.get(
    `/chat/conversation/${otherUserId}`
  );



export const markMessagesRead = (
  senderId
)=>
  api.patch(
    "/chat/read",
    {
      senderId
    }
  );



export const getUnreadCount = () =>
  api.get(
    "/chat/unread"
  );