function wait(ms) {
  // A Promise represents a value that will become available later.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Finished waiting for ${ms}ms`);
    }, ms);
  });
}

async function runPromisesDemo() {
  console.log("Waiting for a Promise to resolve...");

  const message = await wait(200);
  console.log(message);
}

module.exports = {
  runPromisesDemo,
};
