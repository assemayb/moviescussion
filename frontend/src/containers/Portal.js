import React, { Component, Fragment } from "react";
import { Portal, Segment, Header, Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SearchPortal extends Component {
  state = {
    open: true,
    data: this.props.data,
  };

  handleClose = () => this.setState({ open: false });
  handleOpen = () => this.setState({ open: true });
  handleMovClick = (id) => {
    this.props.history.push(`/movie/${id}/`);
    window.location.reload(false);
  };
  render() {
    const { open, data } = this.state;
    return (
      <div>
        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={{
              right: "3.7%",
              position: "fixed",
              top: "10%",
              zIndex: 1000,
              width: "12rem",
            }}
          >
            <h5>Results:</h5>
            {data.length == 0 ? (
              <Container>
                <h5>wow, such empty</h5>
              </Container>
            ) : (
              data.map((mov) => (
                <Container style={{padding:'0.2rem'}}>
                  <h4
                    key={mov.id}
                    onClick={() => this.handleMovClick(mov.movie_id)}
                  >
                    {mov.movie_title}
                  </h4>
                </Container>
              ))
            )}
            <br/>
            <Button content="close" negative onClick={this.handleClose} />
          </Segment>
        </Portal>
      </div>
    );
  }
}

export default SearchPortal;
