#!/bin/bash

# Clear existing data
python manage.py flush --noinput

# Create users, accounts, and transactions
python manage.py shell <<EOF

from users.models import AppUser
from accounts_Api.models import Account
from transactions_Api.models import Transaction
from django.utils import timezone
import random

# Create 3 users
for i in range(3):
    email = f"user{i}@example.com"
    password = "password123"
    username = f"user{i}"
    user = AppUser.objects.create_user(email=email, password=password, username=username)

    # For each user, create 3 accounts
    for j in range(3):
        account_number = f"{random.randint(1000, 9999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}-{random.randint(1000, 9999)}"
        account = Account.objects.create(account_number=account_number, user=user)

        # For each account, create 10 transactions
        for k in range(10):
            transaction_type = random.choice(['CREDIT', 'DEBIT'])
            amount = random.uniform(1, 1000)  # Using uniform for decimal values
            note = f"Sample transaction {k} for account {j} of user {i}"
            Transaction.objects.create(
                transaction_type=transaction_type,
                note=note,
                amount=amount,
                account=account
            )

EOF

echo "Database populated successfully!"

