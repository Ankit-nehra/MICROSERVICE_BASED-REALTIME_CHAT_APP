import { createClient } from "redis";


export const redisClient =
  createClient({
    url: process.env.REDIS_URL,
  });


redisClient.on(
  "connect",
  () => {
    console.log(
      "🟢 Redis connecting..."
    );
  }
);


redisClient.on(
  "ready",
  () => {
    console.log(
      "🚀 Redis ready"
    );
  }
);


redisClient.on(
  "reconnecting",
  () => {
    console.log(
      "🔄 Redis reconnecting..."
    );
  }
);


redisClient.on(
  "end",
  () => {
    console.log(
      "🔴 Redis connection closed"
    );
  }
);


redisClient.on(
  "error",
  (error) => {
    console.error(
      "❌ Redis error:",
      error.message
    );
  }
);



export const connectRedis =
  async () => {

    if (
      redisClient.isOpen
    ) {
      console.log(
        "⚠️ Redis already connected"
      );

      return;
    }


    try {

      if(
        !process.env.REDIS_URL
      ){

        throw new Error(
          "REDIS_URL missing"
        );

      }


      await redisClient.connect();


      console.log(
        "✅ Redis connected successfully"
      );


    } catch(error){

      console.error(
        "❌ Redis connection failed:",
        error.message
      );


      process.exit(1);

    }

  };