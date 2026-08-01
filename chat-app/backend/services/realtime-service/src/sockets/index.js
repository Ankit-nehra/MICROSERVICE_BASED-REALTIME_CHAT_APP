// socket/index.js

import { Server } from "socket.io";

import {
  subClient,
  pubClient
} from "../config/redis.js";



import {
  isUserBusy,
  createIncomingCall,
  getIncomingCall,
  removeIncomingCall,
  startCall,
  endCall
} from "../services/call.service.js";



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
  getActiveChat
} from "../utils/socketMap.js";



import socketAuth from "../middleware/socketAuth.js";



import {
  saveNotification,
  getNotifications,
  removeNotification
} from "../services/notification.service.js";





export const initSocket = (server)=>{


const io =
new Server(server,{

cors:{
origin:"*"
}

});






// ==========================
// REDIS READ RECEIPT
// ==========================


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


}

);








io.use(socketAuth);








io.on(
"connection",

(socket)=>{


console.log(
"✅ User authenticated:",
socket.user.userId
);









// ==========================
// JOIN
// ==========================


socket.on(

"join",

async({
name,
avatar
})=>{


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
await getNotifications(
userId
);



if(notifications.length){


socket.emit(

"pendingNotifications",

notifications

);


}


});









// ==========================
// ACTIVE CHAT
// ==========================


socket.on(

"activeChat",

({
chatUserId
})=>{


const userId =
socket.user.userId;



setActiveChat(

String(userId),

String(chatUserId)

);


});











// ==========================
// CHAT READ
// ==========================


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
// OPEN CHAT
// CLEAR REDIS NOTIFICATION
// ==========================


socket.on(

"openChat",

async({
chatUserId
})=>{


const userId =
String(socket.user.userId);



console.log(

"🗑 CLEAR NOTIFICATION",

userId,

chatUserId

);




await removeNotification(

userId,

chatUserId

);





socket.emit(
"notificationsCleared"
);


});











// ==========================
// LEAVE CHAT
// ==========================


socket.on(

"leaveChat",

()=>{


removeActiveChat(

String(socket.user.userId)

);


});












// ==========================
// TYPING
// ==========================


socket.on(

"typing",

({
receiverId
})=>{


const receiverSocket =
onlineUsers.get(
String(receiverId)
)?.socketId;



if(receiverSocket){


io.to(receiverSocket)
.emit(

"userTyping",

{

senderId:
socket.user.userId

}

);


}



});






socket.on(

"stopTyping",

({
receiverId
})=>{


const receiverSocket =
onlineUsers.get(
String(receiverId)
)?.socketId;



if(receiverSocket){


io.to(receiverSocket)
.emit(

"userStoppedTyping",

{

senderId:
socket.user.userId

}

);


}


});











// ==========================
// SEND MESSAGE
// ==========================


socket.on(

"sendMessage",

async(data)=>{



console.log(
"🟣 SEND MESSAGE"
);




const receiverSocketId =
onlineUsers.get(
String(data.receiverId)
)?.socketId;






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









const receiverActiveChat =
getActiveChat(
String(data.receiverId)
);







if(

String(receiverActiveChat)
===

String(data.senderId)

){


console.log(
"💬 CHAT OPEN NO REDIS"
);



if(receiverSocketId){


io.to(receiverSocketId)
.emit(

"receiveMessage",

data

);


}



return;


}









await saveNotification(

data.receiverId,

notification

);







if(!receiverSocketId){


console.log(
"📦 RECEIVER OFFLINE"
);


return;

}







io.to(receiverSocketId)
.emit(

"receiveMessage",

data

);





io.to(receiverSocketId)
.emit(

"newNotification",

notification

);



});
// ==========================
// CALL USER
// ==========================


socket.on(

"callUser",

async({

receiverId,

callType,

callerName,

callerEmail,

callerAvatar

})=>{


const callerId =
socket.user.userId;





// caller busy

if(
await isUserBusy(callerId)
){


socket.emit(

"callRejected",

{
reason:"caller_busy"
}

);


return;

}







// receiver busy

if(
await isUserBusy(receiverId)
){


socket.emit(

"callRejected",

{
reason:"receiver_busy"
}

);


return;

}








const receiverSocketId =
onlineUsers.get(
String(receiverId)
)?.socketId;





if(!receiverSocketId){


socket.emit(

"userUnavailable"

);


return;

}









await createIncomingCall(

receiverId,

{

callerId,

callType,

callerName,

callerEmail,

callerAvatar

}

);








io.to(receiverSocketId)
.emit(

"incomingCall",

{

callerId,

callType,

callerName,

callerEmail,

callerAvatar

}

);



});









// ==========================
// ACCEPT CALL
// ==========================


socket.on(

"acceptCall",

async({

callerId

})=>{



const receiverId =
socket.user.userId;






const incoming =
await getIncomingCall(
receiverId
);





if(!incoming){


socket.emit(

"callRejected",

{
reason:"expired"
}

);


return;

}







if(
await isUserBusy(receiverId)
){


socket.emit(

"callRejected",

{
reason:"receiver_busy"
}

);


return;

}







await startCall(

callerId,

receiverId,

incoming.callType

);







await removeIncomingCall(
receiverId
);







const callerSocketId =
onlineUsers.get(
String(callerId)
)?.socketId;






if(callerSocketId){
io.to(callerSocketId)
.emit(
"callAccepted",
{
receiverId,
callType:incoming.callType,

callerId,

callerName:
incoming.callerName,

callerEmail:
incoming.callerEmail,

callerAvatar:
incoming.callerAvatar,

isCaller:true
}
);

}
socket.emit(
"callAccepted",
{

receiverId:callerId,

callType:incoming.callType,

callerId:receiverId,

callerName:
incoming.callerName,

callerEmail:
incoming.callerEmail,

callerAvatar:
incoming.callerAvatar,

isCaller:false

}
);

});









// ==========================
// REJECT CALL
// ==========================


socket.on(

"rejectCall",

async({

callerId

})=>{





await removeIncomingCall(

socket.user.userId

);






const callerSocketId =
onlineUsers.get(
String(callerId)
)?.socketId;






if(callerSocketId){


io.to(callerSocketId)
.emit(

"callRejected",

{

reason:"declined"

}

);


}



});











// ==========================
// CANCEL CALL
// ==========================


socket.on(

"cancelCall",

async({

receiverId

})=>{



await removeIncomingCall(
receiverId
);





const receiverSocketId =
onlineUsers.get(
String(receiverId)
)?.socketId;





if(receiverSocketId){


io.to(receiverSocketId)
.emit(

"callCancelled"

);


}



});











// ==========================
// WEBRTC OFFER
// ==========================


socket.on(

"offer",

({

receiverId,

offer

})=>{



const receiverSocketId =
onlineUsers.get(
String(receiverId)
)?.socketId;





if(!receiverSocketId)
return;






io.to(receiverSocketId)
.emit(

"offer",

{

senderId:
socket.user.userId,

offer

}

);



});









// ==========================
// WEBRTC ANSWER
// ==========================


socket.on(

"answer",

({

receiverId,

answer

})=>{



const receiverSocketId =
onlineUsers.get(
String(receiverId)
)?.socketId;





if(!receiverSocketId)
return;






io.to(receiverSocketId)
.emit(

"answer",

{

senderId:
socket.user.userId,

answer

}

);



});









// ==========================
// ICE CANDIDATE
// ==========================


socket.on(

"iceCandidate",

({

receiverId,

candidate

})=>{



const receiverSocketId =
onlineUsers.get(
String(receiverId)
)?.socketId;





if(!receiverSocketId)
return;






io.to(receiverSocketId)
.emit(

"iceCandidate",

{

senderId:
socket.user.userId,

candidate

}

);



});











// ==========================
// END CALL
// ==========================


socket.on(

"endCall",

async()=>{



const otherUser =
await endCall(
socket.user.userId
);





if(!otherUser)
return;







const otherSocket =
onlineUsers.get(
String(otherUser)
)?.socketId;





if(otherSocket){


io.to(otherSocket)
.emit(

"callEnded"

);


}



});












// ==========================
// DISCONNECT
// ==========================


socket.on(

"disconnect",

async()=>{



console.log(

"🔴 DISCONNECT",

socket.id

);





removeUser(
socket.id
);






io.emit(

"onlineUsers",

getOnlineUsers()

);






await endCall(

socket.user.userId

);



});



});}
