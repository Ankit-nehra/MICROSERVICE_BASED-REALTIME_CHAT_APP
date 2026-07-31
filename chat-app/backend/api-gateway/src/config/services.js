const SERVICES = {

  AUTH:
    "http://localhost:5001",

  USER:
    process.env.USER_SERVICE_URL,

  CHAT:
    process.env.CHAT_SERVICE_URL,

  REALTIME:
    process.env.REALTIME_SERVICE_URL,

};


export default SERVICES;