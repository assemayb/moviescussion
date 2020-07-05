import graphene
from films.schema import Query as movie_query
from films.schema import Mutation as movie_mutation



class Query(movie_query):
    pass

class Mutation(movie_mutation):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation, auto_camelcase=False)
