from rest_framework import serializers
from . import models

class ChefSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chef
        fields = ['id', 'full_name', 'email', 'password', 'qualification', 'work_experiences', 'mobile_no', 'profile_image', 'address']

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChefRecipe
        fields = ['id', 'chef', 'recipe_name', 'featured_img', 'recipe_description','ingredients']
    def __init__(self, *args, **kwargs): 
        super(RecipeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'full_name', 'email', 'password', 'mobile_no', 'address']

class URecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserRecipe
        fields = ['id', 'user', 'recipe_name', 'featured_img', 'recipe_description','ingredients']
    def __init__(self, *args, **kwargs): 
        super(URecipeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
 
class UserChefFavoriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserChefFavoriteRecipe
        fields = ['id', 'recipe', 'user', 'status']

    def __init__(self, *args, **kwargs):
        super(UserChefFavoriteRecipeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class UserFavoriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserFavoriteRecipeAdd
        fields = ['id', 'recipe', 'user', 'status']

    def __init__(self, *args, **kwargs):
        super(UserFavoriteRecipeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class ChefFavoriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChefFavoriteRecipeAdd
        fields = ['id', 'recipe', 'chef', 'status']

    def __init__(self, *args, **kwargs):
        super(ChefFavoriteRecipeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class ChefUserFavoriteRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChefUserFavoriteRecipe
        fields = ['id', 'recipe', 'chef', 'status']

    def __init__(self, *args, **kwargs):
        super(ChefUserFavoriteRecipeSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
