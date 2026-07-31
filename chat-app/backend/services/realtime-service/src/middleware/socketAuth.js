import jwt from "jsonwebtoken";


const socketAuth = (
  socket,
  next
) => {

  try {

    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace(
        "Bearer ",
        ""
      ) ||
      socket.handshake.query?.token;


    if (!token) {

      return next(
        new Error(
          "Authentication token missing"
        )
      );

    }


    const jwtSecret =
      process.env.JWT_SECRET;


    if (!jwtSecret) {

      console.error(
        "❌ JWT_SECRET missing in environment"
      );

      return next(
        new Error(
          "JWT configuration missing"
        )
      );

    }


    let decoded;


    try {

      decoded =
        jwt.verify(
          token,
          jwtSecret
        );

    }
    catch(error){


      if(
        error.name === "TokenExpiredError"
      ){

        return next(
          new Error(
            "Authentication token expired"
          )
        );

      }


      if(
        error.name === "JsonWebTokenError"
      ){

        return next(
          new Error(
            "Invalid authentication token"
          )
        );

      }


      throw error;

    }



    const {
      userId,
      sessionId
    } = decoded;



    if(
      !userId ||
      !sessionId
    ){

      return next(
        new Error(
          "Invalid token payload"
        )
      );

    }



    socket.user = {

      userId: String(userId),

      sessionId: String(sessionId),

    };



    return next();


  }
  catch(error){


    console.error(
      "❌ Socket authentication failed:",
      error.message
    );


    return next(
      new Error(
        "Socket authentication failed"
      )
    );


  }

};


export default socketAuth;