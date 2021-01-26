const { modelEntry2PyType } = require("../typeUtils");
const { ffields } = require("../utils");

const adminHeader = (modelNames) => `
from django.contrib import admin
from django import forms
from .models import ${modelNames.join(", ")}`;

const adminForm = (modelName) => `
class ${modelName}AdminForm(forms.ModelForm):
    
    class Meta:
        model = ${modelName}
        fields = '__all__'
`;

const filterTypes = ["ManyTo"];

const admin = (modelName, fields, models) => {
  const filteredFields = fields.filter((f) =>
    filterTypes.every(
      (type) => !modelEntry2PyType([f, models[modelName][f]]).startsWith(type)
    )
  );
  console.log(
    fields,
    fields.map((f) => models[modelName][f]),
    filteredFields
  );
  return `
class ${modelName}Admin(admin.ModelAdmin):
    form = ${modelName}AdminForm
    list_display = [${ffields(filteredFields)}]
    readonly_fields = []

admin.site.register(${modelName}, ${modelName}Admin)
`;
};
module.exports = ({ modelNames, fieldNames, models }) => `
${adminHeader(modelNames)}
${modelNames.map(adminForm).join("")}
${modelNames
  .map((modelName, i) => admin(modelName, fieldNames[i], models))
  .join("")}
`;
