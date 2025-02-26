# Generated by Django 5.0.4 on 2024-04-17 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0004_rename_skills_chef_address'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chefrecipe',
            name='dish_type',
        ),
        migrations.AddField(
            model_name='chefrecipe',
            name='featured_img',
            field=models.ImageField(null=True, upload_to='recipe_imgs/'),
        ),
        migrations.AlterField(
            model_name='chefrecipe',
            name='recipe_description',
            field=models.TextField(null=True),
        ),
    ]
