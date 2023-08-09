from rest_framework import serializers
from accounts_Api.models import Account
class AccountSerializer(serializers.ModelSerializer):
    #prevents current balance to be set manually
    current_balance = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = Account
        fields = ['accound_id', 'account_number', 'current_balance','user']
    
    # def create(self, validated_data):
    #     validated_data.pop('current_balance',None)
    #     account = Account.objects.create(**validated_data, current_balance=0)
    #     return account
# class CreateAccountView(generics.CreateAPIView):
#     queryset = Account.objects.all()
#     serializer_class = AccountSerializer