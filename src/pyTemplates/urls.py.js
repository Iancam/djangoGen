const { capitalize } = require("../utils");

const routerRegister = (modelName) =>
  `router.register(r'${modelName.toLowerCase()}', api.${capitalize(
    modelName
  )}ViewSet)`;

const urls = (modelNames) => `
from django.urls import path, include
from rest_framework import routers

from . import api
from . import views

router = routers.DefaultRouter()
${modelNames.map(routerRegister).join("\n")}

urlpatterns = (
    # urls for Django Rest Framework API
    path('api/v1/', include(router.urls)),
)
`;

module.exports = ({ modelNames }) => urls(modelNames);
