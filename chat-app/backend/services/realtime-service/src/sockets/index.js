

import { Server } from "socket.io";
import {
 subClient,
 pubClient
} from "../config/redis.js";


import {
 publishMessagesRead
} from "../services/readReceipt.service.js";

import {
  addUser,
  removeUser,
  getOnlineUsers,
  onlineUsers,
  setActiveChat,
  removeActiveChat,
  getActiveChat,
} from "../utils/socketMap.js";

import socketAuth from "../middleware/socketAuth.js";

import {
  saveNotification,
  getNotifications,
  removeNotification
} from "../services/notification.service.js";

export const initSocket = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  subClient.subscribe(
"messages_read",
(message)=>{


const data =
JSON.parse(message);



const senderSocket =
onlineUsers.get(
 String(data.senderId)
)?.socketId;



if(senderSocket){

io.to(senderSocket)
.emit(
"messagesRead",
{
 userId:data.receiverId
}
);

}

});



  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log(
      "✅ User authenticated:",
      socket.user.userId
    );

    // ==========================
    // JOIN
    // ==========================

    socket.on(
      "join",
      async ({ name, avatar }) => {

        const userId =
          socket.user.userId;

        addUser(
          userId,
          socket.id,
          name ?? null,
          avatar ?? ""
        );

        io.emit(
          "onlineUsers",
          getOnlineUsers()
        );

        const notifications =
          await getNotifications(userId);

        if (notifications.length) {

          socket.emit(
            "pendingNotifications",
            notifications
          );

        }

      }
    );

    // ==========================
    // ACTIVE CHAT
    // ==========================

    socket.on(
      "activeChat",
      ({ chatUserId }) => {

        const userId =
          socket.user.userId;

        setActiveChat(
          String(userId),
          String(chatUserId)
        );

      }
    );
    socket.on(
"chatRead",
async({
 senderId
})=>{


const receiverId =
socket.user.userId;



console.log(
"READ EVENT",
{
senderId,
receiverId
}
);


await pubClient.publish(
"messages_read",
JSON.stringify({

senderId,

receiverId

})
);

await pubClient.publish(
"chat_read_request",
JSON.stringify({
 senderId,
 receiverId
})
);

});
// ==========================
// OPEN CHAT -> REMOVE REDIS
// ==========================

socket.on(
  "openChat",
  async ({ chatUserId }) => {

    const userId =
      String(socket.user.userId);


    console.log(
      "🗑️ CLEAR REDIS NOTIFICATIONS:",
      userId,
      "OPEN CHAT WITH:",
      chatUserId
    );


   await removeNotification(
  userId,
  chatUserId
);


    socket.emit(
      "notificationsCleared"
    );

  }
);
    socket.on(
      "leaveChat",
      () => {

        const userId =
          socket.user.userId;

        console.log(
          "🚪 LEAVE CHAT",
          userId
        );

        removeActiveChat(
          String(userId)
        );

      }
    );
// ==========================
// TYPING INDICATOR
// ==========================

socket.on(
"typing",
({receiverId})=>{

const receiverSocket =
onlineUsers.get(
 String(receiverId)
)?.socketId;


if(receiverSocket){

io.to(receiverSocket)
.emit(
"userTyping",
{
senderId: socket.user.userId
}
);

}


});


socket.on(
"stopTyping",
({receiverId})=>{


const receiverSocket =
onlineUsers.get(
 String(receiverId)
)?.socketId;


if(receiverSocket){

io.to(receiverSocket)
.emit(
"userStoppedTyping",
{
senderId: socket.user.userId
}
);

}


});
    // ==========================
    // SEND MESSAGE
    // ==========================

    socket.on(
      "sendMessage",
      async (data) => {

        console.log(
          "🟣 SEND MESSAGE"
        );

        const receiverSocketId =
          onlineUsers.get(
            String(data.receiverId)
          )?.socketId;

        // const senderData =
        //   onlineUsers.get(
        //     String(data.senderId)-----------------------------------------------------------------------
        //   );

        const notification = {

          messageId:
            String(data._id),

          senderId:
            String(data.senderId),

          receiverId:
            String(data.receiverId),

senderName:
data.senderName || "User",

senderAvatar:
data.senderAvatar || "",

          content:
            data.content,

          createdAt:
            data.createdAt ||
            new Date().toISOString()

        };

        // Always save in Redis
        const receiverActiveChat =
getActiveChat(
  String(data.receiverId)
);


// Receiver already chatting with sender
if (
  String(receiverActiveChat) ===
  String(data.senderId)
) {

  console.log(
    "💬 Chat already open -> No Redis notification"
  );


  if(receiverSocketId){

    io.to(
      receiverSocketId
    ).emit(
      "receiveMessage",
      data
    );

  }


  return;

}


// Save Redis only when chat is not open
await saveNotification(
  data.receiverId,
  notification
);


// Receiver Offline
if (!receiverSocketId) {

  console.log(
    "📦 Receiver Offline -> Notification saved in Redis"
  );

  return;

}


// Send realtime message
io.to(
  receiverSocketId
).emit(
  "receiveMessage",
  data
);

        // Popup notification
        io.to(
          receiverSocketId
        ).emit(
          "newNotification",
          notification
        );

      }
    );

    // ==========================
    // DISCONNECT
    // ==========================

    socket.on(
      "disconnect",
      () => {

        console.log(
          "🔴 DISCONNECT:",
          socket.id
        );

        removeUser(
          socket.id
        );

        io.emit(
          "onlineUsers",
          getOnlineUsers()
        );

      }
    );

  });

};