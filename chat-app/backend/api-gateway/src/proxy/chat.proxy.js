import axios from "axios";

import {
  proxyError,
} from "../middleware/proxyError.js";

import 
  SERVICES
 from "../config/services.js";


const CHAT_SERVICE_URL =
  SERVICES.CHAT;



export const sendMessageProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.post(

        `${CHAT_SERVICE_URL}/api/chat/send`,

        req.body,

        {
          headers: {
            Authorization:
              req.headers.authorization,
          },
        }

      );


    res.json(
      response.data
    );

  }
  catch(error){

    proxyError(
      error,
      res
    );

  }

};




export const getConversationProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.get(

        `${CHAT_SERVICE_URL}/api/chat/conversation/${req.params.otherUserId}`,

        {
          headers: {
            Authorization:
              req.headers.authorization,
          },
        }

      );


    res.json(
      response.data
    );


  }
  catch(error){

    proxyError(
      error,
      res
    );

  }

};




export const markReadProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.patch(

        `${CHAT_SERVICE_URL}/api/chat/read`,

        req.body,

        {
          headers: {
            Authorization:
              req.headers.authorization,
          },
        }

      );


    res.json(
      response.data
    );


  }
  catch(error){

    proxyError(
      error,
      res
    );

  }

};




export const unreadCountProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.get(

        `${CHAT_SERVICE_URL}/api/chat/unread`,

        {
          headers: {
            Authorization:
              req.headers.authorization,
          },
        }

      );


    res.json(
      response.data
    );


  }
  catch(error){

    proxyError(
      error,
      res
    );

  }

};