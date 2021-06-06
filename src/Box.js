import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import sorting from "./img/sorting.png"
import bst from "./img/bst.png"
import list from "./img/list.png"
import recursion from "./img/recursion.png"
import graphds from "./img/graphds.png"

import "./css/box.css";

class Box extends Component {
  render() {
    const { title, idx } = this.props;
    let a = {"Sorting Algorithms": sorting, "Trees": bst, "Linked List" : list, "Graphs": graphds, "Recursion": recursion};
    let img = Object.keys(a).includes(title) ? a[title] : a["Recursion"];
    return (
      <div className="box" onClick={() => this.props.handleClick(idx)}>
        <div className="image">
          <img src={img}></img>
        </div>
        <h3 className="title">{title}</h3>
      </div>
    );
  }
}

export default withRouter(Box);
