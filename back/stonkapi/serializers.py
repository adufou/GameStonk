from django.contrib.auth.models import User, Group
from stonkapi.models import Item, ItemBank, ItemPrice, Report, Transaction, Trade
from rest_framework import serializers

from users.models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['url', 'username', 'email']

# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['url', 'name']

class ItemBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemBank
        fields = ['id', 'name']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'itemBankId']

class ItemPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPrice
        fields = ['id', 'itemId', 'price', 'time']

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'userId', 'itemPriceId']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'userId', 'itemPriceId', 'volume']

class TradeSerializer(serializers.ModelSerializer):
    sellTransactionId = TransactionSerializer(required=False, allow_null=True)

    class Meta:
        model = Trade
        fields = ['id', 'userId', 'buyTransactionId', 'sellTransactionId']