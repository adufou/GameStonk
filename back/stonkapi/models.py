# from django.contrib.auth.models import User
from users.models import CustomUser
from django.db import models

# Create your models here.

class ItemBank(models.Model):
    name = models.CharField(max_length=64, unique=True)

class Item(models.Model):
    itemBank = models.ForeignKey(ItemBank, on_delete=models.CASCADE)

class ItemPrice(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    price = models.IntegerField()
    time = models.DateTimeField()

class Report(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    itemPrice = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)
    volume = models.SmallIntegerField(default=1)

class Transaction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    itemPrice = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)
    volume = models.SmallIntegerField(default=1)

class Trade(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    buyTransaction = models.ForeignKey(Transaction, related_name='buy_transaction', on_delete=models.CASCADE, null=True, blank=True)
    sellTransaction = models.ForeignKey(Transaction, related_name='sell_transaction', on_delete=models.CASCADE, null=True, blank=True)
    sellOrderPrice = models.IntegerField(blank=True, null=True)
