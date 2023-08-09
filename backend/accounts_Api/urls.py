from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.AccountListCreateView.as_view(), name='accounts'), 
    path('transactions/', include('transactions_Api.urls')),
]