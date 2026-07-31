export const proxyError = (
  err,
  res
) => {

  const statusCode =
    err.response?.status || 503;


  const errorResponse =
    err.response?.data || {
      success: false,
      message:
        "Service temporarily unavailable",
    };


  res
    .status(statusCode)
    .json(errorResponse);

};