# Generated by Django 5.0.4 on 2024-04-07 07:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chef',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('qualification', models.CharField(max_length=200)),
                ('work_experiences', models.CharField(max_length=200)),
                ('mobile_no', models.CharField(max_length=20)),
                ('address', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='ChefRecipeCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipe_name', models.CharField(max_length=150)),
                ('recipe_description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('mobile_no', models.CharField(max_length=20)),
                ('address', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='ChefRecipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipe_name', models.CharField(max_length=150)),
                ('recipe_description', models.TextField()),
                ('dish_type', models.TextField()),
                ('chef', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frapp.chef')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frapp.chefrecipecategory')),
            ],
        ),
    ]
