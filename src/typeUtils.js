const { capitalize } = require("./utils");

// typeUtils.js;
const typeTable = [
  "ManyToMany",
  "Auto",
  "BigAuto",
  "BigInteger",
  "Binary",
  "Boolean",
  "Char",
  "Date",
  "DateTime",
  "Decimal",
  "Duration",
  "Email",
  "File",
  "FilePath",
  "Float",
  "Image",
  "Integer",
  "GenericIPAddress",
  "JSON",
  "NullBoolean",
  "PositiveBigInteger",
  "PositiveInteger",
  "PositiveSmallInteger",
  "Slug",
  "SmallAuto",
  "SmallInteger",
  "Text",
  "Time",
  "URL",
  "UUID",
  "ForeignKey",
].map((str) => str.toLowerCase());

const fkey = (parentKey) =>
  `ForeignKey ${capitalize(parentKey)} on_delete:CASCADE`;

const propSuffix = {
  ForeignKey: "",
};

const aliases = {
  string: "Char max_length=128",
  int: "Integer",
  mtm: "ManyToMany",
  MT1: "ManyToOne",
  url: "URL",
  ref: fkey,
  references: fkey,
};

module.exports.modelEntry2PyType = ([key, inpType]) => {
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
  const finalType = capitalize(aliases[type] ?? type);
  const suffix = propSuffix[finalType] ?? "Field";
  const modelExpression = `${finalType}${suffix}(${formattedArgs})`;
  return `${modelExpression}`;
};

module.exports.aliases = aliases;
module.exports.typeTable = typeTable;
