function add(a, b) {
  // A function receives input through parameters and returns a result.
  return a + b;
}

function calculateOrderTotal(price, quantity) {
  return price * quantity;
}

function greetUser(name) {
  // Functions can also return formatted strings.
  return `Hello, ${name}!`;
}

function runFunctionsDemo() {
  const sum = add(2, 3);
  const total = calculateOrderTotal(20, 4);
  const greeting = greetUser("Alice");

  console.log("add(2, 3):", sum);
  console.log("calculateOrderTotal(20, 4):", total);
  console.log('greetUser("Alice"):', greeting);

  // In JavaScript, functions are values too.
  // That means you can store them in variables and call them later.
  const action = greetUser;
  console.log('action("Bob"):', action("Bob"));
}

module.exports = {
  runFunctionsDemo,
};
