from stonkapi.models import *
from stonkapi.serializers import *
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

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class ServerViewSet(viewsets.ModelViewSet):
    queryset = Server.objects.all()
    serializer_class = ServerSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class MarketplaceViewSet(viewsets.ModelViewSet):
    queryset = Marketplace.objects.all()
    serializer_class = MarketplaceSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class GoodBlueprintViewSet(viewsets.ModelViewSet):
    queryset = GoodBlueprint.objects.all()
    serializer_class = GoodBlueprintSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class GoodViewSet(viewsets.ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class GoodValueTimeViewSet(viewsets.ModelViewSet):
    queryset = GoodValueTime.objects.all()
    serializer_class = GoodValueTimeSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class GoodMovementsViewSet(viewsets.ModelViewSet):
    queryset = GoodMovement.objects.all()
    serializer_class = GoodMovementSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

class SellOrderViewSet(viewsets.ModelViewSet):
    queryset = SellOrder.objects.all()
    serializer_class = SellOrderSerializer
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

# class HdvBankViewSet(viewsets.ModelViewSet):
#     queryset = HdvBank.objects.all()
#     serializer_class = HdvBankSerializer
#     permissions_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]


# class ItemBankViewSet(viewsets.ModelViewSet):
#     queryset = ItemBank.objects.all()
#     serializer_class = ItemBankGetSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

#     def get_serializer_class(self):
#         if self.action == 'create':
#             return ItemBankPostSerializer
#         return ItemBankGetSerializer

#     @action(methods=['GET'], detail=True)
#     def get_reports(self, request, pk=None):
#         user = request.user

#         reports = Report.objects.filter(user=user.id, itemPrice__item__itemBank__id=pk)

#         serializer = ReportGetSerializer(reports, many=True)
#         return Response(serializer.data)

# class ItemViewSet(viewsets.ModelViewSet):
#     queryset = Item.objects.all()
#     serializer_class = ItemGetSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

#     def get_serializer_class(self):
#         if self.action == 'create':
#             return ItemPostSerializer
#         return ItemGetSerializer


# class ItemPriceViewSet(viewsets.ModelViewSet):
#     queryset = ItemPrice.objects.all()
#     serializer_class = ItemPriceGetSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

#     def get_serializer_class(self):
#         if self.action == 'create':
#             return ItemPricePostSerializer
#         return ItemPriceGetSerializer


# class ReportViewSet(viewsets.ModelViewSet):
#     queryset = Report.objects.all()
#     serializer_class = ReportGetSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

#     def get_serializer_class(self):
#         if self.action == 'create':
#             return ReportPostSerializer
#         return ReportGetSerializer


# class TransactionViewSet(viewsets.ModelViewSet):
#     queryset = Transaction.objects.all()
#     serializer_class = TransactionGetSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

#     def get_serializer_class(self):
#         if (self.action == 'create'):
#             return TransactionPostSerializer
#         return TransactionGetSerializer


# class TradeViewSet(viewsets.ModelViewSet):
#     queryset = Trade.objects.all()
#     serializer_class = TradeGetSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]

#     def get_serializer_class(self):
#         if self.action == 'create' or self.action == 'update':
#             return TradePostSerializer
#         return TradeGetSerializer

#     @action(methods=['GET'], detail=False)
#     def get_realized_trades(self, request, pk=None):
#         user = request.user

#         unrealized_trades = Trade.objects.filter(user=user.id, sellTransaction__isnull=False)

#         serializer = self.get_serializer(unrealized_trades, many=True)
#         return Response(serializer.data)

#     @action(methods=['GET'], detail=False)
#     def get_unrealized_trades(self, request, pk=None):
#         user = request.user
        
#         unrealized_trades = Trade.objects.filter(user=user.id, sellTransaction__isnull=True, sellOrderPrice__isnull=False)

#         serializer = self.get_serializer(unrealized_trades, many=True)
#         return Response(serializer.data)

#     @action(methods=['GET'], detail=False)
#     def get_holding_assets(self, request, pk=None):
#         user = request.user

#         holding_assets = Trade.objects.filter(user=user.id, sellTransaction__isnull=True, sellOrderPrice__isnull=True)

#         serializer = self.get_serializer(holding_assets, many=True)
#         return Response(serializer.data)
