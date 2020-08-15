import React, { Fragment, useState, useEffect } from "react";
import {
  Image,
  Item,
  Container,
  Header,
  Label,
  Loader,
  Segment,
  Dimmer,
} from "semantic-ui-react";
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

function MovieList({ isAuthenticated, history, token }) {
  const [data1, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    console.log(token)
    console.log(isAuthenticated)

    const fetchAPI = () => {
      authAxios
        .get(movieListURL)
        .then((res) => {
          setData(res.data);
          setLoadingData(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchAPI();
  }, []);

  const handleItemClick = (id) => {
    history.push(`/movie/${id}/`);
  };

  if (!isAuthenticated) {
    return <Redirect to="/"/>;
  } else {
    return (
      <Container>
        {loadingData && (
          <Container>
            <Segment>
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
              <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
            </Segment>
          </Container>
        )}
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
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(MovieList);
