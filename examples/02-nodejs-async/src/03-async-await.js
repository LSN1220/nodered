function getUserById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "Alice",
        role: "admin",
      });
    }, 150);
  });
}

function getOrdersByUserId(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, userId, total: 88.5 },
        { id: 102, userId, total: 120.0 },
      ]);
    }, 150);
  });
}

async function runAsyncAwaitDemo() {
  // `await` pauses only inside this async function.
  // It does not block the whole Node.js process.
  const user = await getUserById(1);
  console.log("user:", user);

  const orders = await getOrdersByUserId(user.id);
  console.log("orders:", orders);
}

module.exports = {
  runAsyncAwaitDemo,
};
