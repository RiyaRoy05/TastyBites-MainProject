# Generated by Django 5.0.4 on 2024-05-01 11:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0015_alter_userrecipe_options'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserRecipe',
            new_name='UsrRecipe',
        ),
    ]
