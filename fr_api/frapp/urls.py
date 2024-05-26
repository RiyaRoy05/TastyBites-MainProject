from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('chef/', views.ChefList.as_view()),
    path('chef/<int:pk>/', views.ChefDetail.as_view()),
    path('chef/change-password/<int:chef_id>/', views.chef_change_password),
    path('chef-login', views.chef_login),

    path('recipe/', views.RecipeList.as_view()),
    path('recipe/<int:pk>/', views.RecipeDetailView.as_view()),

    path('chef-recipes/<int:chef_id>', views.ChefRecipeList.as_view()),
    path('edit-recipe/<int:pk>/', views.RecipeEdit.as_view()),

    path('user/', views.UserList.as_view()),
    path('user/<int:pk>/', views.UserDetail.as_view()),
    path('user/change-password/<int:user_id>/', views.user_change_password),
    path('user-login', views.user_login),

    path('chef-add-cheffavorite-recipe/', views.ChefFavoriteRecipeList.as_view()),
    path('chef-remove-cheffavorite-recipe/<int:recipe_id>/<int:chef_id>',views.removechef_cheffavorite_recipe),
    path('fetchchef-cheffavorite-status/<int:chef_id>/<int:recipe_id>',views.fetchche_cheffavorite_status),
    path('chef-favorite-recipes/<int:chef_id>', views.ChefFavoriteRecipeList.as_view()),

    path('chef-add-userfavorite-recipe/', views.ChefUserFavoriteRecipeList.as_view()),
    path('chef-remove-userfavorite-recipe/<int:recipe_id>/<int:chef_id>',views.removechef_userfavorite_recipe),
    path('fetchchef-userfavorite-status/<int:chef_id>/<int:recipe_id>',views.fetchche_userfavorite_status),
    path('chef-userfavorite-recipes/<int:chef_id>', views.ChefUserFavoriteRecipeList.as_view()),


    path('user-add-cheffavorite-recipe/', views.UserChefFavoriteRecipeList.as_view()), 
    path('user-remove-cheffavorite-recipe/<int:recipe_id>/<int:user_id>',views.remove_cheffavorite_recipe),
    path('fetch-cheffavorite-status/<int:user_id>/<int:recipe_id>',views.fetch_cheffavorite_status),
    path('user-cheffavorite-recipes/<int:user_id>', views.UserChefFavoriteRecipeList.as_view()),

    
    path('user-add-favorite-recipe/', views.UserFavoriteRecipeList.as_view()), 
    path('user-remove-favorite-recipe/<int:recipe_id>/<int:user_id>',views.remove_favorite_recipe),
    path('fetch-favorite-status/<int:user_id>/<int:recipe_id>',views.fetch_favorite_status),

    path('urecipe/', views.URecipeList.as_view()),
    path('urecipe/<int:pk>/', views.URecipeDetailView.as_view()),

    path('user-recipes/<int:user_id>', views.UserRecipeList.as_view()),
    path('user-favorite-recipes/<int:user_id>', views.UserFavoriteRecipeList.as_view()),
    path('edit-urecipe/<int:pk>/', views.URecipeEdit.as_view()),
]

# Configuring media file serving during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
