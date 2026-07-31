export const redisKeys = {

  userPresence: (userId) =>
    `presence:user:${userId}`,


  onlineUsers:
    "presence:online-users",


};