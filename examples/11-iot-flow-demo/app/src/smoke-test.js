const assert = require("node:assert/strict");
const { app } = require("./app");
require("./scripts/seed");

async function requestJson(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = response.status === 204 ? null : await response.json();

  return {
    status: response.status,
    body,
  };
}

async function run() {
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const devices = await requestJson(baseUrl, "/devices");
    assert.equal(devices.status, 200);
    assert.equal(devices.body.data.length, 2);

    const ingested = await requestJson(baseUrl, "/internal/telemetry", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        deviceSn: "TEMP-001",
        temperature: 38.6,
        humidity: 45,
        recordedAt: "2026-06-08T10:00:00.000Z",
      }),
    });
    assert.equal(ingested.status, 201);
    assert.equal(ingested.body.data.device.sn, "TEMP-001");
    assert.equal(ingested.body.data.alert.message, "Temperature is too high");

    const latest = await requestJson(baseUrl, "/telemetry/latest");
    assert.equal(latest.status, 200);
    assert.equal(latest.body.data[0].temperature, 38.6);

    const alerts = await requestJson(baseUrl, "/alerts");
    assert.equal(alerts.status, 200);
    assert.equal(alerts.body.data.length, 1);

    console.log("11-iot-flow-demo smoke test passed.");
  } finally {
    server.close();
  }
}

run().catch((error) => {
  console.error("Smoke test failed:", error);
  process.exitCode = 1;
});
