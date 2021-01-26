const { exec } = require("child_process");
const fs = require("fs");
const template = require("./pyTemplates");

exports.run = ([dir, modelsFile]) => {
  const models = JSON.parse(fs.readFileSync(modelsFile));
  fs.existsSync(dir) || fs.mkdirSync(dir);
  exec(`python3 manage.py startapp ${dir}`);
  template(models, dir);
};
// gen.js;
