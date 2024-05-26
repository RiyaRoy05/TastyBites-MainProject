from django.contrib import admin
from . import models

admin.site.register(models.Chef)
admin.site.register(models.ChefRecipe)
admin.site.register(models.User)
admin.site.register(models.UserRecipe)
admin.site.register(models.UserChefFavoriteRecipe)
admin.site.register(models.UserFavoriteRecipeAdd)
admin.site.register(models.ChefFavoriteRecipeAdd)
admin.site.register(models.ChefUserFavoriteRecipe)