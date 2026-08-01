import {
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  socket
} from "../socket/socket.js";

import {
  createPeer,
  closePeer
} from "../socket/peer.js";


export default function AudioCallPage(){


const location = useLocation();

const navigate = useNavigate();


const callData = location.state;



const [seconds,setSeconds] = useState(0);

const [connected,setConnected] = useState(false);



const localStream =
useRef(null);



const peer =
useRef(null);

const remoteAudio =
useRef(null);



useEffect(()=>{


if(!callData){

navigate("/");

return;

}



let timer;



const startAudio = async()=>{


try{


const stream =
await navigator.mediaDevices.getUserMedia({

audio:true

});



localStream.current = stream;



const pc =
createPeer();



peer.current = pc;





stream
.getTracks()
.forEach(
track=>
pc.addTrack(
track,
stream
)
);







pc.onicecandidate=(event)=>{


if(event.candidate){


socket.emit(
"iceCandidate",
{

receiverId:
callData.receiverId ||
callData.callerId,

candidate:
event.candidate

}

);


}


};






pc.ontrack=(event)=>{

console.log(
"REMOTE AUDIO CONNECTED"
);


if(remoteAudio.current){

remoteAudio.current.srcObject =
event.streams[0];

}


setConnected(true);

};









socket.on(
"offer",
async(data)=>{


console.log(
"OFFER RECEIVED"
);



await pc.setRemoteDescription(
data.offer
);



const answer =
await pc.createAnswer();



await pc.setLocalDescription(
answer
);




socket.emit(
"answer",
{

receiverId:
data.senderId,

answer

}

);



});









socket.on(
"answer",
async(data)=>{


console.log(
"ANSWER RECEIVED"
);



await pc.setRemoteDescription(
data.answer
);



setConnected(true);


});







socket.on(
"iceCandidate",
async(data)=>{


try{


await pc.addIceCandidate(
data.candidate
);


}
catch(error){

console.log(
"ICE ERROR",
error
);

}


});









// ONLY CALLER CREATES OFFER

if(callData.isCaller){


console.log(
"CREATING OFFER"
);



const offer =
await pc.createOffer();



await pc.setLocalDescription(
offer
);



socket.emit(
"offer",
{

receiverId:
callData.receiverId,

offer

}

);



}






}
catch(error){


console.log(
"AUDIO CALL ERROR",
error
);


}


};





startAudio();





timer=setInterval(()=>{


setSeconds(
prev=>prev+1
);


},1000);







socket.on(
"callEnded",
()=>{


navigate("/");


});








return()=>{


clearInterval(timer);



closePeer();



if(localStream.current){


localStream.current
.getTracks()
.forEach(
track=>
track.stop()
);


}



socket.off(
"offer"
);


socket.off(
"answer"
);


socket.off(
"iceCandidate"
);


socket.off(
"callEnded"
);



};


},[]);







const endCall=()=>{


socket.emit(
"endCall"
);


navigate("/");


};







const formatTime=()=>{


const min =
Math.floor(seconds/60);


const sec =
seconds%60;



return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;


};







return (

<div className="
h-screen
bg-gradient-to-br
from-gray-950
via-black
to-gray-900
text-white
flex
items-center
justify-center
">
<audio
ref={remoteAudio}
autoPlay
/>


<div className="
w-[90%]
max-w-md
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
text-center
shadow-2xl
">


<img

src={
callData?.callerAvatar ||
"/default-avatar.png"
}

className="
w-32
h-32
rounded-full
mx-auto
object-cover
border-4
border-blue-500
"

/>



<h1 className="
text-3xl
font-bold
mt-6
">

{
callData?.callerName ||
"Unknown"
}

</h1>



<p className="
text-gray-400
mt-2
">

{
callData?.callerEmail
}

</p>





<p className="
mt-5
text-green-400
animate-pulse
">

{

connected

?

"📞 Connected"

:

"🔄 Connecting..."

}

</p>




<p className="
text-xl
mt-2
">

{formatTime()}

</p>







<div className="
flex
justify-center
gap-8
mt-10
">


<button

className="
w-16
h-16
rounded-full
bg-gray-700
text-2xl
"

>

🎤

</button>




<button

onClick={endCall}

className="
w-16
h-16
rounded-full
bg-red-600
text-2xl
hover:bg-red-700
"

>

❌

</button>



</div>




</div>



</div>

);


}