const fs = require("node:fs/promises");
const path = require("node:path");

async function runFileReadWriteDemo() {
  const inputFilePath = path.join(__dirname, "..", "data", "input.txt");
  const outputFilePath = path.join(__dirname, "..", "data", "output.txt");

  try {
    // `await` makes async file operations read top-to-bottom like sync code.
    const originalText = await fs.readFile(inputFilePath, "utf8");
    console.log("originalText:", originalText.trim());

    const transformedText = originalText.toUpperCase();
    await fs.writeFile(outputFilePath, transformedText, "utf8");

    console.log("output file written:", outputFilePath);
  } catch (error) {
    // Central idea: async code still needs explicit error handling.
    console.error("File operation failed:", error.message);
    throw error;
  }
}

module.exports = {
  runFileReadWriteDemo,
};
