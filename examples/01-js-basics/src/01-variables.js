function runVariablesDemo() {
  // `const` means the variable binding itself should not be reassigned.
  // It is the default choice for most values.
  const courseName = "Node.js Backend Basics";

  // `let` means the variable can be updated later.
  let completedLessons = 1;
  completedLessons = completedLessons + 1;

  // JavaScript has several common primitive types.
  const price = 99.9;
  const isBeginner = true;
  const emptyValue = null;
  let notAssigned;

  console.log("courseName:", courseName);
  console.log("completedLessons:", completedLessons);
  console.log("price:", price);
  console.log("isBeginner:", isBeginner);
  console.log("emptyValue:", emptyValue);
  console.log("notAssigned:", notAssigned);

  // `typeof` is useful for quickly checking what kind of value you have.
  console.log("typeof courseName:", typeof courseName);
  console.log("typeof price:", typeof price);
  console.log("typeof isBeginner:", typeof isBeginner);
  console.log("typeof notAssigned:", typeof notAssigned);

  // Template strings use backticks and make string interpolation easy.
  const summary = `Course: ${courseName}, completed lessons: ${completedLessons}`;
  console.log("summary:", summary);
}

module.exports = {
  runVariablesDemo,
};
