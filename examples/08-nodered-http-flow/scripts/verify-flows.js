const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const flowsPath = path.join(__dirname, "..", "data", "flows.json");
const flows = JSON.parse(fs.readFileSync(flowsPath, "utf8"));

assert.ok(Array.isArray(flows), "flows.json must contain an array");

const nodeTypes = new Set(flows.map((node) => node.type));
assert.ok(nodeTypes.has("tab"), "flow must include a tab");
assert.ok(nodeTypes.has("http in"), "flow must include http in nodes");
assert.ok(nodeTypes.has("http response"), "flow must include http response nodes");
assert.ok(nodeTypes.has("function"), "flow must include function nodes");

const urls = flows.filter((node) => node.type === "http in").map((node) => node.url);
assert.deepEqual(urls.sort(), ["/api/context/count", "/api/devices", "/api/health"]);

console.log("08-nodered-http-flow flow JSON is valid.");
