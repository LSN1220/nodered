function requestLogger(request, response, next) {
  const startedAt = Date.now();

  response.on("finish", () => {
    const durationMs = Date.now() - startedAt;

    console.log(
      `${request.method} ${request.originalUrl} -> ${response.statusCode} (${durationMs}ms)`
    );
  });

  // Calling next tells Express to continue to the next middleware or route.
  next();
}

module.exports = {
  requestLogger,
};
