# Generated by Django 3.0.6 on 2020-06-02 14:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0003_vote_all_values'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vote',
            name='all_values',
        ),
    ]
