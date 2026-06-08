function notFoundHandler(request, response) {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
}

function errorHandler(error, request, response, next) {
  void next;

  if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return response.status(409).json({
      success: false,
      message: "Unique constraint failed",
    });
  }

  console.error("Unhandled error:", error.message);

  return response.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
