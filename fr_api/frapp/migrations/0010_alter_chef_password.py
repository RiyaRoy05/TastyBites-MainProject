# Generated by Django 5.0.4 on 2024-04-27 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0009_chef_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chef',
            name='password',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
