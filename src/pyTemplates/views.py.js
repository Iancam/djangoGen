const view = (modelName) => `
class ${modelName}ViewSet(viewsets.ModelViewSet):
    queryset = ${modelName}.objects.all()
    serializer_class = ${modelName}Serializer`;

const views = (modelNames) => `
from rest_framework import viewsets
from .serializers import *
from .models import *
${modelNames.map(view).join("\n")}
`;

module.exports = ({ modelNames }) => views(modelNames);
