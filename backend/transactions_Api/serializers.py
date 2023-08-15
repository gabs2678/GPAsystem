
from django.forms import ValidationError
from rest_framework import serializers
from transactions_Api.models import Transaction
from accounts_Api.models import Account  # Importing the Account model


class TransactionSerializer(serializers.ModelSerializer):
    account_number = serializers.SerializerMethodField()
    account = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())

    class Meta:
        model = Transaction
        fields = ['transaction_id', 'date', 'transaction_type', 'note', 'amount', 'account_number', 'account'] 
    # returns the account number instead of the foreign key
    def get_account_number(self, obj):
        return obj.account.account_number


