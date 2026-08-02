import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./config/db.js";

import errorHandler from "./middleware/errorHandler.js";





dotenv.config();


const app =
  express();


app.use(
  cors()
);


app.use(
  express.json()
);


// Logger

app.use(
  (req,res,next)=>{

    console.log(
      `🌐 [USER SERVICE] ${req.method} ${req.url}`
    );

    next();

  }
);



app.use(
  "/api/users",
  userRoutes
);



app.use(
  errorHandler
);



const PORT =
  process.env.PORT || 5002;



const startServer =
async()=>{


  await connectDB();

 app.get("/health", (req,res)=>{

      res.json({
        status:"user service running",
      });

    });
  app.listen(
    PORT,
    ()=>{

      console.log(
        `🚀 User Service running on ${PORT}`
      );

    }
  );


};


startServer();
