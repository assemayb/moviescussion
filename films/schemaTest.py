import graphene
import json
import requests

from datetime import datetime




def get_data_fromAPI():
    url = "https://api.spacexdata.com/v4/launches"
    r = requests.get(url=url)
    data = r.json()
    JSON_data = json.dumps(data, indent=3)
    return JSON_data
    # return data

# fetched_data = get_data_fromAPI()
print(get_data_fromAPI())

# class User(graphene.ObjectType):
#     id = graphene.ID()
#     username = graphene.String()
#     last_login = graphene.DateTime(required=False)

# class Rocket(graphene.ObjectType):
#     rocket_id = graphene.ID()
#     rocket_name = graphene.String()
#     rocket_type = graphene.String()


# class Luanches(graphene.ObjectType):
#     flight_number = graphene.ID()
#     mission_name = graphene.String() 
#     launch_year = graphene.String()
#     launch_success = graphene.String()
#     rocket = graphene.ObjectType(Rocket)


# class Query(graphene.ObjectType):
#     launches = graphene.List(launches)
#     def resolve_launches(seld, info):
#         return fetched_data



# class Query(graphene.ObjectType):
#     users = graphene.List(User, first=graphene.Int())

#     def resolve_users(self, info, first):
#         return [
#             User(username="ahmed", last_login=datetime.now()),
#             User(username="ali", last_login=datetime.now()),
#             User(username="alaa", last_login=datetime.now()),
#         ][:first]


"""

class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String()

    user = graphene.Field(User)

    def mutate(self, info, username):
        ah = User(username=username)
        return CreateUser(user=ah)


class Mutations(graphene.ObjectType):
    createUser = CreateUser.Field()
"""

# schema = graphene.Schema(query=Query, mutation=Mutations)
# result = schema.execute(

#     '''
#     mutation createUser {
#         createUser(username: "Bob"){
#             user {
#                 username,
#             }
#         }
#     }

#     '''
#     # variable_values={"username": "Alice"}
# )

# items = dict(result.data.items())
# items = json.dumps(items, indent=3)
# print(items)
