import React, { Component } from "react";
import { withRouter } from "react-router";
import SideBar from "./SideBar";
import "./css/sub.css";
import Visualizer from "./Visualizer";
import Code from "./Code";
import TheoryPage from "./TheoryPage";
import BST from "./BST";
import LinkedList from "./LinkedList";
import Language from "./Language";
import languages from "./notes/notes";

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: "Visualizer", sortMode : "Bubble Sort" };
    this.changeMode = this.changeMode.bind(this);
  }

  changeMode(e) {
    this.setState({ mode: e.target.textContent });
  }

  handleSortMode = (e) => {
    e.preventDefault();
    this.setState({sortMode : e.target.value})
    this.render()
  }

  render() {
    let title = this.props.match.params.sub_category;
    let { mode,sortMode } = this.state;
    let sortingComponent,modes;
    let titles = ["Java","Python","C++","C","Javascript"];
    if(titles.includes(title)){
      // modes = ["Input","If/Else", "Loops", "Functions","Object Orientation"]
      modes = languages[title];
      console.log(languages);
      sortingComponent = <Language mode={mode} />
    }else if (mode === "Visualizer") {
      modes = 0
      if (title === "Trees") {
        sortingComponent = <BST />;
      } else if (title === "Linked List") {
        sortingComponent = <LinkedList />;
      } else {
        sortingComponent = <Visualizer sortMode={sortMode} />;
      }
    } else if (mode === "Code") {
      sortingComponent = <Code title={title} />;
    } else if (mode === "Theory") {
      sortingComponent = <TheoryPage />;
    }
    return (
      <div className="sub">
        <SideBar mode={mode} modes={modes} handleClick={this.changeMode} />
        <div>
          <h1>{/* {title}({mode}) */}</h1>
          {sortingComponent}
        </div>
        <select onChange={this.handleSortMode}>
          <option>Bubble Sort</option>
          <option>Selection Sort</option>
          <option>Radix Sort</option>
          <option>Insertion Sort</option>
          <option>Quick Sort</option>
        </select>
      </div>
    );
  }
}

export default withRouter(SubCategory);
