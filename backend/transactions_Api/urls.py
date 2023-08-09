from django.urls import path
from . import views

urlpatterns = [
    path('', views.TransactionListCreateView.as_view(), name='transactions'),
    path('<int:account>/balance/<str:date>/', views.TransactionRetrieveByDate.as_view(), name='get-balance'),
]