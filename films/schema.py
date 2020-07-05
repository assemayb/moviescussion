import graphene
import requests
import json

from datetime import datetime


from graphene_django.types import DjangoObjectType
from .models import Movie, Vote, Comment


class MovieType(DjangoObjectType):
    class Meta:
        model = Movie


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment


class VoteType(DjangoObjectType):
    class Meta:
        model = Vote


def get_data_fromAPI():
    url = "https://api.spacexdata.com/v4/launches/"
    r = requests.get(url=url)
    data = r.json()
    return data

fetched = get_data_fromAPI()



# class Rocket(graphene.ObjectType):
#     rocket_id = graphene.ID()
#     rocket_name = graphene.String()
#     rocket_type = graphene.String()


class Launches(graphene.ObjectType):
    # flight_number = graphene.ID()
    # mission_name = graphene.String()
    # launch_year = graphene.String()
    # launch_success = graphene.String()
    # rocket = graphene.Field(Rocket)
    payloads = graphene.String()


class Query(graphene.ObjectType):
    all_movies = graphene.List(MovieType)
    all_comments = graphene.List(CommentType)
    all_votes = graphene.List(VoteType)
    launches = graphene.List(Launches)

    def resolve_all_movies(self, info, **kwargs, ):
        return Movie.objects.all()

    def resolve_all_comments(self, info, **kwargs):
        return Comment.objects.all()

    def resolve_all_votes(self, info, **kwargs):
        return Vote.objects.all()

    def resolve_launches(self, info, **kwargs):
        return fetched

class MovieUpdate(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        title = graphene.String()

    movie = graphene.Field(MovieType)

    def mutate(self, info, id, title):
        movie = Movie.objects.get(pk=id)
        movie.title = title
        movie.save()
        return MovieUpdate(movie=movie)


class MovieCreate(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        director = graphene.String()
        description = graphene.String()
        year = graphene.Int()

    movie = graphene.Field(MovieType)

    def mutate(self, info, title, director, description, year):
        movie = Movie.objects.create(
            title=title,
            director=director,
            production_year=year,
            description=description
        )
        movie.save()
        return MovieCreate(movie=movie)


class Mutation(graphene.ObjectType):
    movie_update = MovieUpdate.Field()
    movie_create = MovieCreate.Field()
