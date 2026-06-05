function runObjectsArraysDemo() {
  // An object groups related data together.
  const user = {
    id: 1,
    name: "Alice",
    role: "admin",
    isActive: true,
  };

  console.log("user:", user);
  console.log("user.name:", user.name);

  // You can update object fields directly.
  user.role = "maintainer";
  console.log("updated user.role:", user.role);

  // Arrays store ordered collections of values.
  const deviceNames = ["sensor-a", "sensor-b", "sensor-c"];
  console.log("deviceNames:", deviceNames);
  console.log("first device:", deviceNames[0]);

  // Push adds a new item to the end of the array.
  deviceNames.push("sensor-d");
  console.log("after push:", deviceNames);

  // map creates a new array by transforming each item.
  const uppercasedDevices = deviceNames.map((deviceName) => deviceName.toUpperCase());
  console.log("uppercasedDevices:", uppercasedDevices);

  // filter creates a new array with only items that match a condition.
  const onlyBDevices = deviceNames.filter((deviceName) => deviceName.includes("b"));
  console.log("onlyBDevices:", onlyBDevices);
}

module.exports = {
  runObjectsArraysDemo,
};
