from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.loginView, name='login'),
    path('<int:postId>',  views.postDetail, name='postDetail'),
    path('bids/<int:postId>', views.postBids, name='postBids'),
    path('bids/add-bid', views.addBid, name='addBid'),
    path('addPost', views.addPost, name='addPost'),
]
