const { aliases, typeTable } = require("../typeUtils");

const modelEntry2Py = ([key, inpType]) => {
  const nomDeJure =
    (typeof aliases[inpType] === "function"
      ? aliases[inpType](key)
      : aliases[inpType]) ?? inpType;

  const [type, ...args] = nomDeJure.split(" ");
  if (!aliases[type] && !typeTable.includes(type.toLowerCase())) {
    console.warn("Table is missing type: " + inpType + type);
  }
  const formattedArgs = args
    .map((arg) => {
      return arg.replace(":", "=");
    })
    .join(", ");

  const modelExpression = `models.${
    aliases[type] ?? type
  }Field(${formattedArgs})`;
  return `${key} = ${modelExpression}`;
};

const pyModelClass = ([modelName, fields]) => `
class ${modelName}(models.Model):
  ${Object.entries(fields).map(modelEntry2Py).join("\n  ")}
`;
const header = `from django.db import models`;
const pyModels = (models) => Object.entries(models).map(pyModelClass).join("");

module.exports = ({ models }) => `
${header}
${pyModels(models)}
`;
