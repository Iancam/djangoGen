const { aliases, typeTable, modelEntry2PyType } = require("../typeUtils");
const { capitalize } = require("../utils");

const pyModelClass = ([modelName, fields]) => `
class ${modelName}(Model):
  ${Object.entries(fields)
    .map(([key, v]) => key + "=" + modelEntry2PyType([key, v]))
    .join("\n  ")}
`;
const header = `from django.db.models import *
from django.db.models.deletion import CASCADE`;
const pyModels = (models) => Object.entries(models).map(pyModelClass).join("");

module.exports = ({ models }) => `
${header}
${pyModels(models)}
`;
