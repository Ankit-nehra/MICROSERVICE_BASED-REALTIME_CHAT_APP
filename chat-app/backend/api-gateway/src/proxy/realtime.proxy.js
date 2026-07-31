import axios from "axios";

import {
  proxyError,
} from "../middleware/proxyError.js";


import 
  SERVICES
 from "../config/services.js";


const REALTIME_SERVICE_URL =
  SERVICES.REALTIME;


export const realtimeHealthProxy = async (
 req,
 res
) => {

try{


const response =
await axios.get(

 `${REALTIME_SERVICE_URL}/health`,

 {
  headers:{
    Authorization:
      req.headers.authorization
  }
 }

);



res.json(
 response.data
);


}
catch(err){

proxyError(
 err,
 res
);

}

};