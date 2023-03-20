from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Posts(models.Model):
    username = models.CharField(max_length=64)
    header = models.CharField(max_length=128)
    description = models.CharField(max_length=1000)
    startingPrice = models.DecimalField(max_digits=10, decimal_places=2)
    imageUrl = models.CharField(max_length=200, null=True)
    listingDate = models.DateTimeField(auto_now= True)
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "header": self.header,
            "description": self.description,
            "price": self.startingPrice,
            "imageUrl": self.imageUrl,
            "listingDate": self.listingDate,
        }

class Bids(models.Model):
    username = models.CharField(max_length=64)
    postId = models.IntegerField()
    bidValue = models.IntegerField()
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "postId": self.postId,
            "bidValue": self.bidValue,
        }