from django.utils import timezone
from django.db import models
from rest_framework import serializers
from accounts_Api.models import Account


class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('CREDIT', 'Credit'),
        ('DEBIT', 'Debit'),
    )   
    transaction_id = models.AutoField(primary_key=True)
    date = models.DateTimeField(default=timezone.now, editable=True)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    note = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.transaction_type == 'CREDIT':
            self.account.current_balance += self.amount
        else:
            self.account.current_balance -= self.amount
        self.account.save()
        super(Transaction, self).save(*args, **kwargs)
    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"

