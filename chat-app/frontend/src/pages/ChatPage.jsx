import toast from "react-hot-toast";
import {
  useEffect,
  useState,
  useRef
} from "react";
import {
Video,
Phone
} from "lucide-react";

import {
  useParams,
  useNavigate
} from "react-router-dom";


import {
  sendMessage as sendMessageApi,
  getMessages,
  
} from "../api/chat.api";


import {
  getUserProfile
} from "../api/user.api";


import {
  socket
} from "../socket/socket";


import useAuthStore from "../store/auth.store";

import useChatStore from "../store/chat.store";


import ProfileDialog from "../components/ProfileDialog";
import {
callUser
} from "../socket/call.socket";


export default function ChatPage(){


const {
 id:receiverId
}=useParams();



const navigate =
useNavigate();





const user =
useAuthStore(
state=>state.user
);



const userId =
String(
 user?.userId ||
 user?._id
);



const name =
user?.name ||
user?.email;



const avatar =
user?.avatar || "";





const messages =
useChatStore(
state=>state.messages
);



const addMessage =
useChatStore(
state=>state.addMessage
);

const markMessagesRead =
useChatStore(
state=>state.markMessagesRead
);

const setMessages =
useChatStore(
state=>state.setMessages
);





const [message,setMessage] =
useState("");


const [typing,setTyping] =
useState(false);

const [onlineUsers,setOnlineUsers] =
useState([]);



const [receiver,setReceiver] =
useState(null);



const [profileOpen,setProfileOpen] =
useState(false);




const bottomRef =
useRef(null);









// AVATAR COMPONENT


const Avatar = ({
 user,
 size="w-12 h-12"
})=>{


const [imageError,setImageError] =
useState(false);



if(
user?.avatar &&
!imageError
){

return (

<img

src={
user.avatar
}

alt={
user.name
}

onError={()=>
setImageError(true)
}

className={`
${size}
rounded-full
object-cover
border
border-white/20
`}

/>

);

}



return (

<div

className={`
${size}
rounded-full
bg-gradient-to-br
from-blue-500
via-purple-500
to-pink-500
flex
items-center
justify-center
font-bold
text-xl
shadow-lg
`}

>


{

user?.name
?.charAt(0)
?.toUpperCase()

||

user?.email
?.charAt(0)
?.toUpperCase()

||

"U"

}


</div>

);


};












// LOAD MESSAGES


useEffect(()=>{


const loadMessages =
async()=>{


try{


const res =
await getMessages(
receiverId
);



setMessages(

res.data.data ||

[]

);







}
catch(error){


console.log(
"Messages loading error",
error
);


}


};



loadMessages();



},[
receiverId,
userId
]);












// LOAD RECEIVER PROFILE


useEffect(()=>{


const loadReceiver =
async()=>{


try{


const res =
await getUserProfile(
receiverId
);



const profile =
res.data.data ||
res.data;



setReceiver({

...profile,


chatUserId:

profile.userId ||
profile._id


});



}
catch(error){


console.log(
"Receiver profile error",
error
);


}


};



loadReceiver();



},[
receiverId
]);













// SOCKET


useEffect(()=>{


if(!userId)
return;




socket.auth={
token:
useAuthStore.getState().token
};



socket.emit(
"join",
{
name,
avatar
}
);







const onlineHandler =
(users)=>{


setOnlineUsers(
users
);


};







const messageHandler =
(msg)=>{


const senderId =
String(
msg.senderId?._id ||
msg.senderId
);


const msgReceiverId =
String(
msg.receiverId?._id ||
msg.receiverId
);


const currentReceiver =
String(
receiver?.chatUserId ||
receiverId
);



if(

senderId===currentReceiver &&
msgReceiverId===userId

){

addMessage(msg);


// NEW: mark incoming message as read
socket.emit(
"chatRead",
{
 senderId: currentReceiver
}
);


}


if(

senderId===userId &&
msgReceiverId===currentReceiver

){

addMessage(msg);

}


};

const notificationHandler = (data)=>{

const currentReceiver =
String(
receiver?.chatUserId ||
receiverId
);

// Agar jis user ki chat open hai usi ka message hai
// to receiveMessage already handle kar raha hai.
// Isliye uske liye toast mat dikhao.

if(
String(data.senderId) === currentReceiver
){
return;
}

toast(

`${data.senderName}: ${data.content}`,

{
duration:2000,

position:"top-right",

icon:"💬",

style:{

background:"#1f2937",

color:"#fff",

border:"1px solid #374151",

borderRadius:"14px"

}

}

);

};







socket.on(
"onlineUsers",
onlineHandler
);



socket.on(
"receiveMessage",
messageHandler
);

socket.on(
"newNotification",
notificationHandler
);


socket.on(
"userTyping",
(data)=>{


if(
String(data.senderId)
===
String(receiverId)
){

setTyping(true);

}

});


socket.on(
"userStoppedTyping",
(data)=>{


if(
String(data.senderId)
===
String(receiverId)
){

setTyping(false);

}

});


const messagesReadHandler =
(data)=>{


console.log(
"Messages read:",
data
);


markMessagesRead(
data.userId
);


};



socket.on(
"messagesRead",
messagesReadHandler
);






return()=>{


socket.emit(
"leaveChat",
{
userId
}
);



socket.off(
"onlineUsers",
onlineHandler
);



socket.off(
"receiveMessage",
messageHandler
);

socket.off(
"newNotification",
notificationHandler
);

socket.off(
"messagesRead",
messagesReadHandler
);

socket.off(
"userTyping"
);


socket.off(
"userStoppedTyping"
);

};



},[
userId,
receiverId,
receiver?.chatUserId
]);











// ACTIVE CHAT

// ACTIVE CHAT

useEffect(()=>{

if(
!receiver ||
!userId
)
return;


socket.emit(
"activeChat",
{
 chatUserId:
 receiver.chatUserId
});


socket.emit(
"openChat",
{
 chatUserId:
 receiver.chatUserId
});


// NEW: MARK MESSAGE READ EVENT

socket.emit(
"chatRead",
{
 senderId:
 receiver.chatUserId
});


},[
receiver,
userId
]);









// AUTO SCROLL


useEffect(()=>{


bottomRef.current
?.scrollIntoView({
behavior:"smooth"
});



},[
messages
]);



// SEND MESSAGE


const sendMessage =
async()=>{


if(
!message.trim() ||
!receiver
)
return;



try{


const res =
await sendMessageApi({

receiverId:
receiver.chatUserId,


content:
message.trim()

});



const savedMessage =
res.data.data ||
res.data;



addMessage(
savedMessage
);



socket.emit(
"sendMessage",
{
 ...savedMessage,
 senderName:name,
 senderAvatar:avatar
}
);



setMessage("");



}
catch(error){


console.log(
"Send message error",
error
);


}



};












// ONLINE STATUS


const isOnline =
onlineUsers.some(

u=>

String(u.userId)
===
String(receiver?.chatUserId)

);









return (

<div

className="
h-[100dvh]
flex
flex-col
bg-gradient-to-br
from-gray-950
via-black
to-gray-900
text-white
"

>








{/* HEADER */}


<div

className="
sticky
top-0
z-20
px-4
py-3
bg-white/5
backdrop-blur-xl
border-b
border-white/10
shadow-xl
"

>


<div

className="
flex
items-center
justify-between
"

>





<button

onClick={()=>
navigate("/home")
}

className="
w-10
h-10
rounded-full
bg-white/10
hover:bg-white/20
transition
flex
items-center
justify-center
text-xl
"

>

←

</button>









<div

onClick={()=>
setProfileOpen(true)
}

className="
flex
items-center
gap-3
cursor-pointer
px-4
py-2
rounded-2xl
hover:bg-white/5
transition
"

>


<Avatar

user={
receiver
}

size="
w-12
h-12
"

/>





<div>


<h2

className="
font-semibold
text-lg
"

>

{
receiver?.name ||
"User"
}

</h2>





<div

className="
flex
items-center
gap-2
text-xs
"

>

{
typing ?

<span className="text-blue-400">
typing...
</span>
:

<span

className={

isOnline

?

"text-green-400"

:

"text-gray-400"

}

>

{

isOnline

?

"🟢 Online"

:

"⚫ Offline"

}

</span>
}


</div>





</div>



</div>









<div
className="
flex
items-center
gap-2
"
>


<button

onClick={()=>{

callUser({

receiverId:
receiver.chatUserId,

callType:
"audio",

callerName:
name,

callerEmail:
user?.email,

callerAvatar:
avatar

});

}}

className="
w-10
h-10
rounded-full
bg-green-500/20
hover:bg-green-500/40
flex
items-center
justify-center
transition
"

>

<Phone
size={20}
className="text-green-400"
/>

</button>






<button

onClick={()=>{

callUser({

receiverId:
receiver.chatUserId,

callType:
"video",

callerName:
name,

callerEmail:
user?.email,

callerAvatar:
avatar

});

}}

className="
w-10
h-10
rounded-full
bg-blue-500/20
hover:bg-blue-500/40
flex
items-center
justify-center
transition
"

>

<Video
size={20}
className="text-blue-400"
/>

</button>


</div>







</div>


</div>












{/* MESSAGES */}


<div

className="
flex-1
overflow-y-auto
p-4
space-y-3
"

>


{

messages.map(

(msg)=>{


const senderId =

String(
msg.senderId?._id ||
msg.senderId
);



const mine =
senderId===userId;



return (


<div

key={
msg._id
}

className={`
flex
${mine ? "justify-end":"justify-start"}
`}

>


<div

className={`

max-w-[75%]

px-4

py-3

rounded-2xl

shadow-lg

text-sm

break-words

${

mine

?

"bg-gradient-to-r from-blue-600 to-purple-600 rounded-br-md"

:

"bg-gray-800 border border-white/10 rounded-bl-md"

}

`}

>

{
msg.content
}



<div

className="
text-[10px]
text-gray-300
mt-1
text-right
opacity-70
"

>

{
new Date(
msg.createdAt
)
.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
)

}

{
mine && (

<span className="ml-2">

{
msg.read
?
"read"
:
"unread"
}

</span>

)
}

</div>



</div>



</div>


);


}

)

}




<div ref={bottomRef}/>


</div>









{/* MESSAGE INPUT */}


<div

className="
p-4
border-t
border-white/10
bg-black/40
backdrop-blur-xl
"

>


<div

className="
flex
gap-3
items-center
"

>


<input


value={
message
}


onChange={
e=>{
setMessage(
e.target.value
);
socket.emit(
"typing",
{
receiverId:
receiver.chatUserId
}
);



clearTimeout(window.typingTimer);



window.typingTimer =
setTimeout(()=>{


socket.emit(
"stopTyping",
{
receiverId:
receiver.chatUserId
}
);


},1000);
}
}


onKeyDown={
e=>{

if(
e.key==="Enter"
)
sendMessage();

}

}


placeholder="
Type a message...
"


className="
flex-1
bg-white/10
border
border-white/10
rounded-2xl
px-5
py-3
outline-none
focus:ring-2
focus:ring-blue-500
transition
"


/>







<button


onClick={
sendMessage
}


className="
px-6
py-3
rounded-2xl
bg-gradient-to-r
from-blue-600
to-purple-600
hover:scale-105
transition
font-semibold
shadow-lg
"

>

Send 🚀


</button>



</div>


</div>









{/* PROFILE */}


<ProfileDialog


userId={
receiver?.chatUserId
}


isOpen={
profileOpen
}


onClose={
()=>
setProfileOpen(false)
}


/>







</div>


);


}
