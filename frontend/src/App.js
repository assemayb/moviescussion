import React, { Component, Fragment } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import CustomLayout from "./containers/Layout";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";


import BaseRouter from "./routes.js";
import Footer from "./containers/Footer";

export class App extends Component {

  componentWillMount(){
    this.props.onTryAutoSignup();
  }
  
  // componentDidMount() {
  //   this.props.onTryAutoSignup();
  // }
  render() {
    return (
      <Router>
        <CustomLayout />
        <BaseRouter ></BaseRouter>
        <Footer/>
      </Router>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
