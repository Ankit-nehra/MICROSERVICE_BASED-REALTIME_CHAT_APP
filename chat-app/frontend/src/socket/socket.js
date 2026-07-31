import { io } from "socket.io-client";


export const socket = io(
  "https://microservice-based-realtime-chat-app-fjwa.onrender.com",
  {
    autoConnect:false,

    transports:[
      "websocket"
    ],

    auth:{
      token:null
    },

    reconnection:true,

    reconnectionAttempts:5
  }
);
