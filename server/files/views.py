from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.http import FileResponse

from rest_framework.views import APIView
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from chunked_upload.views import ChunkedUploadView, ChunkedUploadCompleteView
from chunked_upload.models import ChunkedUpload

from .models import File, FileLink
from .serializers import FileSerializer, FileLinkSerializer

class SoftDeleteMixin(mixins.DestroyModelMixin):
  def destroy(self, request, *args, **kwargs):
    instance = self.get_queryset().get(id=self.kwargs.get('pk'))
    instance.deleted_at = timezone.now()
    instance.save()

    return Response({}, status=status.HTTP_200_OK)

class FileViewSet(SoftDeleteMixin, viewsets.ModelViewSet):
  serializer_class = FileSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return self.request.user.files.filter(deleted_at__isnull=True).order_by('name')

  def create(self, request, *args, **kwargs):
    serializer = self.serializer_class(data={ 'user': request.user.id, **request.data })

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    file = request.user.files.create(**serializer.validated_data)
    serialized_file = self.serializer_class(file)

    return Response(serialized_file.data, status=status.HTTP_201_CREATED)

class FileLinkViewSet(SoftDeleteMixin, viewsets.ModelViewSet):
  serializer_class = FileLinkSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return FileLink.objects.filter(
      deleted_at__isnull=True,
      file=self.kwargs['file_pk'],
    ).order_by('-date_expires')

  def create(self, request, *args, **kwargs):
    serializer = self.serializer_class(data=request.data)

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    file = File.objects.get(id=self.kwargs['file_pk'])
    link = file.links.create(**serializer.validated_data)
    serialized_link = self.serializer_class(link)

    return Response(serialized_link.data, status=status.HTTP_201_CREATED)

class UploadView(APIView, ChunkedUploadView):
  field_name = 'file'
  model = ChunkedUpload
  permission_classes = [IsAuthenticated]

  def check_permissions(self, request):
    # Allow non authenticated users to make uploads
    pass

class UploadCompleteView(APIView, ChunkedUploadCompleteView):
  model = ChunkedUpload
  permission_classes = [IsAuthenticated]

  def check_permissions(self, request):
    # Allow non authenticated users to make uploads
    pass

  def on_completion(self, uploaded_file, request):
    file_id = request.POST.get('id')
    file = File.objects.get(id=file_id)
    file.file = uploaded_file
    file.ready = True
    file.save()

  def get_response_data(self, chunked_upload, request):
    return {}

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((AllowAny,))
def check_download(request, token=None):
  if request.method == 'GET':
    file_links = FileLink.objects.filter(token=token)

    if not file_links.exists():
      return Response(status=status.HTTP_404_NOT_FOUND)

    file_link = file_links[0]
    is_expired = timezone.now() > file_link.date_expires

    if is_expired:
      return Response({ 'error': 'Link expired' }, status=status.HTTP_400_BAD_REQUEST)

    has_password = file_link.password is not None
    file_name = file_link.file.name

    return Response({ 'has_password': has_password, 'file_name': file_name }, status=status.HTTP_200_OK)

  elif request.method == 'POST':
    pass

@csrf_exempt
@api_view(['GET'])
@permission_classes((AllowAny,))
def download_file(request, token=None, password=None):
  if token is not None and password is not None:
    file_links = FileLink.objects.filter(token=token)

    if not file_links.exists():
      return Response(status=status.HTTP_404_NOT_FOUND)

    file_link = file_links[0]
    if file_link.password is not None and file_link.password != password:
      return Response(status=status.HTTP_404_NOT_FOUND)

    response = FileResponse(file_link.file.file)
    response['Content-Disposition'] = 'attachment; filename="{}"'.format(file_link.file.name)

    return response
