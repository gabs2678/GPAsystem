from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer
from rest_framework import permissions, status
from .validation import custom_validation,validate_email,validate_username,validate_password

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self,request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        print(request)
        data = request.data
        #validate data
        if not validate_email(data):
            return Response({"detail": "Invalid email."}, status=status.HTTP_400_BAD_REQUEST)
        if not validate_password(data):
            return Response({"detail": "Invalid password."}, status=status.HTTP_400_BAD_REQUEST)
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            if not user:
                return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)
# class UserLogout(APIView):
#     def post(self, request):
#         if request.user.is_authenticated:
#             logout(request)
#             return Response(status=status.HTTP_200_OK)
#         else:
#             return Response({"detail": "You are not logged in."}, status=status.HTTP_401_UNAUTHORIZED)

# class UserLogout(APIView):
#     def post(self,request):
#         logout(request)
#         return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status= status.HTTP_200_OK)


