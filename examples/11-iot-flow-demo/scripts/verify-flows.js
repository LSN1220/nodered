const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const flowsPath = path.join(__dirname, "..", "nodered-data", "flows.json");
const flows = JSON.parse(fs.readFileSync(flowsPath, "utf8"));

assert.ok(Array.isArray(flows), "flows.json must contain an array");

const nodeTypes = new Set(flows.map((node) => node.type));
assert.ok(nodeTypes.has("mqtt-broker"), "flow must define an MQTT broker");
assert.ok(nodeTypes.has("mqtt in"), "flow must subscribe to MQTT telemetry");
assert.ok(nodeTypes.has("json"), "flow must parse JSON payloads");
assert.ok(nodeTypes.has("function"), "flow must normalize telemetry");
assert.ok(nodeTypes.has("http request"), "flow must forward data to the API");
assert.ok(nodeTypes.has("http in"), "flow must expose a Node-RED query endpoint");

const mqttInput = flows.find((node) => node.type === "mqtt in");
assert.equal(mqttInput.topic, "devices/+/telemetry");

const apiPost = flows.find((node) => node.type === "http request" && node.method === "POST");
assert.equal(apiPost.url, "http://api:3020/internal/telemetry");

console.log("11-iot-flow-demo flow JSON is valid.");
