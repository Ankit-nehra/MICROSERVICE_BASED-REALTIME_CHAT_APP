import {
createClient
} from "redis";


const redisURL =
process.env.REDIS_URL;

if(!redisURL){
 throw new Error(
  "REDIS_URL missing in environment"
 );
}

export const subClient =
createClient({
url:redisURL
});


export const pubClient =
createClient({
url:redisURL
});


export const connectRedis =
async()=>{

await subClient.connect();

await pubClient.connect();


console.log(
"Redis connected"
);

};