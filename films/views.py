from django.shortcuts import render, redirect
from django.db.models import Q
from django.views.generic import ListView
from django.shortcuts import get_object_or_404
from .models import Movie, Vote
from .forms import (
    MovieModelForm, MovieVoteValueForm, MovieModelForm2
)


def homeView(request):
    movies = Movie.objects.all()
    vote = Vote.objects.all()
    if request.method == "POST":
        form = MovieModelForm(request.POST)
        if form.is_valid():
            form.save()
    else:
        form = MovieModelForm()
    context = {
        'movies': movies,
        'form': form,
    }
    return render(request, "home.html", context)

def searchView(request):
    queryset = Movie.objects.all()
    query = request.POST.get('q')
    context = {}
    if query and len(query) > 1:
        queryset = queryset.filter(
            Q(title__icontains=query)
        ).distinct()
        context['queryset'] = queryset
    return render(request, 'search_results.html', context)

def moviesView(request):
    movies = Movie.objects.all()
    context = {
        'movies': movies
    }
    return render(request, 'movies.html', context)



def movieRate(request, pk):
    movie = Movie.objects.get(pk=pk)
    movies_with_same_director = Movie.objects.filter(director=movie.director).exclude(title=movie.title)
    if request.method == "POST":
        vote_value = request.POST['customRadioInline']
        new_vote = Vote.objects.create(movie=movie, value=vote_value)
        new_vote.save()
        movie.save()
    context = {
        'movie': movie,
        'similar': movies_with_same_director,
    }
    movie_votes = Vote.objects.filter(movie=movie) 
    if movie_votes.exists():
        movies_counts = movie_votes.count() * 5
        movie_votes_values = 0
        for x in range(len(movie_votes)):
            movie_votes_values += movie_votes[x].value
        votes = round(movie_votes_values/movies_counts * 5, 2)
        context['votes'] = votes
    
    return render(request, 'rate.html', context)
