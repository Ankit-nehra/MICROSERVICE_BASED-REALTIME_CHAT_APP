import axios from "axios";

import {
  proxyError,
} from "../middleware/proxyError.js";

import SERVICES from "../config/services.js";


const AUTH_SERVICE_URL =
  SERVICES.AUTH;



export const registerProxy = async (
  req,
  res
) => {

  try {
console.log("in proxy ");

    const response =
      await axios.post(

        `${AUTH_SERVICE_URL}/api/auth/register`,

        req.body,

        {
          timeout:5000,
        }

      );

console.log("in proxy response");

    res
      .status(response.status)
      .json(
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





export const loginProxy = async (
  req,
  res
) => {

  try {


    const response =
      await axios.post(

        `${AUTH_SERVICE_URL}/api/auth/login`,

        req.body,

        {
          timeout:5000,
        }

      );



    res
      .status(response.status)
      .json(
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





export const logoutProxy = async (
  req,
  res
) => {

  try {


    const response =
      await axios.post(


        `${AUTH_SERVICE_URL}/api/auth/logout`,


        {},


        {
          timeout:5000,

          headers:{

            Authorization:
              req.headers.authorization,

          },

        }

      );



    res
      .status(response.status)
      .json(
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