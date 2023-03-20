from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
import json
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from .models import User, Posts, Bids

def index(request):
    posts = Posts.objects.all()
    return JsonResponse([post.serialize() for post in posts], safe=False)

def postDetail(request, postId):
    post = Posts.objects.get(pk=postId)
    return JsonResponse([post.serialize()], safe=False)

def postBids(request, postId):
    bids = Bids.objects.filter(postId=postId).order_by('-bidValue')[:5]
    return JsonResponse([bid.serialize() for bid in bids], safe=False)

@csrf_exempt
def addBid(request):
    if request.method == 'POST':
        requestBody = json.loads(request.body)['bidInputs']
        username = requestBody['username']
        postId = int(requestBody['postId'])
        bidValue = float(requestBody['bidValue'])
        addBid = Bids(username=username, postId=postId, bidValue=bidValue)
        addBid.save()
        return JsonResponse({'status': 'Bid fulfilled!'})

@csrf_exempt
def addPost(request):
    if request.method == 'POST':
        requestBody = json.loads(request.body)['postInputs']
        username = requestBody['username']
        header = requestBody['header']
        description = requestBody['description']
        startingPrice = float(requestBody['startingPrice'])
        imageUrl = requestBody['imageUrl']

        addPost = Posts(username=username, header=header, description=description, startingPrice=startingPrice, imageUrl=imageUrl)
        addPost.save()
        return JsonResponse({'status': 'your request has been fulfilled!'})

@csrf_exempt
def register(request):
    if request.method == 'POST':
        requestJson = json.loads(request.body)['userInputs']

        username = requestJson['username']
        email = requestJson['email']
        password = requestJson['password']
        confirmation = requestJson['confirmPassword']

        # to ensure passwords matches
        if password != confirmation:
            return JsonResponse({
                'status': False,
                'message': 'Passwords must match!'
            })

        # attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({
                'status': False,
                'message': 'Username Has Already Taken!',
            })
        login(request, user)
        return JsonResponse({ 'status': True, 'username': username })

@csrf_exempt
def loginView(request):
    if request.method == "POST":
        # checks user's credential for log in process
        requestJson = json.loads(request.body)['loginInputs']
        username = requestJson['username']
        password = requestJson['password']
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({ 'status': True, 'username': username })
        else:
            return JsonResponse({ 'status': False, 'username': 'unknown' })
    else:
        return JsonResponse({"status": "GET method not allowed!"})

