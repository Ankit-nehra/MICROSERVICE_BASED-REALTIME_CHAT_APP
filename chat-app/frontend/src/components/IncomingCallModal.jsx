import {
  useCall
} from "../context/CallContext.jsx";

import {
  useNavigate
} from "react-router-dom";

import "./IncomingCallModal.css";


export default function IncomingCallModal(){


const {
  incomingCall,
  acceptCall,
  rejectCall,
  setIncomingCall
}=useCall();



const navigate =
useNavigate();



if(!incomingCall)
return null;



const handleAccept=()=>{

const callData = incomingCall;


acceptCall();


setIncomingCall(null);



const updatedCallData = {

...callData,

isCaller:false,

receiverId:callData.callerId

};



navigate(

callData.callType==="video"

?

"/video-call"

:

"/audio-call",

{

state:updatedCallData

}

);


};


const handleReject=()=>{


rejectCall();


setIncomingCall(null);


};





return (

<div className="incoming-overlay">


<div className="incoming-box">



<img

src={
incomingCall.callerAvatar ||
"/default-avatar.png"
}

alt="caller"

/>



<h2>

{incomingCall.callerName || "Unknown"}

</h2>



<p>

{incomingCall.callerEmail}

</p>



<p className="call-type">

{
incomingCall.callType === "video"
?
"📹 Video Calling"
:
"📞 Audio Calling"
}

</p>





<div className="actions">


<button

className="accept"

onClick={handleAccept}

>

Accept

</button>



<button

className="reject"

onClick={handleReject}

>

Reject

</button>


</div>



</div>


</div>

);


}