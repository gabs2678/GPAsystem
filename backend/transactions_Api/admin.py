from django.contrib import admin
from transactions_Api.models import Transaction # Register your models here.

#for admin control

# from accounts_Api.models import Account  # Make sure you import the Account model

# # Define an inline admin panel for Account
# class Account(admin.StackedInline):
#     model = Account
#     readonly_fields = ['user']
#     can_delete = False
#     max_num = 0  # Ensures no new Accounts can be added from Transaction panel

# class TransactionAdmin(admin.ModelAdmin):
#     inlines = [AccountInline]  # Include the inline representation
#     fields = ('date', 'transaction_type', 'note', 'amount', 'account')
#     list_display = ('transaction_type', 'amount', 'get_account', 'get_user')
#     search_fields = ('transaction_type', 'account__account_number', 'account__user__email')

#     def get_account(self, obj):
#         return obj.account.account_number
#     get_account.short_description = 'Account Number'

#     def get_user(self, obj):
#         return obj.account.user.email
#     get_user.short_description = 'User Email'

#     def get_queryset(self, request):
#         return super().get_queryset(request).select_related('account__user')

admin.site.register(Transaction)