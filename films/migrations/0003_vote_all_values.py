# Generated by Django 3.0.6 on 2020-06-02 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0002_auto_20200602_1543'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='all_values',
            field=models.IntegerField(default=0),
        ),
    ]
