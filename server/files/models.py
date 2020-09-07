import uuid

from django.db import models
from django.contrib.auth.models import User

class Manager(models.Manager):
  def get(self, *args, **kwargs):
    filtered = self.filter(*args, **kwargs)

    if filtered.exists():
      return filtered.get()

    return None

class Model(models.Model):
  objects = Manager()

  id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
  date_created = models.DateTimeField(auto_now_add=True)
  deleted_at = models.DateTimeField(auto_now_add=False, null=True)

  class Meta:
    abstract = True

class File(Model):
  user = models.ForeignKey(User, related_name='files', on_delete=models.CASCADE)
  name = models.CharField(max_length=255)
  file = models.FileField(upload_to='uploads/', null=True)
  ready = models.BooleanField(default=False)

class FileLink(Model):
  file = models.ForeignKey(File, related_name='links', on_delete=models.CASCADE)
  token = models.UUIDField(default=uuid.uuid4)
  password = models.CharField(max_length=255, null=True)
  date_expires = models.DateTimeField(auto_now_add=False)

class FileDownload(Model):
  link = models.ForeignKey(FileLink, related_name='downloads', on_delete=models.CASCADE)
