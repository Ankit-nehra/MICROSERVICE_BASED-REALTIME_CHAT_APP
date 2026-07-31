import {
    pubClient
} from "../config/redis.js";


export const publishMessagesRead = async(data)=>{

    await pubClient.publish(
        "messages_read",
        JSON.stringify(data)
    );

};