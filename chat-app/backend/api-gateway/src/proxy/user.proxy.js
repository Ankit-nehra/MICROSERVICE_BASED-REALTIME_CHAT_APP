

import axios from "axios";

import SERVICES from "../config/services.js";

import {
  proxyError,
} from "../middleware/proxyError.js";

const USER_SERVICE_URL =
  SERVICES.USER;



export const getUsersProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.get(

        `${USER_SERVICE_URL}/api/users`,

        {

          headers: {

            Authorization:
              req.headers.authorization,

            "x-auth-user-id":
              req.user.userId,

          },

          timeout: 5000,

        }

      );

    res
      .status(response.status)
      .json(response.data);

  }
  catch (error) {

    proxyError(
      error,
      res
    );

  }

};





export const getMyProfileProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.get(

        `${USER_SERVICE_URL}/api/users/me`,

        {

          headers: {

            Authorization:
              req.headers.authorization,

            "x-auth-user-id":
              req.user.userId,

          },

          timeout: 5000,

        }

      );

    res
      .status(response.status)
      .json(response.data);

  }
  catch (error) {

    proxyError(
      error,
      res
    );

  }

};





export const getUserProfileProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.get(

        `${USER_SERVICE_URL}/api/users/${req.params.userId}`,

        {

          headers: {

            Authorization:
              req.headers.authorization,

            "x-auth-user-id":
              req.user.userId,

          },

          timeout: 5000,

        }

      );

    res
      .status(response.status)
      .json(response.data);

  }
  catch (error) {

    proxyError(
      error,
      res
    );

  }

};





export const updateProfileProxy = async (
  req,
  res
) => {

  try {

    const response =
      await axios.patch(

        `${USER_SERVICE_URL}/api/users/profile`,

        req.body,

        {

          headers: {

            Authorization:
              req.headers.authorization,

            "x-auth-user-id":
              req.user.userId,

          },

          timeout: 5000,

        }

      );

    res
      .status(response.status)
      .json(response.data);

  }
  catch (error) {

    proxyError(
      error,
      res
    );

  }

};