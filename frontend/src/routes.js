import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import HomepageLayout from "./containers/HomePage";
import MovieList from "./containers/MovieList";
import MovieDetail from "./containers/MovieDetail";
import Signup from "./containers/Signup";
import Login from "./containers/Login";


const BaseRouter = (props) => (
  <Hoc>
    <Route exact path="/" component={HomepageLayout} />
    <Route path="/movies" component={MovieList} />
    <Route path="/movie/:movieID" component={MovieDetail} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
  </Hoc>
);

export default BaseRouter;
