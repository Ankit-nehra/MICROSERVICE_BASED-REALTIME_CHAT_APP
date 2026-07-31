import AppError from "../utils/AppError.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      const message =
        error.issues?.[0]?.message ||
        "Validation failed";

      next(new AppError(message, 400));
    }
  };
};

export default validate;