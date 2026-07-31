import {create} from "zustand";


const useChatStore=create((set)=>({

messages:[],

setMessages:(messages)=>set({
 messages
}),


addMessage:(message)=>{

set(state=>{

const exists =
state.messages.some(
m =>
String(m._id) === String(message._id)
);

if(exists)
return state;


return {
messages:[
...state.messages,
message
]
}

})

},

markMessagesRead:(readerId)=>
set((state)=>({

messages:
state.messages.map(msg=>{

const receiver =
String(
msg.receiverId?._id ||
msg.receiverId
);


if(receiver === String(readerId)){
 return {
  ...msg,
  read:true
 };
}


return msg;

})

})),



clearMessages:()=>set({
 messages:[]
})

}));

export default useChatStore;