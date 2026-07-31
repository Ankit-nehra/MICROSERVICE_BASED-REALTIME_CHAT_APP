import {
 createContext,
 useContext,
 useEffect,
 useState
} from "react";

import {
 socket
} from "../socket/socket";


import useAuthStore from "../store/auth.store";


const NotificationContext =
createContext();



export const NotificationProvider =
({children})=>{


const [notifications,setNotifications]=
useState([]);


const [unreadCounts,setUnreadCounts]=
useState({});


const token =
useAuthStore(
state=>state.token
);



const user =
useAuthStore(
state=>state.user
);



const userId =
user?.userId ||
user?._id;



useEffect(()=>{


if(
!token ||
!userId
)
return;



const notificationHandler =
(data)=>{


const notification={

messageId:data.messageId,

senderId:data.senderId,

receiverId:data.receiverId,

senderName:data.senderName,

senderAvatar:data.senderAvatar,

content:data.content,

createdAt:data.createdAt

};



setNotifications(prev=>{


const exists =
prev.some(
n=>
String(n.messageId)
===
String(notification.messageId)
);


if(exists)
return prev;


return [
...prev,
notification
];


});



setUnreadCounts(prev=>({

...prev,

[notification.senderId]:
(prev[notification.senderId] || 0)+1


}));



};





socket.on(
"newNotification",
notificationHandler
);



return ()=>{


socket.off(
"newNotification",
notificationHandler
);


};



},[
token,
userId
]);





return (

<NotificationContext.Provider

value={{

notifications,

setNotifications,

unreadCounts,

setUnreadCounts


}}

>


{children}


</NotificationContext.Provider>


);


};





export const useNotification =
()=>useContext(NotificationContext);