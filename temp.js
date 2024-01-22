const fs = require("fs");
const data = fs.readFileSync("data.json");
console.dir(JSON.parse(data));
