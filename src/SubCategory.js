import React, { Component } from "react";
import { withRouter } from "react-router";
import SideBar from "./SideBar";
import "./css/sub.css";
import BubbleSort from "./BubbleSort";
import BubbleSortCode from "./BubbleSortCode";
import TheoryPage from "./TheoryPage";

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: "Theory" };
    this.changeMode = this.changeMode.bind(this);
  }

  changeMode(e) {
    this.setState({ mode: e.target.textContent });
  }

  render() {
    let title = this.props.match.params.sub_category;
    let { mode } = this.state;
    let sortingComponent;
    if (mode === "Visualizer" && title === "Bubble Sort") {
      sortingComponent = <BubbleSort />;
    } else if (mode === "Code" && title === "Bubble Sort") {
      sortingComponent = <BubbleSortCode />;
    } else if (mode === "Theory" && title === "Bubble Sort") {
      sortingComponent = <TheoryPage />;
    }
    return (
      <div className="sub">
        <SideBar mode={mode} handleClick={this.changeMode} />
        <div>
          <h1>
            {title}({mode})
          </h1>
          {sortingComponent}
        </div>
      </div>
    );
  }
}

export default withRouter(SubCategory);
