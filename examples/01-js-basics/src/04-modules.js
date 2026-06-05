const { add, divide } = require("./utils/math-utils");

function runModulesDemo() {
  // Splitting code into modules keeps files focused and easier to reuse.
  const totalDevices = add(3, 2);
  const averageTemperature = divide(50, 2);

  console.log("add(3, 2):", totalDevices);
  console.log("divide(50, 2):", averageTemperature);

  // Real backend projects rely heavily on modules:
  // routes, services, database helpers, config, validation, and so on.
}

module.exports = {
  runModulesDemo,
};
