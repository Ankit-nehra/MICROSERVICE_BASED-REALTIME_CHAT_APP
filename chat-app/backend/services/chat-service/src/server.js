import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import chatRoutes from "./routes/chat.routes.js";

import errorHandler from "./middleware/errorHandler.js";

import {
subClient,
connectRedis
} from "./config/redis.js";

import {
markMessagesRead
} from "./services/message.service.js";




const app = express();

app.use(
  cors()
);

app.use(
  express.json()
);

app.get(
  "/health",
  (req, res) => {

    res.json({
      service: "chat-service",
      status: "running",
    });

  }
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  errorHandler
);

const PORT =
  process.env.PORT || 5003;

const startServer = async () => {

  await connectDB();
await connectRedis();

await subClient.subscribe(
"chat_read_request",

async(message)=>{


try{


const data =
JSON.parse(message);


console.log(
"📖 READ REQUEST RECEIVED",
data
);


await markMessagesRead(
data.senderId,
data.receiverId
);


console.log(
"✅ Messages marked read"
);


}
catch(error){

console.log(
"Read receipt error:",
error
);

}


}

);




  app.listen(
    PORT,
    () => {

      console.log(
        `🚀 Chat Service running on ${PORT}`
      );

    }
  );

};

startServer();