from re import S
from django.contrib.auth.models import User, Group
from rest_framework.fields import IntegerField
from stonkapi.models import *
from rest_framework import serializers

from users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'url', 'username', 'email']

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = ['id', 'name', 'game']

class GameSerializer(serializers.ModelSerializer):
    servers = ServerSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'name', 'servers']

class UserServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserServer
        fields = ['id', 'user', 'server']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']

class UserTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTeam
        fields = ['id', 'user', 'team']

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = ['id', 'marketplace', 'user']

class MarketplaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marketplace
        fields = ['id', 'name', 'server']

class GoodBlueprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodBlueprint
        fields = ['id', 'game', 'name']

class GoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Good
        fields = ['id', 'blueprint', 'marketplace']

class GoodValueTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodValueTime
        fields = ['id', 'good', 'value', 'time']

class GoodMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodMovement
        fields = ['id', 'good', 'wallet', 'quantity', 'value']

class SellOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellOrder
        fields = ['id', 'marketplace', 'value']

# class HdvBankSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = HdvBank
#         fields = ['id', 'name']


# # Serializer for ItemBank GET -> hdv Nested
# class ItemBankGetSerializer(serializers.ModelSerializer):
#     hdv = HdvBankSerializer(read_only=True)

#     class Meta:
#         model = ItemBank
#         fields = ['id', 'name', 'hdv']


# # Serializer for ItemBank POST -> hdv is an int
# class ItemBankPostSerializer(serializers.ModelSerializer):
#     # itemBank = serializers.PrimaryKeyRelatedField(queryset=HdvBank.objects.all())

#     class Meta:
#         model = ItemBank
#         fields = ['id', 'name', 'hdv']


# # Serializer for Item GET -> itemBank Nested 
# class ItemGetSerializer(serializers.ModelSerializer):
#     itemBank = ItemBankGetSerializer(read_only=True)

#     class Meta:
#         model = Item
#         fields = ['id', 'itemBank']


# # Serializer for Item POST -> itemBank is an int 
# class ItemPostSerializer(serializers.ModelSerializer):
#     itemBank = serializers.PrimaryKeyRelatedField(queryset=ItemBank.objects.all())

#     class Meta:
#         model = Item
#         fields = ['id', 'itemBank']


# # Serializer for ItemPrice GET -> item Nested
# class ItemPriceGetSerializer(serializers.ModelSerializer):
#     item = ItemGetSerializer(read_only=True)

#     class Meta:
#         model = ItemPrice
#         fields = ['id', 'item', 'price', 'time']


# # Serializer for ItemPrice POST -> item is an int 
# class ItemPricePostSerializer(serializers.ModelSerializer):
#     item = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all())

#     class Meta:
#         model = ItemPrice
#         fields = ['id', 'item', 'price', 'time']
        
# # Serializer for Report GET -> itemPrice Nested
# class ReportGetSerializer(serializers.ModelSerializer):
#     itemPrice = ItemPriceGetSerializer(read_only=True)

#     class Meta:
#         model = Report
#         fields = ['id', 'user', 'itemPrice', 'volume']


# # Serializer for ItemPrice POST -> itemPrice is an int
# class ReportPostSerializer(serializers.ModelSerializer):
#     itemPrice = serializers.PrimaryKeyRelatedField(queryset=ItemPrice.objects.all())

#     class Meta:
#         model = Report
#         fields = ['id', 'user', 'itemPrice', 'volume']

# # Serializer for Transaction GET -> itemPrice Nested
# class TransactionGetSerializer(serializers.ModelSerializer):
#     itemPrice = ItemPriceGetSerializer(read_only=True)

#     class Meta:
#         model = Transaction
#         fields = ['id', 'user', 'itemPrice', 'volume']


# # Serializer for Transaction POST -> itemPrice is an int 
# class TransactionPostSerializer(serializers.ModelSerializer):
#     itemPrice = serializers.PrimaryKeyRelatedField(queryset=ItemPrice.objects.all())

#     class Meta:
#         model = Transaction
#         fields = ['id', 'user', 'itemPrice', 'volume']

#     def create(self, validated_data):
#         print(validated_data)
#         transaction = Transaction.objects.create(**validated_data)
#         Report.objects.create(**validated_data)
#         return transaction


# # Serializer for Trade GET -> buyTransaction and sellTransaction Nested
# class TradeGetSerializer(serializers.ModelSerializer):
#     buyTransaction = TransactionGetSerializer(read_only=True)
#     sellTransaction = TransactionGetSerializer(read_only=True, required=False, allow_null=True)

#     class Meta:
#         model = Trade
#         fields = ['id', 'user', 'buyTransaction', 'sellTransaction', 'sellOrderPrice']


# # Serializer for Trade POST -> buyTransaction and sellTransaction are int 
# class TradePostSerializer(serializers.ModelSerializer):
#     buyTransaction = serializers.PrimaryKeyRelatedField(queryset=Transaction.objects.all())
#     sellTransaction = serializers.PrimaryKeyRelatedField(queryset=Transaction.objects.all(), required=False, allow_null=True)

#     class Meta:
#         model = Trade
#         fields = ['id', 'user', 'buyTransaction', 'sellTransaction', 'sellOrderPrice']

#     def update(self, instance, data):
#         instance.user = data['user']
#         instance.buyTransaction = data['buyTransaction']
#         instance.sellTransaction = data['sellTransaction']
#         instance.sellOrderPrice = data['sellOrderPrice']
#         instance.save()
#         return instance
