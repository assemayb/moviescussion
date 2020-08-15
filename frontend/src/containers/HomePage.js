import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Grid,
  Header,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Form,
  Container,
} from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import { addNewMovide } from "../constants";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        />
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

class HomepageLayout extends Component {
  state = {
    formData: {
      title: "",
      director: "",
      year: "",
      description: "",
    },
  };
  handleChange = (e) => {
    const { formData } = this.state;
    const updatedFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    this.setState({
      formData: updatedFormData,
    });
  };
  handleSubmitForm = () => {
    const { formData } = this.state;
    axios.post(addNewMovide, { formData }).then((res) => {
      // console.log(res.data);
    });
  };
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Container style={{height: '70vh'}}>
        <Segment style={{ padding: "8em 0em"}} vertical>
          <Grid container stackable verticalAlign="middle" style={{ height: '20rem'}}>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h2" style={{ fontSize: "2em" }}>
                  What is the purpose of this application?
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Simply, this app give the ability to add movies with the
                  ability to rate them, comment on or even have a long
                  discussion with other people about them.
                </p>
              </Grid.Column>
              {isAuthenticated && (
                <Grid.Column floated="right" width={6}>
                  <Header textAlign="center">Add a movie here</Header>
                  <Form>
                    <Form.Field>
                      <label>Title </label>
                      <input
                        onChange={this.handleChange}
                        name="title"
                        type="text"
                        placeholder="enter a title.."
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Director</label>
                      <input
                        onChange={this.handleChange}
                        name="director"
                        type="text"
                        placeholder="enter a director.."
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Production Year</label>
                      <input
                        onChange={this.handleChange}
                        name="year"
                        type="text"
                        placeholder="enter a Year.."
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Description</label>
                      <input
                        onChange={this.handleChange}
                        name="description"
                        type="text"
                        placeholder="write a short description.."
                      />
                    </Form.Field>
                    <Button
                      style={{ backgroundColor: "black", color: "white" }}
                      // primary
                      type="submit"
                      onClick={this.handleSubmitForm}
                    >
                      submit
                    </Button>
                  </Form>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(HomepageLayout);
