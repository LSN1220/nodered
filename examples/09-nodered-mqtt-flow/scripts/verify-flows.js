const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const flowsPath = path.join(__dirname, "..", "data", "flows.json");
const flows = JSON.parse(fs.readFileSync(flowsPath, "utf8"));

assert.ok(Array.isArray(flows), "flows.json must contain an array");

const nodeTypes = new Set(flows.map((node) => node.type));
assert.ok(nodeTypes.has("tab"), "flow must include a tab");
assert.ok(nodeTypes.has("mqtt-broker"), "flow must include an MQTT broker config");
assert.ok(nodeTypes.has("mqtt in"), "flow must include an MQTT input node");
assert.ok(nodeTypes.has("json"), "flow must include a JSON parser node");
assert.ok(nodeTypes.has("switch"), "flow must include a switch node for alerts");
assert.ok(nodeTypes.has("http in"), "flow must include an HTTP query endpoint");

const mqttNode = flows.find((node) => node.type === "mqtt in");
assert.equal(mqttNode.topic, "devices/+/telemetry");

const latestEndpoint = flows.find((node) => node.type === "http in");
assert.equal(latestEndpoint.url, "/api/iot/latest");

console.log("09-nodered-mqtt-flow flow JSON is valid.");
