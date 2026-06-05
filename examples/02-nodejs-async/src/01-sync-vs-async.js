function runSyncVsAsyncDemo() {
  console.log("Step 1: sync code starts");

  // `setTimeout` registers a callback to run later.
  // The current function does not wait here.
  setTimeout(() => {
    console.log("Step 3: async callback from setTimeout");
  }, 100);

  console.log("Step 2: sync code ends before the callback runs");
}

module.exports = {
  runSyncVsAsyncDemo,
};
