
import {
  useEffect,
  useState
} from "react";


import {
  socket
} from "../socket/socket";


import {
  useNavigate
} from "react-router-dom";


import {
  getUsers,
  getMyProfile
} from "../api/user.api";


import useAuthStore from "../store/auth.store";


import ProfileDialog from "../components/ProfileDialog";





export default function HomePage(){



const [allUsers,setAllUsers] =
useState([]);



const [onlineUsers,setOnlineUsers] =
useState([]);



const [unreadCounts,setUnreadCounts] =
useState({});



const [notifications,setNotifications] =
useState([]);



const [search,setSearch] =
useState("");



const [profileOpen,setProfileOpen] =
useState(false);




const navigate =
useNavigate();




const logout =
useAuthStore(
state=>state.logout
);



const user =
useAuthStore(
state=>state.user
);



const token =
useAuthStore(
state=>state.token
);



const setUser =
useAuthStore(
state=>state.setUser
);



const userId =
user?.userId ||
user?._id;







// ===============================
// SYNC PROFILE AFTER LOGIN
// ===============================


useEffect(()=>{


const syncProfile =
async()=>{


try{


const res =
await getMyProfile();



const profile =
res.data.data ||
res.data;



setUser(
profile
);



// if(socket.connected){

// socket.emit(
// "join",
// {

// name:
// profile.name,


// avatar:
// profile.avatar || ""

// }

// );

// }



}

catch(error){

console.log(
"Profile sync error",
error
);

}


};



if(token){

syncProfile();

}



},[token]);







// ===============================
// AVATAR COMPONENT
// ===============================


const Avatar =
({
 user
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


className="
w-12
h-12
rounded-full
object-cover
border
border-white/10
"

/>

);


}




return (

<div

className="
w-12
h-12
rounded-full
bg-gradient-to-br
from-blue-500
to-purple-600
flex
items-center
justify-center
font-bold
text-xl
"

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




// ===============================
// OPEN CHAT FROM NOTIFICATION
// ===============================


const openNotificationChat =
(notification)=>{


if(!notification?.senderId)
return;



// remove from redis

socket.emit(
"openChat",
{
chatUserId:
notification.senderId
}
);



// remove local notification

setNotifications(
prev=>

prev.filter(
n=>
n.messageId !==
notification.messageId
)

);



setUnreadCounts(
prev=>({

...prev,

[notification.senderId]:0

})

);



navigate(
`/chat/${notification.senderId}`
);


};






// ===============================
// CUSTOM NOTIFICATION COMPONENT
// ===============================


const NotificationContainer =
()=>{


return (

<div

className="
fixed
top-5
right-5
z-[100]
space-y-4
"

>


{

notifications.map(
(notification)=>{


return (

<div

key={
notification.messageId
}


onClick={()=>{

openNotificationChat(
notification
);

}}


className="
w-96
bg-gray-900/95
backdrop-blur-xl
border
border-white/10
shadow-2xl
rounded-2xl
p-4
flex
gap-4
items-start
animate-slide-in
cursor-pointer
"

>





{

notification.senderAvatar ?


<img

src={
notification.senderAvatar
}


alt={
notification.senderName
}


className="
w-12
h-12
rounded-full
object-cover
border
border-white/20
flex-shrink-0
"

/>


:


<div

className="
w-12
h-12
rounded-full
bg-gradient-to-br
from-blue-500
to-purple-600
flex
items-center
justify-center
font-bold
text-xl
flex-shrink-0
"

>


{

notification.senderName
?.charAt(0)
?.toUpperCase()

||


"U"

}


</div>


}






<div

className="
flex-1
"

>



<div

className="
flex
justify-between
items-start
"

>


<div>


<p

className="
font-semibold
text-white
"

>

{

notification.senderName

}

</p>


<p

className="
text-xs
text-gray-400
mt-1
"

>

New message

</p>


</div>





<button


onClick={(e)=>{


e.stopPropagation();



setNotifications(
prev=>

prev.filter(
n=>
n.messageId !==
notification.messageId
)

);



}}



className="
text-gray-400
hover:text-white
text-lg
"

>

✕

</button>



</div>






<p

className="
text-sm
text-gray-300
mt-3
break-words
"

>

{

notification.content

}

</p>





<p

className="
text-xs
text-gray-500
mt-3
"

>

{
new Date(
notification.createdAt
)
.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

})
}

</p>





</div>




</div>


);


}

)


}



</div>


);


};
  
// ===============================
// LOAD USERS
// ===============================


useEffect(()=>{


const loadUsers =
async()=>{


try{


const res =
await getUsers();



setAllUsers(

res.data.data ||

res.data.users ||

res.data

);



}

catch(error){

console.log(
"Users loading error",
error
);

}


};



loadUsers();



},[]);






// ===============================
// SOCKET CONNECTION
// ===============================


useEffect(()=>{


if(
!token ||
!userId
)
return;



socket.auth={
token
};





socket.emit(
"join",
{

name:
user?.name ||
user?.email,


avatar:
user?.avatar || ""

}

);






const onlineHandler =
(users)=>{


setOnlineUsers(
users
);


};







const notificationHandler =
(data)=>{


const notification = {

messageId:
data.messageId,

senderId:
data.senderId,

receiverId:
data.receiverId,

senderName:
data.senderName,

senderAvatar:
data.senderAvatar,

content:
data.content,

createdAt:
data.createdAt

};



setNotifications(
prev=>{


const exists =
prev.some(
n =>
String(n.messageId) ===
String(notification.messageId)
);



if(exists)
return prev;



// count only for new notification
setUnreadCounts(
count=>({

...count,

[notification.senderId]:
(count[notification.senderId] || 0) + 1

})
);



return [
...prev,
notification
];


});


};






const pendingNotificationHandler =
(list)=>{


const notifications = [];

const unread = {};




list.forEach(
(sender)=>{


sender.messages.forEach(
(msg)=>{


notifications.push({

messageId:
msg.messageId,


senderId:
sender.senderId,


receiverId:
msg.receiverId,


senderName:
sender.senderName,


senderAvatar:
sender.senderAvatar,


content:
msg.content,


createdAt:
msg.createdAt


});


}

);



unread[sender.senderId] =
sender.messages.length;



}

);




setNotifications(
notifications
);


setUnreadCounts(
unread
);



};







socket.on(
"onlineUsers",
onlineHandler
);



socket.on(
"newNotification",
notificationHandler
);



socket.on(
"pendingNotifications",
pendingNotificationHandler
);







return ()=>{


socket.off(
"onlineUsers",
onlineHandler
);



socket.off(
"newNotification",
notificationHandler
);



socket.off(
"pendingNotifications",
pendingNotificationHandler
);



};



},[

token,

userId,

user?.name,

user?.email,

user?.avatar

]);







// ===============================
// OPEN NORMAL CHAT
// ===============================


const openChat =
(id)=>{


if(!id)
return;




navigate(
`/chat/${id}`
);



};









// ===============================
// LOGOUT
// ===============================


const handleLogout =
async()=>{

await logout();

navigate(
"/login",
{
replace:true
}
);

};








// ===============================
// ONLINE CHECK
// ===============================


const isOnline =
(user)=>{


const id =
user.userId ||
user._id;




return onlineUsers.some(

online=>

String(online.userId)
===
String(id)

);


};








// ===============================
// FILTER USERS
// ===============================


const users =


allUsers


.filter(
u=>{


const id =
u.userId ||
u._id;



return String(id)
!==
String(userId);



}

)



.filter(
u=>{


const name =

u.name
?.toLowerCase()
.includes(
search.toLowerCase()
);



const email =

u.email
?.toLowerCase()
.includes(
search.toLowerCase()
);



return name || email;



}

)



.sort(
(a,b)=>{


const ao =
isOnline(a);


const bo =
isOnline(b);



if(
ao===bo
)
return 0;



return ao ? -1 : 1;



}

);








return (

<div

className="
min-h-screen
bg-gradient-to-br
from-gray-950
via-black
to-gray-900
text-white
"

>


<NotificationContainer />






<div

className="
sticky
top-0
z-10
backdrop-blur-xl
bg-white/5
border-b
border-white/10
px-5
py-4
flex
justify-between
items-center
"

>


{/* LEFT LOGO + TITLE */}

<div

className="
flex
items-center
gap-3
"

>

<div

className="
text-3xl
"

>

💬

</div>


<h1

className="
text-2xl
font-bold
"

>

RealTime Chat

</h1>


</div>





{/* RIGHT LOGOUT + PROFILE */}

<div

className="
flex
items-center
gap-4
"

>


{/* LOGOUT FIRST */}

<button

onClick={handleLogout}

className="
bg-red-600
hover:bg-red-500
px-5
py-2
rounded-xl
transition
font-medium
"

>

Logout

</button>





{/* PROFILE AVATAR LAST */}

<button

onClick={()=>
setProfileOpen(true)
}

title="View Profile"

className="
relative
w-11
h-11
rounded-full
overflow-hidden
border
border-white/20
hover:border-blue-400
transition-all
duration-300
hover:scale-105
shadow-lg
"

>

{

user?.avatar ?

(

<img

src={user.avatar}

alt="profile"

className="
w-full
h-full
object-cover
"

/>

)

:

(

<div

className="
w-full
h-full
bg-gradient-to-br
from-blue-500
via-purple-500
to-pink-500
flex
items-center
justify-center
font-bold
text-lg
"

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

)

}


</button>


</div>


</div>








<div

className="p-5"

>


<input


value={search}


onChange={

e=>

setSearch(
e.target.value
)

}


placeholder="Search people..."


className="
w-full
p-4
rounded-xl
bg-white/5
border
border-white/10
outline-none
"

/>



</div>









<div

className="
px-5
space-y-3
"

>



{

users.length===0 ?


<div

className="
text-center
text-gray-500
mt-20
"

>

No users found

</div>



:


users.map(
(u)=>{


const chatUserId =
u.userId ||
u._id;



return (


<div


key={
chatUserId
}



onClick={()=>
openChat(chatUserId)
}



className="
cursor-pointer
flex
items-center
justify-between
bg-white/5
border
border-white/10
rounded-2xl
p-4
hover:bg-white/10
transition
"

>



<div

className="
flex
items-center
gap-4
"

>


<Avatar
user={u}
/>



<div>


<h3

className="
font-semibold
text-lg
"

>

{

u.name ||

"User"

}

</h3>



<p

className="
text-sm
text-gray-400
"

>

{
u.description ||
"Hey there! I am using RealTime Chat"

}

</p>



</div>



</div>








<div>


{

isOnline(u)


?


<span

className="
text-green-400
text-sm
"

>

🟢 Online

</span>



:


<span

className="
text-gray-500
text-sm
"

>

Offline

</span>



}







{

unreadCounts[chatUserId]


&&


<span

className="
ml-3
bg-red-500
px-3
py-1
rounded-full
text-sm
"

>

{

unreadCounts[chatUserId]

}


</span>


}



</div>






</div>


);


}

)


}



</div>








<ProfileDialog


isOpen={
profileOpen
}



onClose={()=>
setProfileOpen(false)
}



/>



</div>


);



}