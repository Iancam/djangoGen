const { capitalize } = require("./utils");

// typeUtils.js;
module.exports.typeTable = [
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

const fkey = (parentKey) => `ForeignKey ${capitalize(parentKey)}`;

module.exports.aliases = {
  string: "Char",
  int: "Integer",
  mtm: "ManyToMany",
  MT1: "ManyToOne",
  ref: fkey,
  references: fkey,
};
