from films.models import Movie, Vote, Comment
from django.db.models import Q
from rest_framework.generics import (ListAPIView, RetrieveAPIView,
                                     CreateAPIView, UpdateAPIView, DestroyAPIView
                                     )
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404, HttpResponse
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from .serializers import MoviesListSerializer, MovieDetailSerializer, CommentListSerializer


class MovieListView(ListAPIView):
    permission_classes = (AllowAny, )
    queryset = Movie.objects.all()
    serializer_class = MoviesListSerializer


class MovieDetailView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = MovieDetailSerializer
    queryset = Movie.objects.all()


class AddNewMovie(APIView):
    def post(self, request, *args, **kwargs):
        submitted_form = request.data.get('formData')
        title = submitted_form['title']
        director = submitted_form['director']
        year = submitted_form['year']
        description = submitted_form['description']
        movie = Movie.objects.create(
            title=title,
            director=director,
            description=description,
            production_year=year
        )
        return Response(status=HTTP_200_OK)


class AddMovieVotes(APIView):
    def post(self, request, *args, **kwargs):
        title = request.data.get('title')
        value = request.data.get('value')
        movie = Movie.objects.get(title=title)
        vote = Vote.objects.create(movie=movie, value=value)
        vote.save()
        return Response(status=HTTP_200_OK)


class MovieSearchView(APIView):
    def post(self,  request, *args, **kwargs):
        queryset = Movie.objects.all()
        query = request.data.get('searchInput')
        arr = []
        if query and len(query) > 1:
            queryset = queryset.filter(
                Q(title__icontains=query)
            ).distinct()
            for i in range(len(queryset)):
                name = queryset[i].title
                id = queryset[i].id
                dic = dict(movie_id=id, movie_title=name)
                arr.append(dic)
        if arr:
            return Response(data=arr, status=HTTP_200_OK)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)


class CommentListView(ListAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = CommentListSerializer

    def get_queryset(self):
        try:
            comments = Comment.objects.all()
            return comments
        except ObjectDoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)


class CommetCreateView(APIView):
    def post(self, request, *args, **kwargs):
        movie_id = self.request.data['movie_id']
        movie_comment = self.request.data['movie_comment']
        comments = Comment.objects.create(
            user=self.request.user,
            text=movie_comment,
            movie_id=movie_id
        )
        comments.save()
        return Response(data='tmam', status=HTTP_200_OK)
