const { capitalize } = require("../utils");

const serializersFields = (fields) =>
  fields.map((f) => "'" + f + "'").join(",");

const serializer = ([key, fields]) => `
  class ${capitalize(key)}Serializer(ModelSerializer):
    class Meta:
        model = ${capitalize(key)}
        # fields = (${serializersFields(Object.keys(fields))})`;

module.exports = ({ models }) => {
  return Object.entries(models).map(serializer).join("\n\n");
};
