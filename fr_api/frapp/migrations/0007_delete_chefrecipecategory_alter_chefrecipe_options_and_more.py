# Generated by Django 5.0.4 on 2024-04-20 10:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0006_remove_chefrecipe_category'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ChefRecipeCategory',
        ),
        migrations.AlterModelOptions(
            name='chefrecipe',
            options={'verbose_name_plural': '2. Chef Recipe'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name_plural': '3. User'},
        ),
    ]
