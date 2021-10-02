from stonkapi.serializers import (ItemPriceGetSerializer, ItemPricePostSerializer, ItemBankSerializer, ItemGetSerializer, ItemPostSerializer,
                                    ReportSerializer, TransactionGetSerializer, TransactionPostSerializer, CustomUserSerializer, TradeGetSerializer, TradePostSerializer)
from stonkapi.models import ItemBank, Item, ItemPrice, Report, Transaction, Trade
from rest_framework import serializers, viewsets
from rest_framework import permissions, authentication
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import action

from users.models import CustomUser


# ViewSets

class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]


class ItemBankViewSet(viewsets.ModelViewSet):
    queryset = ItemBank.objects.all()
    serializer_class = ItemBankSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemGetSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

    def get_serializer_class(self):
        if self.action == 'create':
            return ItemPostSerializer
        return ItemGetSerializer


class ItemPriceViewSet(viewsets.ModelViewSet):
    queryset = ItemPrice.objects.all()
    serializer_class = ItemPriceGetSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

    def get_serializer_class(self):
        if self.action == 'create':
            return ItemPricePostSerializer
        return ItemPriceGetSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionGetSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

    def get_serializer_class(self):
        if (self.action == 'create'):
            return TransactionPostSerializer
        return TransactionGetSerializer


class TradeViewSet(viewsets.ModelViewSet):
    queryset = Trade.objects.all()
    serializer_class = TradeGetSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return TradePostSerializer
        return TradeGetSerializer

    @action(methods=['GET'], detail=False)
    def get_unrealized_trades(self, request, pk=None):
        user = request.user
        
        unrealized_trades = Trade.objects.filter(user=user.id, sellTransaction__isnull=True, sellOrderPrice__isnull=False)

        serializer = self.get_serializer(unrealized_trades, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False)
    def get_holding_assets(self, request, pk=None):
        user = request.user

        holding_assets = Trade.objects.filter(user=user.id, sellTransaction__isnull=True, sellOrderPrice__isnull=True)

        serializer = self.get_serializer(holding_assets, many=True)
        return Response(serializer.data)

# Views
