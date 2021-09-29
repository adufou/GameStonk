from stonkapi.serializers import ItemPriceSerializer, ItemBankSerializer, ItemSerializer, ReportSerializer, TransactionSerializer, GroupSerializer, UserSerializer
from stonkapi.models import ItemBank, Item, ItemPrice, Report, Transaction
from rest_framework import viewsets
from rest_framework import permissions, authentication
from django.shortcuts import render
# from django.contrib.auth.models import User, Group


# ViewSets

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication]

# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication]

class ItemBankViewSet(viewsets.ModelViewSet):
    queryset = ItemBank.objects.all()
    serializer_class = ItemBankSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]

class ItemPriceViewSet(viewsets.ModelViewSet):
    queryset = ItemPrice.objects.all()
    serializer_class = ItemPriceSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]


# Views

