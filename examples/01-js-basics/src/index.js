const { runVariablesDemo } = require("./01-variables");
const { runFunctionsDemo } = require("./02-functions");
const { runObjectsArraysDemo } = require("./03-objects-arrays");
const { runModulesDemo } = require("./04-modules");

function printSection(title) {
  console.log(`\n=== ${title} ===`);
}

function main() {
  console.log("JavaScript basics demo is starting...");
  console.log("Read the comments in each file while comparing them with this output.");

  printSection("1. Variables");
  runVariablesDemo();

  printSection("2. Functions");
  runFunctionsDemo();

  printSection("3. Objects And Arrays");
  runObjectsArraysDemo();

  printSection("4. Modules");
  runModulesDemo();

  console.log("\nAll demos finished.");
}

main();
