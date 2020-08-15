from django.db import models, transaction
from django.shortcuts import reverse
from django.db.models import IntegerField, Model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings

class Movie(models.Model):
    title = models.CharField(max_length=100)
    director = models.CharField(max_length=50)
    poster = models.ImageField(null=True, blank=True)
    production_year = models.IntegerField()
    description = models.TextField(blank=True)

    def __str__(self):
        return "{}- {}".format(self.pk, self.title)

    def get_absolute_url(self):
        return reverse('films:rate', kwargs={
            'pk': self.pk
        })


class Vote(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    value = models.IntegerField(validators=[
        MaxValueValidator(5),
        MinValueValidator(1)
    ])

    def __str__(self):
        return "{} has {} ".format(self.movie.title, self.value)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True)
    text = models.TextField(max_length=200)

    def __str__(self):
        return "({}):  {}".format(self.movie, self.text)