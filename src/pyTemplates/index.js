const fs = require("fs");
const { aliases } = require("../typeUtils");
const path = require("path");
const templates = [
  "admin",
  "api",
  "forms",
  "models",
  "serializers",
  // "tests",
  "urls",
  "views",
  "__init__",
];
module.exports = (models, opDir) => {
  const modelNames = Object.keys(models);
  const fieldNames = Object.values(models)
    .map(Object.keys)
    .map((fieldName) => aliases[fieldName] ?? fieldName);
  templates.forEach((file) => {
    const renderer = fs.existsSync(path.join(__dirname, file + ".py.js"))
      ? require("./" + file + ".py")
      : function blank() {
          return "";
        };
    console.log({ file, renderer });
    return fs.writeFileSync(
      path.join(opDir, file + ".py"),
      renderer({
        modelNames,
        fieldNames,
        models,
      })
    );
  });
};
