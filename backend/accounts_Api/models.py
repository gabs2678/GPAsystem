from django.db import models
from users.models import AppUser
from rest_framework import serializers
from django.core.exceptions import ValidationError
import re
def validate_account_number(value):
    #Checks the format of the account "0000-0000-0000-0000" and it should only have numbers
    if not re.match(r'^\d{4}-\d{4}-\d{4}-\d{4}$', value):
        raise ValidationError("The account number must be a 16 digit number formatted as '0000-0000-0000-0000'")



class Account(models.Model):
    #id = models.AutoField(primary_key=True) #dont really now why the ID is needed here 
    accound_id = models.AutoField(primary_key=True)
    account_number = models.CharField(
        max_length=19,
        validators=[validate_account_number],
        unique=True
    )
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    #related name for reverse relation, Account to AppUser
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="user_id_account")

    #returns readable representacion of the object when converted to string. 
    def __str__(self):
        return self.account_number