const { runSyncVsAsyncDemo } = require("./01-sync-vs-async");
const { runPromisesDemo } = require("./02-promises");
const { runAsyncAwaitDemo } = require("./03-async-await");
const { runFileReadWriteDemo } = require("./04-file-read-write");

function printSection(title) {
  console.log(`\n=== ${title} ===`);
}

async function main() {
  console.log("Node.js async demo is starting...");

  printSection("1. Sync Vs Async");
  runSyncVsAsyncDemo();

  printSection("2. Promises");
  await runPromisesDemo();

  printSection("3. Async Await");
  await runAsyncAwaitDemo();

  printSection("4. File Read Write");
  await runFileReadWriteDemo();

  console.log("\nAll async demos finished.");
}

main().catch((error) => {
  console.error("Program failed:", error.message);
  process.exitCode = 1;
});
