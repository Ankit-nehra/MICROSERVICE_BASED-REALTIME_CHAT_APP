import { createClient } from "redis";


export const redisClient =
createClient({

  url:
    process.env.REDIS_URL,

});



redisClient.on(
  "ready",
  ()=>{

    console.log(
      "🟢 Gateway Redis Ready"
    );

  }
);



redisClient.on(
  "error",
  (error)=>{

    console.log(
      "❌ Gateway Redis Error:",
      error.message
    );

  }
);



export const connectRedis =
async()=>{

  if(redisClient.isOpen){

    return;

  }


  await redisClient.connect();


};