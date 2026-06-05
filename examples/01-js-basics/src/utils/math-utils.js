function add(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("b cannot be 0");
  }

  return a / b;
}

module.exports = {
  add,
  divide,
};
