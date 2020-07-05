from rest_framework import serializers
from films.models import Movie, Vote, Comment

class MovieVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = [
            'value'
        ]
        
class CommentListSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields= [
            'user',
            'movie',
            'text',
            'username'
        ]
    def get_username(self, obj):
        return obj.user.username



class MoviesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = [
            'id',
            "title",
            "director",
            "poster",
            "production_year",
            "description",
        ]
   


class MovieDetailSerializer(serializers.ModelSerializer):
    vote = serializers.SerializerMethodField()
    class Meta:
        model = Movie
        fields = [
            'id',
            "title",
            "director",
            "poster",
            "production_year",
            "description",
            "vote"
        ]

    def get_vote(self, obj):
        return MovieVoteSerializer(obj.vote_set.all(), many=True).data