# Generated by Django 5.0.4 on 2024-05-07 08:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0024_userrecipe_ingredients'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserFavoriteRecipe',
            new_name='UserChefFavoriteRecipe',
        ),
    ]
