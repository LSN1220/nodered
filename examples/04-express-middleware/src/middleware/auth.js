function requireDemoToken(request, response, next) {
  const token = request.header("x-demo-token");

  if (token !== "dev-token") {
    return response.status(401).json({
      success: false,
      message: "Missing or invalid x-demo-token header",
    });
  }

  return next();
}

module.exports = {
  requireDemoToken,
};
