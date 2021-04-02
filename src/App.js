// changes made

import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import ListPage from "./ListPage";
import Navbar from "./Navbar";
import SubCategory from "./SubCategory";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={ListPage} />
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
      </div>
    );
  }
}

export default withRouter(App);
