import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Images from "./Images";
import "./css/box.css";

class Box extends Component {
  render() {
    
    const { title, idx } = this.props;
    let a = {"Sorting Algorithms": Images.sorting, "Trees": Images.bst, "Linked List" : Images.list, "Graphs": Images.graphds,"Queue" : Images.queue,"Searching Algorithms" : Images.search, "Recursion": Images.recursion, "Stack": Images.stack};
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
