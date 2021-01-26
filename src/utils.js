// utils.js;
module.exports.capitalize = (word) => word[0].toUpperCase() + word.slice(1);
module.exports.ffields = (fields) => fields.map((f) => `'${f}'`).join(", ");
