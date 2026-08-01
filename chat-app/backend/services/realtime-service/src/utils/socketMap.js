export const onlineUsers = new Map();
// userId → { socketId, joinTime, name, avatar }

export const activeChats = new Map();



export const addUser = (
  userId,
  socketId,
  name = null,
  avatar = ""
) => {


  console.log(
    "➕ [MAP ADD]",
    userId,
    socketId
  );



  const existingUser =
    onlineUsers.get(
      String(userId)
    );



  if(existingUser){


    if(
      existingUser.socketId === socketId
    ){

      console.log(
        "⚠️ User already connected"
      );

      return;

    }


    console.log(
      "🔄 Replacing old socket"
    );

  }




  onlineUsers.set(
    String(userId),
    {

      socketId,


      joinTime:
        new Date()
        .toISOString(),


      name,


      avatar

    }
  );


};





export const removeUser = (
 socketId
) => {


console.log(
"➖ [MAP REMOVE] socketId:",
socketId
);



for(
 let [userId,data]
 of onlineUsers.entries()
){


if(
 data.socketId === socketId
){


console.log(
"🗑️ [MAP DELETE] userId:",
userId
);


onlineUsers.delete(
 userId
);


activeChats.delete(
 userId
);


break;


}


}


};





export const getOnlineUsers = ()=>{


return Array.from(
 onlineUsers.entries()
)
.map(
([userId,data])=>({

 userId,

 socketId:
 data.socketId,


 joinTime:
 data.joinTime,


 name:
 data.name,


 avatar:
 data.avatar


})
);


};





export const setActiveChat = (
 userId,
 chatUserId
)=>{

activeChats.set(
 String(userId),
 String(chatUserId)
);

};




export const removeActiveChat = (
 userId
)=>{

activeChats.delete(
 userId
);

};





export const getActiveChat = (
 userId
)=>{

return activeChats.get(
 userId
);

};
