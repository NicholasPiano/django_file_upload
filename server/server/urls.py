from django.contrib import admin
from django.urls import path, include

from .views import login, register

urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/register/', register),
  path('api/login/', login),
  path('api/', include('files.urls')),
]
