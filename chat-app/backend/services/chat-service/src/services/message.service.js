import Message from "../models/message.model.js";

export const markMessagesRead =
async(
senderId,
receiverId
)=>{


await Message.updateMany(

{

senderId,
receiverId,
read:false

},

{

$set:{
read:true
}

}

);


};