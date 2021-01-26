const { capitalize } = require("../utils");

const serializersFields = (fields) =>
  fields.map((f) => "'" + f + "'").join(",");

const header = `
from .models import *

from rest_framework.serializers import ModelSerializer

`;

const serializer = ([key, fields]) => `
class ${capitalize(key)}Serializer(ModelSerializer):
  class Meta:
      model = ${capitalize(key)}
      # fields = (${serializersFields(Object.keys(fields))})`;

module.exports = ({ models }) => {
  return header + Object.entries(models).map(serializer).join("\n\n");
};
