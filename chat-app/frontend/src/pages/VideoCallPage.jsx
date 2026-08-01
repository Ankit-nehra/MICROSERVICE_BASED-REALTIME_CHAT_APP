import {
  useLocation,
  useNavigate
} from "react-router-dom";


import {
  useEffect,
  useRef,
  useState
} from "react";


import {
  socket
} from "../socket/socket.js";


import {
  createPeer,
  closePeer
} from "../socket/peer.js";




export default function VideoCallPage(){


const location =
useLocation();


const navigate =
useNavigate();



const callData =
location.state;



const localVideo =
useRef(null);


const remoteVideo =
useRef(null);



const localStream =
useRef(null);



const peer =
useRef(null);



const [connected,setConnected]=
useState(false);



const [seconds,setSeconds]=
useState(0);







useEffect(()=>{


if(!callData){


navigate("/");

return;


}





let timer;





const startVideo=async()=>{


try{



const stream =
await navigator.mediaDevices.getUserMedia({

video:true,

audio:true

});




localStream.current =
stream;





if(localVideo.current){

localVideo.current.srcObject =
stream;

}





const pc =
createPeer();


peer.current =
pc;







stream
.getTracks()
.forEach(
track=>
pc.addTrack(
track,
stream
)
);







pc.ontrack=(event)=>{


console.log(
"REMOTE VIDEO CONNECTED"
);



if(remoteVideo.current){


remoteVideo.current.srcObject =
event.streams[0];


}



setConnected(true);


};








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









// only caller create offer

if(callData.isCaller){


console.log(
"CREATING VIDEO OFFER"
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
"VIDEO CALL ERROR",
error
);


}



};





startVideo();





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
bg-black
relative
overflow-hidden
text-white
">





{/* REMOTE VIDEO */}

<video

ref={remoteVideo}

autoPlay

playsInline

className="
w-full
h-full
object-cover
bg-gray-900
"

/>






{/* LOCAL VIDEO */}

<video

ref={localVideo}

autoPlay

muted

playsInline

className="
absolute
right-5
top-5
w-40
h-52
rounded-2xl
object-cover
border
border-white/30
shadow-xl
bg-black
"

/>









<div className="
absolute
bottom-10
left-0
right-0
flex
flex-col
items-center
">


<h2 className="
text-2xl
font-bold
">

{
callData?.callerName ||
"Unknown"
}

</h2>




<p className="
text-gray-300
">

{

connected

?

"🟢 Connected"

:

"🔄 Connecting..."

}

</p>




<p className="
text-gray-300
mt-1
">

{formatTime()}

</p>








<div className="
flex
gap-8
mt-6
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

className="
w-16
h-16
rounded-full
bg-blue-600
text-2xl
"

>

📹

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