from django.urls import path, include
from rest_framework import routers
from rest_framework_nested import routers as nested_routers

from .views import FileViewSet, FileLinkViewSet, UploadView, UploadCompleteView, check_download, download_file

router = routers.SimpleRouter()
router.register(r'files', FileViewSet, basename='files')

links_router = nested_routers.NestedSimpleRouter(router, r'files', lookup='file')
links_router.register(r'links', FileLinkViewSet, basename='file-links')

urlpatterns = [
  path('files/<uuid:id>/upload', UploadView.as_view()),
  path('files/<uuid:id>/upload_complete', UploadCompleteView.as_view()),
  path('files/check_download/<uuid:token>/', check_download),
  path('files/download/<uuid:token>/<slug:password>', download_file),
  path('', include(router.urls)),
  path('', include(links_router.urls)),
]
