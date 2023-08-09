# views.py

from django.shortcuts import render
from rest_framework import generics
from .serializers import AccountSerializer
from .models import Account
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# Account List and Create View
class AccountListCreateView(generics.ListCreateAPIView):
    # queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    # filters query set so only certain accounts associate with a user can be displayed, except a admin(superuser)
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Account.objects.all()
        return Account.objects.filter(user=self.request.user)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Account Retrieve, Update, and Delete View
class AccountRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get(self):
        instance = self.get_object()
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
