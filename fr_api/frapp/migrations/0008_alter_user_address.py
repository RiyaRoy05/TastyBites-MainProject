# Generated by Django 5.0.4 on 2024-04-24 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0007_delete_chefrecipecategory_alter_chefrecipe_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='address',
            field=models.TextField(),
        ),
    ]
