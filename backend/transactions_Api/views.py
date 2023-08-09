from datetime import datetime, timedelta
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from transactions_Api.serializers import TransactionSerializer
from transactions_Api.models import Transaction
from rest_framework.views import APIView
from django.db import models

class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    # filters query set so only transactions associate with a user can be displayed, except a admin(superuser)
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Transaction.objects.all()
        return Transaction.objects.filter(account__user=self.request.user)


    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # If the user is an admin and provided a date, set it
            if self.request.user.is_superuser and 'date' in request.data:
                transaction = serializer.save(date=request.data['date'])
            else:
                transaction = serializer.save()

            return Response(TransactionSerializer(transaction).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionRetrieve(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    def get(self):
        instance = self.get_object()
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

class TransactionRetrieveByDate(generics.RetrieveUpdateDestroyAPIView):
    def get(self, request, *args, **kwargs):
        account_id = kwargs.get('account')
        date_str = kwargs.get('date')

        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        #the timedelta is done because the date_obj is formatted to be Year-month-day 00:00:00
        date_obj += timedelta(days=1)
        transactions = Transaction.objects.filter(account=account_id, date__lte=date_obj)


        balance = 0  # Initialize the balance with an appropriate initial value
        print(date_obj)

        for transaction in transactions:
            if transaction.transaction_type == 'CREDIT':
                balance += transaction.amount  # Add the amount for CREDIT
            elif transaction.transaction_type == 'DEBIT':
                balance -= transaction.amount  # Subtract the amount for DEBIT

        print(transactions.values('date'))


        return JsonResponse({'balance': balance}, status=200)

