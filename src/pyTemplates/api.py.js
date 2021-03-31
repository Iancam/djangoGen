const header = `
from . import models
from . import serializers
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

class bulkModelViewset(viewsets.ModelViewSet):
    filterset_fields = "__all__"
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
`;

viewSet = (modelName) => `
class ${modelName}ViewSet(bulkModelViewset):
    """ViewSet for the ${modelName} class"""

    queryset = models.${modelName}.objects.all()
    serializer_class = serializers.${modelName}Serializer
    permission_classes = [permissions.IsAuthenticated]
    create = create
    filterset_fields = "__all__"
`;

module.exports = ({ modelNames }) => `${header}
${modelNames.map(viewSet).join("\n")}`;
