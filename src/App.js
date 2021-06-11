import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import About from "./About";
import ListPage from "./ListPage";
import Navbar from "./Navbar";
import SubCategory from "./SubCategory";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
        <Route exact path="/" component={ListPage} />
        <Route exact path="/About" component={About} />
        <Route
          exact
          path="/:category"
          component={(routerProps) => <ListPage {...routerProps} />}
          />
        <Route
          exact
          path="/a/:sub_category"
          component={(routerProps) => <SubCategory {...routerProps} />}
          />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
