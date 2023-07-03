# from django.contrib.auth.models import User
from users.models import CustomUser
from django.db import models

# Create your models here.

class Game(models.Model):
    name = models.CharField(max_length=64, unique=True)

class Server(models.Model):
    name = models.CharField(max_length=64, unique=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='servers')

class UserServer(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)

class Team(models.Model):
    name = models.CharField(max_length=64, unique=False)

class UserTeam(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

class Marketplace(models.Model):
    name = models.CharField(max_length=64, unique=True)
    server = models.ForeignKey(Game, on_delete=models.CASCADE)

class Wallet(models.Model):
    marketplace = models.ForeignKey(Marketplace, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

class GoodBlueprint(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    name = models.CharField(max_length=64, unique=True)
    # TODO ADD ALL POSSIBLE FIELDS FOR A GOOD IN MANY GAMES 

class Good(models.Model):
    blueprint = models.ForeignKey(GoodBlueprint, on_delete=models.CASCADE)
    marketplace = models.ForeignKey(Marketplace, on_delete=models.CASCADE)
    # TODO ADD ALL POSSIBLE FIELDS FOR A GOOD IN MANY GAMES 

class GoodValueTime(models.Model):
    good = models.ForeignKey(Good, on_delete=models.CASCADE)
    value = models.IntegerField()
    time = models.DateTimeField()

class GoodMovement(models.Model):
    good = models.ForeignKey(Good, on_delete=models.CASCADE)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    value = models.ForeignKey(GoodValueTime, on_delete=models.CASCADE, blank=True, null=True)

class SellOrder(models.Model):
    marketplace = models.ForeignKey(Marketplace, on_delete=models.CASCADE)
    value = models.ForeignKey(GoodValueTime, on_delete=models.CASCADE)

# class HdvBank(models.Model):
#     name = models.CharField(max_length=64, unique=True)

# class ItemBank(models.Model):
#     name = models.CharField(max_length=64, unique=True)
#     hdv = models.ForeignKey(HdvBank, on_delete=models.CASCADE)

# class Item(models.Model):
#     itemBank = models.ForeignKey(ItemBank, on_delete=models.CASCADE)

# class ItemPrice(models.Model):
#     item = models.ForeignKey(Item, on_delete=models.CASCADE)
#     price = models.IntegerField()
#     time = models.DateTimeField()

# class Report(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     itemPrice = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)
#     volume = models.SmallIntegerField(default=1)

# class Transaction(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     itemPrice = models.ForeignKey(ItemPrice, on_delete=models.CASCADE)
#     volume = models.SmallIntegerField(default=1)

# class Trade(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     buyTransaction = models.ForeignKey(Transaction, related_name='buy_transaction', on_delete=models.CASCADE, null=True, blank=True)
#     sellTransaction = models.ForeignKey(Transaction, related_name='sell_transaction', on_delete=models.CASCADE, null=True, blank=True)
#     sellOrderPrice = models.IntegerField(blank=True, null=True)
