const { ffields } = require("../utils");
const header = (modelNames) => `from django import forms
from .models import *

`;

const form = (modelName, fields) => `
class ${modelName}Form(forms.ModelForm):
    class Meta:
        model = ${modelName}
        fields = [${ffields(fields)}]`;

module.exports = ({ modelNames, fieldNames }) => `
${header(modelNames)}
${modelNames.map((name, i) => form(name, fieldNames[i]))}
`;
