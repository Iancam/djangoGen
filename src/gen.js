// gen.js;
const fs = require("fs");
const template = require("./pyTemplates");
const models = JSON.parse(fs.readFileSync("inp.json"));
const dir = "cats";

fs.existsSync(dir) || fs.mkdirSync(dir);
template(models, dir);
