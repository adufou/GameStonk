# from django.contrib.auth.models import User
from users.models import CustomUser
from django.db import models

# Create your models here.

class ItemBank(models.Model):
    name = models.CharField(max_length=64, unique=True)

class Item(models.Model):
    itemBankId = models.ForeignKey(ItemBank, on_delete=models.CASCADE)

class ItemPrice(models.Model):
    itemId = models.ForeignKey(Item, on_delete=models.CASCADE)
    price = models.IntegerField()
    time = models.DateTimeField()

class Report(models.Model):
    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    itemPriceId = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)

class Transaction(models.Model):
    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    itemPriceId = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)
    volume = models.SmallIntegerField(default=1)

class Trade(models.Model):
    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    buyTransactionId = models.ForeignKey(Transaction, related_name='buy_transaction', on_delete=models.CASCADE, null=True, blank=True)
    sellTransactionId = models.ForeignKey(Transaction, related_name='sell_transaction', on_delete=models.CASCADE, null=True, blank=True)