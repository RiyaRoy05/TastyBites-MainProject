from django.db import models

# Chef Model
class Chef(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,blank=True,null=True)
    qualification = models.CharField(max_length=200)
    work_experiences = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=20)
    profile_image = models.ImageField(upload_to='chef_profile_imgs/', null=True)
    address = models.TextField()

    class Meta:
        verbose_name_plural = "1. Chef"

    def __str__(self):
        return self.full_name

# Chef Recipe Model
class ChefRecipe(models.Model):
    chef = models.ForeignKey(Chef, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=150)
    featured_img = models.ImageField(upload_to='recipe_imgs/', null=True)
    recipe_description = models.TextField(null=True)
    ingredients = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "2. Chef Recipe"
    def __str__(self):
        return f"{self.id}-{self.recipe_name}-{self.chef}"

 # User Model
class User(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100,blank=True,null=True)
    mobile_no = models.CharField(max_length=20)
    address = models.TextField()

    class Meta:
        verbose_name_plural = "3. User"

    def __str__(self):
        return self.full_name

#User Chef Favorite Recipe
class UserChefFavoriteRecipe(models.Model):
    recipe=models.ForeignKey(ChefRecipe,on_delete=models.CASCADE)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    status=models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = '4.User Chef Favorite Recipes'

    def __str__(self):
        return f"{self.recipe}-{self.user}"

    
# User Recipe Model
class UserRecipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=150)
    featured_img = models.ImageField(upload_to='recipe_imgs/', null=True)
    recipe_description = models.TextField(null=True)
    ingredients = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "5. User Recipe"

    def __str__(self):
        return f"{self.recipe_name}-{self.user}"
    
#User Favorite Recipe
class UserFavoriteRecipeAdd(models.Model):
    recipe=models.ForeignKey(UserRecipe,on_delete=models.CASCADE, null=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE, null=True)
    status=models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = '6.User Favorite Recipes'

    def __str__(self):
        return f"{self.recipe}-{self.user}"
    
#Chef Favorite Recipe
class ChefFavoriteRecipeAdd(models.Model):
    recipe=models.ForeignKey(ChefRecipe,on_delete=models.CASCADE)
    chef=models.ForeignKey(Chef,on_delete=models.CASCADE)
    status=models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = '7.Chef Favorite Recipes'

    def __str__(self):
        return f"{self.recipe}-{self.chef}"

# Chef User Favorite Recipe
class ChefUserFavoriteRecipe(models.Model):
    recipe=models.ForeignKey(UserRecipe,on_delete=models.CASCADE, null=True)
    chef=models.ForeignKey(Chef,on_delete=models.CASCADE, null=True)
    status=models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = '8. Chef User Favorite Recipes'

    def __str__(self):
        return f"{self.recipe}-{self.chef}"



