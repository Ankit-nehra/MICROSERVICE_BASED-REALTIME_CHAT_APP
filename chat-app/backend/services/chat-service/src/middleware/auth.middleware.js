import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";

const authMiddleware = (
  req,
  res,
  next
) => {

  const authHeader =
    req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {

    return next(
      new AppError(
        "Authentication required",
        401
      )
    );

  }

  const token =
    authHeader.split(" ")[1];

  try {

    if (!process.env.JWT_SECRET) {

      throw new Error(
        "JWT_SECRET missing"
      );

    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = {
      userId: decoded.userId,
      sessionId: decoded.sessionId,
    };

    next();

  }
  catch {

    next(
      new AppError(
        "Invalid or expired token",
        401
      )
    );

  }

};

export default authMiddleware;

// Note: Abhi ye JWT verify karta hai. Future me agar har request par Redis session validation
// chahiye hogi, to API Gateway ya shared auth package ke through add karenge. 
// Chat Service ko Auth Service ke Redis par directly depend nahi karayenge.