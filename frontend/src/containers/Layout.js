import React, { Component, Fragment } from "react";
import { Input, Menu, Container, Form } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { movieSearch } from "../constants";
import SearchPortal from "./Portal";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

export class CustomLayout extends Component {
  state = {
    activeItem: "home",
    searchInput: "",
    resultData: [],
    portalSwitch: false,
  };
  switchHelper = (s) => {
    if (s === true) {
      s = false;
    };
  };
  // switchHelper2 = (switchState) => {
  //  (switchState === true) && {
  //    switchState = false
  //  }
  // }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleSearchChange = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
    const { portalSwitch } = this.state;
    let s = this.switchHelper(portalSwitch);
    this.setState({
      portalSwitch: s,
    });
  };
  handleSubmitSearch = () => {
    const { searchInput } = this.state;
    console.log(searchInput);

    axios.post(movieSearch, { searchInput }).then((res) => {
      console.log(searchInput);
      console.log(res.data);
      this.setState({
        resultData: res.data,
        portalSwitch: true,
      });
    });
  };
  handlLoginClick = () => {
    this.props.history.push("/login");
  };
  render() {
    const { activeItem, portalSwitch, resultData } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <Fragment>
        <Menu inverted style={{ padding: "1rem", fontSize: "15px" }}>
          <Link to="/">
            <Menu.Item
              style={{ padding: "1.8rem", fontSize: "15px" }}
              name="home"
              active={activeItem === "home"}
              onClick={this.handleItemClick}
            />
          </Link>

          <Link to="/movies">
            <Menu.Item
              style={{ padding: "1.8rem", fontSize: "15px" }}
              name="Movies"
              active={activeItem === "movies"}
              onClick={this.handleItemClick}
            />
          </Link>
          <Menu.Menu position="right">
            {isAuthenticated ? (
              <Menu.Item onClick={() => this.props.signout()}>
                <h4>sign out</h4>
              </Menu.Item>
            ) : (
              <Menu.Item onClick={this.handlLoginClick}>
                <h4>Log in</h4>
              </Menu.Item>
            )}
            <Menu.Item>
              <Form onSubmit={this.handleSubmitSearch}>
                <Input
                  onChange={this.handleSearchChange}
                  icon="search"
                  placeholder="Search for a movie"
                />
              </Form>
              {portalSwitch === true && (
                <SearchPortal data={resultData} history={this.props.history} />
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    signout: () => dispatch(actions.authLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
