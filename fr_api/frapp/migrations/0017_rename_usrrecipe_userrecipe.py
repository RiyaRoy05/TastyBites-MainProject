# Generated by Django 5.0.4 on 2024-05-01 11:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0016_rename_userrecipe_usrrecipe'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UsrRecipe',
            new_name='UserRecipe',
        ),
    ]
