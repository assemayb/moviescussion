# Generated by Django 3.0.6 on 2020-06-03 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0004_remove_vote_all_values'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='poster',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]