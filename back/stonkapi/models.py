from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class ItemBank(models.Model):
    name = models.CharField(max_length=64)

class ItemPrice(models.Model):
    itemId = models.ForeignKey(ItemBank, on_delete=models.CASCADE)
    price = models.IntegerField()
    time = models.DateTimeField()

class Report(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    itemPriceId = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)

class Transaction(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    itemPriceId = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)