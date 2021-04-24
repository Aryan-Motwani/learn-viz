import React, { Component } from "react";
import { withRouter } from "react-router";
import SideBar from "./SideBar";
import "./css/sub.css";
import Visualizer from "./Visualizer";
import Code from "./Code";
import TheoryPage from "./TheoryPage";
import BST from "./BST";

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: "Visualizer" };
    this.changeMode = this.changeMode.bind(this);
  }

  changeMode(e) {
    this.setState({ mode: e.target.textContent });
  }

  render() {
    let title = this.props.match.params.sub_category;
    let { mode } = this.state;
    let sortingComponent;
    if (mode === "Visualizer") {
      if (title === "Trees") {
        sortingComponent = <BST />;
      } else {
        sortingComponent = <Visualizer />;
      }
    } else if (mode === "Code") {
      sortingComponent = <Code title={title} />;
    } else if (mode === "Theory") {
      sortingComponent = <TheoryPage />;
    }
    return (
      <div className="sub">
        <SideBar mode={mode} handleClick={this.changeMode} />
        <div>
          <h1>{/* {title}({mode}) */}</h1>
          {sortingComponent}
        </div>
      </div>
    );
  }
}

export default withRouter(SubCategory);
