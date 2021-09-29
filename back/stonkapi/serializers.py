from django.contrib.auth.models import User, Group
from stonkapi.models import ItemBank, ItemPrice, Report, Transaction
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ItemBank
        fields = ['id', 'name']

class ItemPriceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ItemPrice
        fields = ['id', 'itemId', 'price', 'time']

class ReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'userId', 'itemPriceId']

class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'userId', 'itemPriceId']