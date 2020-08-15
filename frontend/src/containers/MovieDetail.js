import React, { Component, Fragment } from "react";
import {
  Card,
  Icon,
  Image,
  Container,
  Button,
  Header,
  Grid,
  Form,
  Radio,
  List,
  Loader,
} from "semantic-ui-react";
import axios from "axios";
import CountUp from "react-countup";
import {
  movieDetailURL,
  movieVoteURL,
  movieListURL,
  movieAddComment,
} from "../constants";
import { Link, Redirect } from "react-router-dom";
import { authAxios } from "../utils";

class MovieDetail extends Component {
  state = {
    data: {},
    clicked: false,
    value: null,
    totalVotesNum: null,
    actualVotesValues: null,
    similarMovies: [],
    movieComment: "",
    comments: null,
  };
  countvotes = (array = []) => {
    let val = 0;
    for (let i = 0; i < array.length; i++) {
      val += array[i].value;
    }
    return val;
  };
  getSimMovies = (movies = [], movieID, movieDir) => {
    let simMov = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id != movieID && movies[i].director == movieDir) {
        simMov.push(movies[i]);
      }
    }
    return simMov;
  };
  componentDidMount() {
    var id = this.props.match.params.movieID;
    axios.get(movieDetailURL(id)).then((res) => {
      this.setState({ data: res.data });
      this.setState({
        totalVotesNum: this.state.data.vote.length * 5,
      });
      const { vote } = this.state.data;
      let val = this.countvotes(vote);
      this.setState({
        actualVotesValues: val,
      });
      axios.get(movieListURL).then((res) => {
        const { id, director } = this.state.data;
        var dataArr = this.getSimMovies(res.data, id, director);
        this.setState({
          similarMovies: dataArr,
        });
        this.handleGetComments();
      });
    });
  }
  handleGetComments = () => {
    const id = this.props.match.params.movieID;
    authAxios.get("http://localhost:8000/api/get_comment").then((res) => {
        let arr = [];
        console.log(res.data)
        if (res.data.length > 0) {
          let resData = res.data;
          for (let i = 0; i < resData.length; i++) {
            if (resData[i].movie == id) {
              arr.push(resData[i]);
            }
          }
          this.setState({
            comments: arr,
          });
        }
      });
  }

  handleVoteButtonClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };
  handleChange = (e, { value, checked }) => {
    e.target.checked = true;
    this.setState({ value: value });
  };
  handleItemClick = (id) => {
    this.props.history.push(`/movie/${id}/`);
    window.location.reload(false);
  };
  submitVoteValue = () => {
    const { title } = this.state.data;
    const { value } = this.state;
    authAxios.post(movieVoteURL, { title, value });
    window.location.reload(false);
  };
  handleCommentChange = (e) => {
    this.setState({
      movieComment: e.target.value,
    });
  };
  handleSubmitComment = () => {
    const { movieComment } = this.state;
    const movieID = this.props.match.params.movieID;
    if (movieComment.length > 1) {
      authAxios
        .post(movieAddComment, { movie_comment: movieComment, movie_id: movieID })
        .then(() => {
          this.handleGetComments();
        });
    }
  };
  render() {
    const {
      data,
      clicked,
      actualVotesValues,
      totalVotesNum,
      similarMovies,
      comments,
    } = this.state;
    const votes_val = parseFloat(
      ((actualVotesValues / totalVotesNum) * 5).toString()
    ).toFixed(2);
    return (
      <Container>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Container>
                <Card style={{ marginTop: "7rem" }}>
                  <Image src={data.poster} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{data.title}</Card.Header>
                    <hr />
                    <h4>created in: {data.production_year}</h4>
                    <Card.Description>{data.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <hr />

                    <h3>
                      <Fragment>Movie ratings : {votes_val}</Fragment>
                    </h3>
                    <Button onClick={this.handleVoteButtonClick}>
                      <Icon name="angle double down" />
                      Vote
                    </Button>
                  </Card.Content>
                  {clicked == true && (
                    <Form style={{ marginLeft: "0.6rem", padding: "1rem" }}>
                      <Form.Field>
                        <Radio
                          label="1"
                          name="radioGroup"
                          value="1"
                          checked={this.state.value === "1"}
                          onChange={this.handleChange}
                        />
                        <Radio
                          style={{ marginLeft: "3px" }}
                          label="2"
                          name="radioGroup"
                          value="2"
                          checked={this.state.value === "2"}
                          onChange={this.handleChange}
                        />
                        <Radio
                          style={{ marginLeft: "3px" }}
                          label="3"
                          name="radioGroup"
                          value="3"
                          checked={this.state.value === "3"}
                          onChange={this.handleChange}
                        />
                        <Radio
                          style={{ marginLeft: "3px" }}
                          label="4"
                          name="radioGroup"
                          value="4"
                          checked={this.state.value === "4"}
                          onChange={this.handleChange}
                        />
                        <Radio
                          style={{ marginLeft: "3px" }}
                          label="5"
                          name="radioGroup"
                          value="5"
                          checked={this.state.value === "5"}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Button
                        onClick={this.submitVoteValue}
                        style={{ color: "white", backgroundColor: "black" }}
                      >
                        submit
                      </Button>
                    </Form>
                  )}
                </Card>
              </Container>
            </Grid.Column>
            <Grid.Column row={2}>
              <Grid.Row>
                <Container style={{ marginTop: "7rem" }}>
                  <Container style={{ padding: "0.5rem" }}>
                    <Header>Similar Movies</Header>
                  </Container>
                  {similarMovies === 0 && (
                    <Loader size="small" active/>
                  )}
                  {similarMovies.length > 0 ? (
                    <List
                      divided
                      relaxed
                      style={{ backgroundColor: "#f3f3f2", padding: "1rem" }}
                    >
                      {similarMovies.map((mov, id) => (
                        <List.Item
                          as="a"
                          key={id}
                          style={{
                            backgroundColor: "#f3f3f2",
                            padding: "1rem",
                          }}
                        >
                          <List.Content>
                            <List.Header
                              onClick={() => this.handleItemClick(mov.id)}
                            >
                              {mov.title}
                            </List.Header>
                            <List.Description as="a">
                              {mov.description}
                            </List.Description>{" "}
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <p>No movies here are similar</p>
                  )}
                </Container>
              </Grid.Row>
              <br />
              <Grid.Row>
                <Container style={{ marginTop: "3rem", padding: "0.5rem" }}>
                  <Header>Comments</Header>
                  <Form>
                    <Container>
                      <Form.Field style={{ width: "87%" }}>
                        <input
                          onChange={this.handleCommentChange}
                          name="comment"
                          type="text"
                          placeholder="add a comment about this movie"
                        />
                      </Form.Field>
                      <Button
                        animated
                        floated="right"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          marginTop: "-3.5rem",
                        }}
                        size="small"
                        type="submit"
                        onClick={this.handleSubmitComment}
                      >
                        <Button.Content visible>add</Button.Content>
                        <Button.Content hidden>
                          <Icon name="comment" />
                        </Button.Content>
                      </Button>
                    </Container>
                  </Form>
                  {comments !== null ? (
                    <List
                      divided
                      relaxed
                      style={{ backgroundColor: "#f3f3f2", padding: "0.7rem" }}
                    >
                      {comments.map((com) => (
                        <List.Item
                          as="a"
                          key={com.id}
                          style={{
                            backgroundColor: "#f3f3f2",
                            padding: "0.5rem",
                          }}
                        >
                          <List.Content as="p">
                            {com.username}:{" "}
                            <List.Description>{com.text}</List.Description>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Loader active/>
                  )}
                </Container>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default MovieDetail;
