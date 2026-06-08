const { parseDemoToken } = require("../utils/tokens");
const usersService = require("../services/users.service");

function authenticate(request, response, next) {
  const header = request.header("authorization") || "";
  const token = header.replace("Bearer ", "");
  const userId = parseDemoToken(token);

  if (!userId) {
    return response.status(401).json({
      success: false,
      message: "Missing or invalid bearer token",
    });
  }

  const user = usersService.getUserProfileById(userId);

  if (!user || user.status !== "active") {
    return response.status(401).json({
      success: false,
      message: "User is not allowed to access this API",
    });
  }

  request.currentUser = user;
  return next();
}

module.exports = {
  authenticate,
};
