const { exec } = require("child_process");
const fs = require("fs");
const template = require("./pyTemplates");
const { typeTable } = require("./typeUtils");

exports.run = ([command, ...rest]) => {
  const commands = {
    example: () => {
      console.log(fs.readFileSync(__dirname + "/../example"));
    },
    types: () => console.log(typeTable),
    gen: ([dir, modelsFile]) => {
      const models = JSON.parse(fs.readFileSync(modelsFile));
      fs.existsSync(dir) || fs.mkdirSync(dir);
      exec(`python3 manage.py startapp ${dir}`);
      template(models, dir);
      console.log(
        "Don't forget to add " +
          dir +
          " to settings.py 'INSTALLED_APPS'\n also, add path(\"" +
          dir +
          "\", include('" +
          dir +
          ".urls'))"
      );
    },
  }[command](rest);
};
