// This file is created for handling anything axios-related


const localhost = 'http://localhost:8000'
const apiURL = '/api'

export const endpoint = `${localhost}${apiURL}`;
export const graphqlEndpoint = `http://127.0.0.1:8000/graphql/`;
export const movieListURL = `${endpoint}/movies`
export const addNewMovide = `${endpoint}/add_new_movie`
export const movieDetailURL = id => `${movieListURL}/${id}`
export const movieVoteURL =  `${endpoint}/add_movie_votes`
export const movieSearch =  `${endpoint}/movie_search`
export const movieAddComment = `${endpoint}/create_comment`
