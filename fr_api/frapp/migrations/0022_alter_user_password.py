# Generated by Django 5.0.4 on 2024-05-02 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frapp', '0021_userrecipe'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
