# Generated by Django 5.0.4 on 2024-05-05 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0023_chefrecipe_ingredients'),
    ]

    operations = [
        migrations.AddField(
            model_name='userrecipe',
            name='ingredients',
            field=models.TextField(null=True),
        ),
    ]
