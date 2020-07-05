import React, { Fragment, useState, useEffect } from "react";
import { Image, Item, Container, Header, Label } from "semantic-ui-react";
import { endpoint, movieListURL } from "../constants";
import { authAxios } from "../utils";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

//  was testing to use graphQL for it but not worth it i guess
// const GET_MOVIES = gql`
//   {
//     all_movies {
//       id
//       title
//       director
//       description
//       production_year
//       poster
//     }
//   }
// `;

function MovieList(props) {
  const [data1, setData] = useState([]);
  const { isAuthenticated } = props;
  useEffect(() => {
    const fetchAPI = () => {
      authAxios
        .get(movieListURL)
        .then((res) => {
          setData(res.data);
        })

        .catch((error) => {
          console.log(error);
        });
    };
    fetchAPI();
  }, []);

  const handleItemClick = (id) => {
    props.history.push(`/movie/${id}/`);
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  {
    return (
      <Container>
        <Container fluid>
          <Item.Group style={{ padding: "3rem" }}>
            {data1.map((movie) => (
              <Item key={movie.id} style={{ marginTop: "1rem" }}>
                {movie.poster ? (
                    <Item.Image
                      onClick={() => handleItemClick(movie.id)}
                      size="small"
                      src={movie.poster}
                    />
                ) : (
                  <Image size="small">
                    <Label content="Image not found!" icon="warning" />
                  </Image>
                )}

                <Item.Content>
                  <Item.Header onClick={() => handleItemClick(movie.id)}>
                    {movie.title}
                  </Item.Header>
                  <Item.Description>{movie.description}</Item.Description>
                  <Item.Extra>Directed by: {movie.director}</Item.Extra>
                  <Item.Extra>{movie.production_year}</Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(MovieList);
