import React, { Component } from "react";
import "./css/BST.css";

export default class BST extends Component {
  constructor(props) {
    super(props);
    this.blocksdemo = React.createRef();
    this.blockClone = React.createRef();
    this.state = {
      inputVal: "",
      mytree: [null, null, null],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  genTreee = (i, j, v) => {
    console.log("hello");
    const starts = [500, 300, 200, 150];
    const gaps = [0, 400, 200, 100];

    let blocks = this.blocksdemo.current.children;

    let newNode = this.blockClone.current.children[0].cloneNode(true);
    blocks[0].parentNode.append(newNode);

    newNode.children[0].textContent = v;
    newNode.style.opacity = 1;

    newNode.style.transform = `translate(${starts[j] + gaps[j] * i}px,${
      75 * j
    }px)`;
  };

  genLines = (i, j) => {
    // i = 7;
    // j = 2;
    const vals = [
      { y: -45, h: 200, deg: 67, start: 425, gap: 185 },
      { y: 70, h: 110, deg: 55, start: 270, gap: 90 },
      { y: 170, h: 70, deg: 45, start: 190, gap: 50 },
    ];

    const xValues = [
      [425, 610],
      [270, 360, 670, 760],
      [190, 240, 390, 440, 590, 640, 790, 840],
    ];

    let blocks = this.blocksdemo.current.children;
    // let newLine = blocks[0].cloneNode(true);
    let newLine = this.blockClone.current.children[1].cloneNode(true);

    newLine.style.height = `${vals[j].h}px`;
    newLine.style.width = `5px`;

    newLine.style.transform = `translate(${xValues[j][i]}px,${
      vals[j].y
    }px) rotate(${i % 2 === 0 ? vals[j].deg : -1 * vals[j].deg}deg)`;

    blocks[0].parentNode.insertBefore(newLine, blocks[0]);
  };

  handleChange(evt) {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let { inputVal } = this.state;
    this.insert(+inputVal);
  }

  insert = (value) => {
    let { mytree } = this.state;
    let newNode = [value, null, null];
    let j = 0;
    let start = "";

    if (mytree[0] === null) {
      mytree = newNode;
      this.genTreee(0, 0, value);
      this.setState({ mytree });
      return;
    }
    j++;
    let current = mytree;
    while (true) {
      if (value === current[0]) return undefined;
      if (value < current[0]) {
        start += "0";
        if (current[1] === null) {
          current[1] = newNode;
          this.setState({ mytree });
          console.log(parseInt(+start, 2), j, value);

          this.genTreee(parseInt(+start, 2), j, value);
          this.genLines(parseInt(+start, 2), j - 1, value);
          return;
        }

        current = current[1];
      } else {
        start += "1";
        if (current[2] === null) {
          current[2] = newNode;
          console.log(parseInt(+start, 2), j, value);
          this.genTreee(parseInt(+start, 2), j, value);
          this.genLines(parseInt(+start, 2), j - 1, value);

          this.setState({ mytree });

          return;
        }

        current = current[2];
      }
      j++;
    }
  };

  render() {
    return (
      <div>
        <h1>Binary Search Tree</h1>

        <div ref={this.blocksdemo} className="blocks">
          <div style={{ opacity: "0" }} className="block">
            <label>0</label>
          </div>
        </div>

        <div style={{ opacity: "0" }} ref={this.blockClone}>
          <div className="block">
            <label>0</label>
          </div>
          <div className="line"></div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="inputVal"
            onChange={this.handleChange}
            value={this.inputVal}
          ></input>
          <button style={{ transform: "translate(10px,-467.5px)" }}>Add</button>
        </form>
      </div>
    );
  }
}
