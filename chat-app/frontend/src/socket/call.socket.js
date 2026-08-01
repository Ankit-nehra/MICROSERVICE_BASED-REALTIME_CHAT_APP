import {
socket
}
from "./socket";



export const callUser=({

receiverId,
callType,
callerName,
callerEmail,
callerAvatar

})=>{


socket.emit(
"callUser",
{

receiverId,

callType,

callerName,

callerEmail,

callerAvatar

}

);


};