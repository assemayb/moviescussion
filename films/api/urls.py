from django.urls import path
from .views import (MovieListView,
                    MovieDetailView, AddNewMovie, AddMovieVotes,
                    MovieSearchView, CommentListView, CommetCreateView
                    )

app_name = "movies"


urlpatterns = [
    path('movies', MovieListView.as_view(), name="movie-list"),
    path('add_new_movie', AddNewMovie.as_view(), name="add-movie"),
    path('movies/<pk>', MovieDetailView.as_view(), name="movie-detail"),
    path('add_movie_votes', AddMovieVotes.as_view(), name='add-movie-votes'),
    path('movie_search', MovieSearchView.as_view(), name='movie-search'),
    path('get_comment', CommentListView.as_view(), name='get-comment'),
    path('create_comment', CommetCreateView.as_view(), name='create-comment')
]
