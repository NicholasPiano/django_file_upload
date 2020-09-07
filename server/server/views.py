from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def login(request):
  username = request.data.get('username')
  password = request.data.get('password')

  if username is None or password is None:
    return Response({ 'error': 'Please provide both username and password' }, status=status.HTTP_400_BAD_REQUEST)

  user = authenticate(username=username, password=password)

  if not user:
    return Response({ 'error': 'Invalid Credentials' }, status=status.HTTP_404_NOT_FOUND)

  token, _ = Token.objects.get_or_create(user=user)

  return Response({ 'response': { 'token': token.key } }, status=status.HTTP_200_OK)

User = get_user_model()

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
  username = request.data.get('username')
  password = request.data.get('password')

  if username is None or password is None:
    return Response({ 'error': 'Please provide both username and password' }, status=status.HTTP_400_BAD_REQUEST)

  users = User.objects.filter(username=username)

  if users.exists():
    return Response({ 'error': 'User already exists' }, status=status.HTTP_400_BAD_REQUEST)

  user = User.objects.create_user(username, password=password)
  token, _ = Token.objects.get_or_create(user=user)

  return Response({ 'response': { 'token': token.key } }, status=status.HTTP_200_OK)
