import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./css/box.css";

class Box extends Component {
  render() {
    const { title, idx } = this.props;
    return (
      <div className="box" onClick={() => this.props.handleClick(idx)}>
        <div className="image">
          <img src="../public/imgs/db.png" />
        </div>
        <h3 className="title">{title}</h3>
      </div>
    );
  }
}

export default withRouter(Box);
