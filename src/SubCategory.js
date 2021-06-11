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
import Stack from "./Stack";
import Queue from "./Queue";
import Search from "./Search";

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: "Visualizer", sortMode : "Selection Sort" };
    this.changeMode = this.changeMode.bind(this);
    this.child = React.createRef();
  }

  changeMode(e) {
    this.setState({ mode: e.target.textContent });
  }

  render() {
    let title = this.props.match.params.sub_category;
    let { mode,sortMode } = this.state;
    let sortingComponent,modes;
    let titles = ["Java","Python","C++","C","Javascript"];
    if(titles.includes(title)){
      modes = languages[title];
      console.log(languages);
      sortingComponent = <Language mode={mode} />
    }else if (mode === "Visualizer") {
      modes = 0
      if (title === "Trees") {
        sortingComponent = <BST />;
      } else if (title === "Linked List") {
        sortingComponent = <LinkedList />;
      }else if(title === "Stack"){
        sortingComponent = <Stack />;
      }else if(title === "Queue"){
        sortingComponent = <Queue />;
      }else if(title === "Searching Algorithms"){
        sortingComponent = <Search />;
      } else {
        sortingComponent = <Visualizer ref={this.child} sortMode={sortMode} />;
      }
    } else if (mode === "Code") {
      sortingComponent = <Code/>;
    } else if (mode === "Theory") {
      sortingComponent = <TheoryPage />;
    }
    return (
      <div className="sub">
        <SideBar mode={mode} modes={modes} handleClick={this.changeMode} />
        <div>
          {sortingComponent}
        </div>
      </div>
    );
  }
}

export default withRouter(SubCategory);
