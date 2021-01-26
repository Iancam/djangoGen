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

const admin = (modelName, fields) => `
class ${modelName}Admin(admin.ModelAdmin):
    form = ${modelName}AdminForm
    list_display = [${ffields(fields)}]
    readonly_fields = [${ffields(fields)}]

admin.site.register(${modelName}, ${modelName}Admin)
`;
module.exports = ({ modelNames, fieldNames }) => `
${adminHeader(modelNames)}
${modelNames.map(adminForm).join("")}
${modelNames.map((modelName, i) => admin(modelName, fieldNames[i])).join("")}
`;
