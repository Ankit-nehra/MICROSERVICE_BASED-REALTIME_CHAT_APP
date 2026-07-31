import "dotenv/config";



import express from "express";
import cors from "cors";

import {
 connectRedis
} from "./config/redis.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import realtimeRoutes from "./routes/realtime.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import errorHandler from "./middleware/errorHandler.js";


const app = express();


app.use(cors());

app.use(express.json());


// Routes

app.get("/health",(req,res)=>{
res.json({
service:"api-gateway",
status:"running"
});
}
);


app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/users",
  userRoutes
);


app.use(
  "/api/realtime",
  realtimeRoutes
);


app.use(
  "/api/chat",
  chatRoutes
);


// Global Error Handler
app.use(
  errorHandler
);



const PORT =
  process.env.PORT || 5000;





connectRedis();



app.listen(
PORT,
()=>{

console.log(
`🚀 API Gateway running on ${PORT}`
);

}
);

