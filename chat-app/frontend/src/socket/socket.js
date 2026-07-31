import { io } from "socket.io-client";


export const socket = io(
  "http://localhost:5004",
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