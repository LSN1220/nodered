function createDemoToken(userId) {
  return `demo-token-${userId}`;
}

function parseDemoToken(token) {
  if (!token || !token.startsWith("demo-token-")) {
    return null;
  }

  const userId = Number(token.replace("demo-token-", ""));
  return Number.isInteger(userId) ? userId : null;
}

module.exports = {
  createDemoToken,
  parseDemoToken,
};
