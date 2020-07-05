from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from .schema import schema

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('films.api.urls', namespace='movies')),
    path('graphql/', csrf_exempt(GraphQLView.as_view(
        graphiql=True,
        schema=schema
    )) ),
    # path('graphql/', GraphQLView.as_view(
    #     graphiql=True,
    #     schema=schema
    # ) ),
    path('films/', include('films.urls', namespace='films')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

