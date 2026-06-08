function notFoundHandler(request, response) {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
}

function errorHandler(error, request, response, next) {
  // `next` is required in the signature so Express recognizes this as error middleware.
  void next;

  console.error("Unhandled error:", error.message);

  response.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
