from rest_framework import serializers

from .models import File, FileLink, FileDownload

class FileDownloadSerializer(serializers.ModelSerializer):
  class Meta:
    model = FileDownload
    fields = ['id']

class FileLinkSerializer(serializers.ModelSerializer):
  downloads = FileDownloadSerializer(many=True, required=False)
  password = serializers.CharField(write_only=True, required=False)

  class Meta:
    model = FileLink
    fields = ['id', 'token', 'date_expires', 'downloads', 'password']

class FileSerializer(serializers.ModelSerializer):
  links = serializers.SerializerMethodField()

  class Meta:
    model = File
    fields = ['id', 'name', 'file', 'ready', 'links']

  def get_links(self, file):
    queryset = file.links.filter(deleted_at__isnull=True)
    serializer = FileLinkSerializer(queryset, many=True)

    return serializer.data
