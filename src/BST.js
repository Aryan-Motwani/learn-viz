// Notes Page

// Seprate Styles
// Pages mode change
// buttons(create,sort), speed
// merge sort fix
// sorting improve

// LL - search
// Tree - insert_high, search, traversal
// Stack, Queue, DLL


import React, { Component } from "react";
import "./css/BST.css";

export default class BST extends Component {
  constructor(props) {
    super(props);
    this.blocksdemo = React.createRef();
    this.blockClone = React.createRef();
    this.state = {
      inputVal: "",
      deleteVal: "",
      mytree: [null, null, null],
      nums: [],
      insertNums: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let nums = [40,30,20,35,25];
    for (let i = 0; i < nums.length; i++) await this.insert(nums[i]);
  }

  genTreee = (i, j, v) => {
    const starts = [500, 300, 200, 150];
    const gaps = [0, 400, 200, 100];

    let blocks = this.blocksdemo.current;

    let newNode = this.blockClone.current.children[0].cloneNode(true);
    blocks.append(newNode);

    newNode.children[0].textContent = v;
    newNode.style.opacity = 1;

    newNode.style.transform = `translate(${starts[j] + gaps[j] * i}px,${
      75 * j
    }px)`;
  };

  genLines = (i, j) => {
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
    let values = inputVal.split(",");
    for (let i = 0; i < values.length; i++)
      this.insert(+values[i]);
  }

  getTranslateValues = (element) => {
    const style = window.getComputedStyle(element);
    const matrix =
      style["transform"] || style.webkitTransform || style.mozTransform;

    // No transform property. Simply return 0 values.
    if (matrix === "none" || typeof matrix === "undefined") {
      return {
        x: 0,
        y: 0,
        z: 0,
      };
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes("3d") ? "3d" : "2d";
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === "2d") {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0,
      };
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === "3d") {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14],
      };
    }
  };

  insert = async (value) => {
    value = +value
    let { mytree, nums, insertNums } = this.state;
    insertNums = [];
    let newNode = [value, null, null];
    let j = 0;
    let start = "";
    insertNums = [];

    nums.push(value);
    this.setState({ nums });

    if (mytree[0] === null) {
      mytree = newNode;
      this.genTreee(0, 0, value);
      this.setState({ mytree, insertNums });
      return;
    }

    j++;
    let current = mytree;
    insertNums.push(current[0]);
    while (true) {
      if (value === current[0]) return undefined;
      if (value < current[0]) {
        start += "0";
        if (current[1] === null) {
          current[1] = newNode;
          // insertNums.push(current[0]);
          this.setState({ mytree,insertNums });

          // this.bfss(insertNums);
          this.genTreee(parseInt(+start, 2), j, value);
          this.genLines(parseInt(+start, 2), j - 1, value);

          return;
        }

        current = current[1];
        insertNums.push(current[0]);
      } else {
        start += "1";
        if (current[2] === null) {
          current[2] = newNode;
          // insertNums.push(current[0]);
          // this.bfss(insertNums);
          this.genTreee(parseInt(+start, 2), j, value);
          this.genLines(parseInt(+start, 2), j - 1, value);

          this.setState({ mytree, insertNums });
          return;
        }

        current = current[2];
        insertNums.push(current[0]);
      }
      j++;
    }
  };

  treeArray = () => {
    let {mytree} = this.state;
    let treeData = [[,],[,,],[,,,,],[,,,,,,,,]]

    // Root
    if(mytree[0]){
      treeData[0][0] = mytree[0];

      // Left
      if(mytree[1]){
        treeData[1][0] = mytree[1][0];

        // Left's right-left
        if(mytree[1][1]){
          treeData[2][0] = mytree[1][1][0];

          if(mytree[1][1][1]) treeData[3][0] = mytree[1][1][1][0];
          if(mytree[1][1][2]) treeData[3][1] = mytree[1][1][2][0];
        }

        if(mytree[1][2]){
          treeData[2][1] = mytree[1][2][0];

          if(mytree[1][2][1]) treeData[3][2] = mytree[1][2][1][0];
          if(mytree[1][2][2]) treeData[3][3] = mytree[1][2][2][0];
        }
      
      }


    // Right
    if(mytree[2]){
      treeData[1][1] = mytree[2][0];

      // Right's right-left
      if(mytree[2][1]){
        treeData[2][2] = mytree[2][1][0];

        if(mytree[2][1][1]) treeData[3][4] = mytree[2][1][1][0];
        if(mytree[2][1][2]) treeData[3][5] = mytree[2][1][2][0];
      }

      if(mytree[2][2]){
        treeData[2][3] = mytree[2][2][0];

        if(mytree[2][2][1]) treeData[3][6] = mytree[2][2][1][0];
        if(mytree[2][2][2]) treeData[3][7] = mytree[2][2][2][0];
      }

    }


    }
    return treeData;
  }

  searchVal = (val) => {
    let {mytree} = this.state;
    let treeArray = this.treeArray();


    let i = treeArray.map(i => i.includes(val)).indexOf(true);
    if(i === -1) return false;
    let j = treeArray[i].indexOf(val);

    console.log(i,j);


    return
    // let {mytree} = this.state;

    if(val === mytree[0]) return [];

    if(mytree[1][0])
      if(mytree[1][0] === val) return [mytree[0]];
    else 
      return "h"
    if(mytree[2][0]) if(mytree[2][0] === val) return [mytree[0]];
    else return

    // Left
    if(mytree[1][1][0]) if(mytree[1][1][0] === val) return [mytree[0], mytree[1][0]];
    if(mytree[1][2][0]) if(mytree[1][2][0] === val) return [mytree[0], mytree[1][0]];
    if(mytree[2][1][0]) if(mytree[2][1][0] === val) return [mytree[0], mytree[2][0]];
    if(mytree[2][2][0]) if(mytree[2][2][0] === val) return [mytree[0], mytree[2][0]];


    if(mytree[1][1][1][0]) if(mytree[1][1][1][0] === val) return [mytree[0], mytree[1][0], mytree[1][1][0]];
    // if(mytree[1][1][2][0]) if(mytree[1][1][2][0] === val) return [mytree[0], mytree[1][0], mytree[1][1][2][0]];

    // if(mytree[1][2][1][0]) if(mytree[1][2][1][0] === val) return [mytree[0], mytree[1][0], mytree[1][1][1][0]];
    // if(mytree[1][2][2][0]) if(mytree[1][2][2][0] === val) return [mytree[0], mytree[1][0], mytree[1][1][2][0]];

  };

  async wait() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
  }

  BFS() {
    let { mytree } = this.state;
    let myarr = [];
    let node = mytree,
      data = [],
      queue = [];
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node[0]);
      myarr.push(node[0])
      if (node[1]) queue.push(node[1]);
      if (node[2]) queue.push(node[2]);
      myarr.push("")
    }
    return data,myarr;
  }

  highNums = async (nums) => {
    console.log("bfss : " + nums);

    for (let i = 0; i < nums.length; i++) {
      await this.wait();
      if (nums[i] !== 40) this.highLine(nums[i]);
      await this.wait();
      this.highNode(nums[i]);
    }
    // });
  };

  handleDelete = async (e) => {
    e.preventDefault();
      let {deleteVal,nums} = this.state
    console.log(this.searchVal(+deleteVal));
  };

  high = async (i, j) => {
    let blocksdemo = this.blocksdemo.current;
    let blockClone = this.blockClone.current;
    let lineClone = blockClone.children[1].cloneNode(true);

    blocksdemo.insertBefore(lineClone, blocksdemo.children[5]);

    lineClone.style.opacity = 1;
    lineClone.style.width = "5px";
    lineClone.style.backgroundColor = "orange";
    lineClone.classList.add("notransition");

    let { x, y } = this.getTranslateValues(blocksdemo.children[2]);
    lineClone.style.transform = `translate(${+x - 30}px,${
      +y + 30
    }px) rotate(-55deg)`;

    await this.wait();

    lineClone.style.transform = `translate(${x}px,${y}px) rotate(-55deg)`;
    lineClone.classList.remove("notransition");
    lineClone.style.height = "110px";

    // 0,1
    // lineClone.style.transform = `translate(${+x - 68}px,${
    //   +y + 70
    // }px) rotate(67deg)`;

    // 1,3
    // lineClone.style.transform = `translate(${+x - 30}px,${
    //   +y + 32
    // }px) rotate(-55deg)`;

    // 1,2
    // lineClone.style.transform = `translate(${+x + 30}px,${
    //   +y + 30
    // }px) rotate(55deg)`;
  };

  search = (val) => {
    let {mytree,nums} = this.state;
    let arr = [];

    // Empty Tree
    if(!mytree[0]) return;

    // Root
    if(mytree[0] === val){
      console.log("root");
    }


    let i = nums.indexOf(val);
    // console.log(this.blocksdemo.current.children[i+nums.length-1])
    // console.log(i+nums.length);

    this.insertHigh(val);
    // console.log(this.state.insertNums);

  }

  highLine = (i) => {
    let { nums } = this.state;
    let blocksdemo = this.blocksdemo.current;

    let idx = nums.length - nums.indexOf(i) - 1;
    blocksdemo.children[idx].style.backgroundColor = "orange";
  };

  highNode = (i) => {
    let { nums } = this.state;
    let blocksdemo = this.blocksdemo.current;

    let idx = nums.indexOf(i) + nums.length - 1;
    blocksdemo.children[idx].style.borderColor = "orange";
    blocksdemo.children[idx].children[0].style.color = "orange";
  };

  render() {
    return (
      <div>
        <h1>Binary Search Tree</h1>

        <div ref={this.blocksdemo} className="blocks"></div>

        <div style={{ opacity: "0" }} ref={this.blockClone}>
          <div className="block">
            <label>0</label>
          </div>
          <div
            style={{
              height: "0px",
            }}
            className="line"
          ></div>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="inputVal"
            onChange={this.handleChange}
            value={this.inputVal}
          ></input>
          <button style={{ transform: "translate(10px, -411.5px)" }}>
            Add
          </button>
        </form>
        <form onSubmit={this.handleDelete}>
          <input
            type="text"
            name="deleteVal"
            onChange={this.handleChange}
            value={this.deleteVal}
          ></input>
          <button
            // onClick={this.test}
            style={{ transform: "translate(40px, -411.5px)" }}
          >
            Remove
          </button>
        </form>
      </div>
    );
  }
}