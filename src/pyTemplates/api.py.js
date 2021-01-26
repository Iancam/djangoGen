const header = `
from . import models
from . import serializers
from rest_framework import viewsets, permissions

`;

viewSet = (modelName) => `
class ${modelName}ViewSet(viewsets.ModelViewSet):
    """ViewSet for the ${modelName} class"""

    queryset = models.${modelName}.objects.all()
    serializer_class = serializers.${modelName}Serializer
    permission_classes = [permissions.IsAuthenticated]
`;

module.exports = ({ modelNames }) => `${header}
${modelNames.map(viewSet).join("\n")}`;
