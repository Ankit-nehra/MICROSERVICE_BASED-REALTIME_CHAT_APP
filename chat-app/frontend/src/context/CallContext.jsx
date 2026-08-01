import {
createContext,
useContext,
useEffect,
useState
} from "react";


import {
socket
} from "../socket/socket";


import {
useNavigate
} from "react-router-dom";



const CallContext = createContext();



export const CallProvider = ({
children
})=>{


const [incomingCall,setIncomingCall]=useState(null);


const navigate = useNavigate();




useEffect(()=>{


const incomingHandler=(data)=>{


console.log(
"📞 INCOMING CALL",
data
);


setIncomingCall(data);


};





const acceptedHandler=(data)=>{


console.log(
"✅ CALL ACCEPTED",
data
);



if(
data.callType==="video"
){

navigate(
"/video-call",
{
state:data
}
);

}
else{


navigate(
"/audio-call",
{
state:data
}
);


}


};





const rejectedHandler=(data)=>{


console.log(
"❌ CALL REJECTED",
data
);


alert(
"Call rejected"
);


};





socket.on(
"incomingCall",
incomingHandler
);



socket.on(
"callAccepted",
acceptedHandler
);



socket.on(
"callRejected",
rejectedHandler
);




return()=>{


socket.off(
"incomingCall",
incomingHandler
);


socket.off(
"callAccepted",
acceptedHandler
);



socket.off(
"callRejected",
rejectedHandler
);



};



},[]);







const acceptCall=()=>{


if(!incomingCall)
return;



socket.emit(
"acceptCall",
{

callerId:
incomingCall.callerId

}

);

};






const rejectCall=()=>{


if(!incomingCall)
return;



socket.emit(
"rejectCall",
{

callerId:
incomingCall.callerId

}

);


};






return (

<CallContext.Provider

value={{

incomingCall,

setIncomingCall,

acceptCall,

rejectCall

}}

>

{children}

</CallContext.Provider>


);


};




export const useCall=()=>{

return useContext(CallContext);

};