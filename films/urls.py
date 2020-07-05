from django.urls import path
from .views import homeView, moviesView, movieRate, searchView

app_name = 'films'



urlpatterns = [
    path('', homeView, name='home'),
    path('movies', moviesView, name='movies'),
    path('movies/search', searchView, name='search'),
    path('movies/<pk>/rate', movieRate, name='rate')
    
]
