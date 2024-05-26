from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import *
from .serializers import *

# Chef List and Create View
class ChefList(generics.ListCreateAPIView):
    queryset = Chef.objects.all()
    serializer_class = ChefSerializer

# Chef Detail View
class ChefDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chef.objects.all()
    serializer_class = ChefSerializer

# Chef Login View
@csrf_exempt
def chef_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            chef_data = Chef.objects.get(email=email, password=password)
        except Chef.DoesNotExist:
            chef_data = None

        if chef_data:
            return JsonResponse({'bool': True, 'chef_id': chef_data.id})
        else:
            return JsonResponse({'bool': False})
        

# Recipe List and Create View
class RecipeList(generics.ListCreateAPIView):
    queryset = ChefRecipe.objects.all()
    serializer_class = RecipeSerializer

# Chef Recipe List View
class ChefRecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        chef_id = self.kwargs['chef_id']
        chef = Chef.objects.get(pk=chef_id)
        return ChefRecipe.objects.filter(chef=chef)

# Recipe Detail, Update, and Delete View
class RecipeEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChefRecipe.objects.all()
    serializer_class = RecipeSerializer

# User List and Create View
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# User Login View
@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user_data = User.objects.get(email=email, password=password)
        except User.DoesNotExist:
            user_data = None

        if user_data:
            return JsonResponse({'bool': True, 'user_id': user_data.id})
        else:
            return JsonResponse({'bool': False})
        
# User Recipe List and Create View
class URecipeList(generics.ListCreateAPIView):
    queryset = UserRecipe.objects.all()
    serializer_class = URecipeSerializer

# User Recipe List View
class UserRecipeList(generics.ListAPIView):
    serializer_class = URecipeSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(pk=user_id)
        return UserRecipe.objects.filter(user=user)
    
# User Recipe Detail, Update, and Delete View
class URecipeEdit(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserRecipe.objects.all()
    serializer_class = URecipeSerializer

# User Detail View
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#Chef Change Password
@csrf_exempt
def chef_change_password(request, chef_id):
        password = request.POST['password']

        try:
            chef_data = Chef.objects.get(id=chef_id)
        except Chef.DoesNotExist:
            chef_data = None

        if chef_data:
            Chef.objects.filter(id=chef_id).update(password=password)
            return JsonResponse({'bool': True})
        else:
            return JsonResponse({'bool': False})
        
#User Change Password
@csrf_exempt
def user_change_password(request, user_id):
        password = request.POST['password']

        try:
            user_data = User.objects.get(id=user_id)
        except User.DoesNotExist:
            user_data = None

        if user_data:
            User.objects.filter(id=user_id).update(password=password)
            return JsonResponse({'bool': True})
        else:
            return JsonResponse({'bool': False})

# User Chef Favorite Recipe
class UserChefFavoriteRecipeList(generics.ListCreateAPIView):
    queryset = UserChefFavoriteRecipe.objects.all()
    serializer_class = UserChefFavoriteRecipeSerializer

    def get_queryset(self):
        if 'user_id' in self.kwargs:
            user_id=self.kwargs['user_id']
            user = User.objects.get(pk=user_id)
            return UserChefFavoriteRecipe.objects.filter(user=user).distinct()

def fetch_cheffavorite_status(request,user_id,recipe_id):
    user=User.objects.filter(id=user_id).first()
    recipe=ChefRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=UserChefFavoriteRecipe.objects.filter(recipe=recipe,user=user).first()
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
def remove_cheffavorite_recipe(request,recipe_id,user_id):
    user=User.objects.filter(id=user_id).first()
    recipe=ChefRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=UserChefFavoriteRecipe.objects.filter(recipe=recipe,user=user).delete()
    if favoriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
# User Favorite Recipe
class UserFavoriteRecipeList(generics.ListCreateAPIView):
    queryset = UserFavoriteRecipeAdd.objects.all()
    serializer_class = UserFavoriteRecipeSerializer

    
    def get_queryset(self):
        if 'user_id' in self.kwargs:
            user_id=self.kwargs['user_id']
            user = User.objects.get(pk=user_id)
            return UserFavoriteRecipeAdd.objects.filter(user=user).distinct()

def fetch_favorite_status(request,user_id,recipe_id):
    user=User.objects.filter(id=user_id).first()
    recipe=UserRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=UserFavoriteRecipeAdd.objects.filter(recipe=recipe,user=user).first()
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
def remove_favorite_recipe(request,recipe_id,user_id):
    user=User.objects.filter(id=user_id).first()
    recipe=UserRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=UserFavoriteRecipeAdd.objects.filter(recipe=recipe,user=user).delete()
    if favoriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    

# User Chef Recipe Detail View
class RecipeDetailView(generics.RetrieveAPIView):
    queryset = ChefRecipe.objects.all()
    serializer_class = RecipeSerializer

# User Recipe Detail View
class URecipeDetailView(generics.RetrieveAPIView):
    queryset = UserRecipe.objects.all()
    serializer_class = URecipeSerializer

#Chef Favorite Recipe
class ChefFavoriteRecipeList(generics.ListCreateAPIView):
    queryset = ChefFavoriteRecipeAdd.objects.all()
    serializer_class = ChefFavoriteRecipeSerializer

    def get_queryset(self):
        if 'chef_id' in self.kwargs:
            chef_id=self.kwargs['chef_id']
            chef = Chef.objects.get(pk=chef_id)
            return ChefFavoriteRecipeAdd.objects.filter(chef=chef).distinct()

def fetchche_cheffavorite_status(request,chef_id,recipe_id):
    chef=Chef.objects.filter(id=chef_id).first()
    recipe=ChefRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=ChefFavoriteRecipeAdd.objects.filter(recipe=recipe,chef=chef).first()
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
def removechef_cheffavorite_recipe(request,recipe_id,chef_id):
    chef=Chef.objects.filter(id=chef_id).first()
    recipe=ChefRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=ChefFavoriteRecipeAdd.objects.filter(recipe=recipe,chef=chef).delete()
    if favoriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
# Chef User Favorite Recipe
class ChefUserFavoriteRecipeList(generics.ListCreateAPIView):
    queryset = ChefUserFavoriteRecipe.objects.all()
    serializer_class = ChefUserFavoriteRecipeSerializer

    
    def get_queryset(self):
        if 'chef_id' in self.kwargs:
            chef_id=self.kwargs['chef_id']
            chef = Chef.objects.get(pk=chef_id)
            return ChefUserFavoriteRecipe.objects.filter(chef=chef).distinct()

def fetchche_userfavorite_status(request,chef_id,recipe_id):
    chef=Chef.objects.filter(id=chef_id).first()
    recipe=UserRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=ChefUserFavoriteRecipe.objects.filter(recipe=recipe,chef=chef).first()
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
def removechef_userfavorite_recipe(request,recipe_id,chef_id):
    chef=Chef.objects.filter(id=chef_id).first()
    recipe=UserRecipe.objects.filter(id=recipe_id).first()
    favoriteStatus=ChefUserFavoriteRecipe.objects.filter(recipe=recipe,chef=chef).delete()
    if favoriteStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})