import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./css/bar.css";

class BubbleSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: this.genNums(),
      stepNum: 0,
      steps: [],
      mode: "key",
      delay: "0.5s",
    };

    this.mainDiv = React.createRef();

    this.swap = this.swap.bind(this);
    this.genSteps = this.genSteps.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.genBars = this.genBars.bind(this);
    this.spaceBar = this.spaceBar.bind(this);
    this.stepForward = this.stepForward.bind(this);
  }

  componentDidMount() {
    this.genBars();
    this.genSteps();
    document.addEventListener("keydown", this.handleKey);
  }

  genNums() {
    let nums = [77, 47, 34, 27, 50];
    // let nums = [];
    // for(let i = 0; i < 5; i++)
    //     nums.push(Math.floor(Math.random()*100));
    return nums;
  }

  genBars() {
    let { nums } = this.state;
    let bars = this.mainDiv.current.children;
    for (let i = 0; i < 5; i++) {
      bars[i].classList.add("Bar");
      bars[i].children[0].textContent = nums[i];
      bars[i].style.transform = `translate(${i * 124 + 10}px)`;
      bars[i].style.backgroundColor = "#cffaff";
      bars[i].style.height = `${nums[i] * 4}px`;
    }
  }

  async wait() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
  }

  async stepBack() {
    console.log("back");
    let { steps, stepNum } = this.state;
    let currentStep = steps[stepNum - 1];
    if (stepNum == 0) {
      return;
    }
    if (Array.isArray(currentStep[0])) {
      for (let j = 0; j < currentStep.length; j++) {
        console.log(currentStep[j]);
        if (currentStep[j][0] === "c")
          await this.colorChange(currentStep[j][1], currentStep[j][3]);
        else if (currentStep[j][0] === "s")
          await this.swap(currentStep[j][1], currentStep[j][2]);
      }
    }
    if (currentStep[0] === "c")
      await this.colorChange(currentStep[1], currentStep[3]);
    else if (currentStep[0] === "s")
      await this.swap(currentStep[1], currentStep[2]);

    // await this.wait();
    stepNum--;
    this.setState({ stepNum });
  }

  async stepForward() {
    let { steps, stepNum } = this.state;
    let currentStep = steps[stepNum];
    if (stepNum >= steps.length) {
      return;
    }
    if (Array.isArray(currentStep[0])) {
      for (let j = 0; j < currentStep.length; j++) {
        if (currentStep[j][0] === "c")
          await this.colorChange(currentStep[j][1], currentStep[j][2]);
        else if (currentStep[j][0] === "s")
          await this.swap(currentStep[j][1], currentStep[j][2]);
      }
    }
    if (currentStep[0] === "c")
      await this.colorChange(currentStep[1], currentStep[2]);
    else if (currentStep[0] === "s")
      await this.swap(currentStep[1], currentStep[2]);

    // await this.wait();
    console.log(steps[stepNum]);
    stepNum++;
    this.setState({ stepNum });
  }

  async spaceBar() {
    let { steps, stepNum, delay } = this.state;

    for (let i = stepNum; i < steps.length; i++) {
      if (this.state.mode == "key") {
        break;
      }
      let blocks = this.mainDiv.current.children;
      for (let j = 0; j < 5; j++) {
        blocks[j].style["transition-duration"] = delay;
      }

      await this.stepForward(steps[stepNum]);
      stepNum++;
      this.setState({ stepNum });
      await this.wait();
    }
  }

  async genSteps() {
    let { nums, steps } = this.state;
    let noSwaps;
    let i, j, temp;
    let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];

    for (j = nums.length; j > 0; j--) {
      noSwaps = true;
      for (i = 0; i < j - 1; i++) {
        // await this.colorChange(i,'green');
        // await this.colorChange(i+1,'green');
        steps.push(
          ["c", i, "green", colors[i]],
          ["c", i + 1, "green", colors[i + 1]]
        );
        colors[i] = "green";
        colors[i + 1] = "green";
        // console.log([["c",i,"green"],["c",i+1,"green"]]);

        // await this.wait();
        // console.log(nums[i] , nums[i+1]);
        if (nums[i] > nums[i + 1]) {
          // await this.swap(i,i+1);
          temp = nums[i];
          nums[i] = nums[i + 1];
          nums[i + 1] = temp;
          steps[steps.length] = [];
          steps[steps.length - 1].push(["s", i, i + 1]);
          // console.log(["s",i,i+1])
          noSwaps = false;
          temp = colors[i];
          colors[i] = colors[i + 1];
          colors[i + 1] = temp;
          // await this.wait();
        }

        // await this.colorChange(i,'#cffaff');
        // await this.colorChange(i+1,'#cffaff');
        if (!noSwaps) {
          steps.push(["c", i, "#cffaff", colors[i]]);
          steps.push(["c", i + 1, "#cffaff", colors[i + 1]]);
          colors[i] = "#cffaff";
          colors[i + 1] = "#cffaff";
        } else {
          steps.push([
            ["c", i, "#cffaff", colors[i]],
            ["c", i + 1, "#cffaff", colors[i + 1]],
          ]);
          colors[i] = "#cffaff";
          colors[i + 1] = "#cffaff";
        }
        // console.log([["c",i,"#cffaff"],["c",i+1,"#cffaff"]]);
      }
      // let colors = Array.from(this.mainDiv.current.children).map(block => {
      //     return block.style.backgroundColor;
      // });

      // await this.colorChange(j-1,'orange');
      steps.push(["c", j - 1, "orange", colors[j - 1]]);
      colors[j - 1] = "orange";
      // console.log(["c",j-1,"orange"]);

      // await this.wait();

      if (noSwaps) {
        for (i = 0; i < j - 1; i++) {
          // await this.colorChange(i,'orange');
          steps.push(["c", i, "orange", colors[i]]);
          colors[i] = "orange";
          // console.log(["c",j-1,"orange"]);
        }
        break;
      }
    }
    this.setState({ steps });
    console.log(this.state.steps);
  }

  swapNodes(i, j) {
    let blocks = this.mainDiv.current.children;

    let el1 = blocks[i];
    let el2 = blocks[j];

    let clone1 = el1.cloneNode(true);
    let clone2 = el2.cloneNode(true);

    el2.parentNode.replaceChild(clone1, el2);
    el1.parentNode.replaceChild(clone2, el1);
  }

  async swap(i, j) {
    return new Promise((resolve) => {
      let temp;
      if (i > j) {
        temp = i;
        i = j;
        j = temp;
      }

      let mainDiv = this.mainDiv.current;
      let bars = mainDiv.children;
      let { nums } = this.state;

      temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;

      temp = bars[i].style.transform;
      bars[i].style.transform = bars[j].style.transform;
      bars[j].style.transform = temp;

      // window.requestAnimationFrame(() => {
      setTimeout(() => {
        this.swapNodes(j, i);
        resolve();
      }, 500);
      // })
    });
  }

  colorChange(i, color) {
    let bars = this.mainDiv.current.children;
    bars[i].style.backgroundColor = color;
  }

  handleKey = (e) => {
    if (e.keyCode == 39) {
      this.setState({ mode: "key" });
      this.stepForward();
    } else if (e.keyCode == 37) {
      this.setState({ mode: "key" });
      this.stepBack();
    } else if (e.keyCode == 32) {
      if (this.state.mode == "spacebar") return this.setState({ mode: "key" });
      else this.setState({ mode: "spacebar" });
      this.spaceBar();
    }
  };

  boxMove = (e) => {
    // let textBox = this.mainDiv.current.children[5];
    // textBox.style.transform = "translate(50px)"
    this.setState({ delay: "1s" });
  };

  render() {
    let { nums } = this.state;
    return (
      <div className="bar-main">
        <div className="main-div" ref={this.mainDiv}>
          {nums.map((i, j) => (
            <div key={j}>
              <label></label>
            </div>
          ))}
          <span className="tbox">This is a text box</span>
        </div>
        <button onClick={this.boxMove}>Move Box</button>
      </div>
    );
  }
}

export default withRouter(BubbleSort);

// async bubbleSteps(){
//     let {nums, steps} = this.state;
//     let noSwaps;
//     let i,j;
//     for(j = nums.length; j > 0; j--){
//         noSwaps = true;
//         for(i = 0; i < j-1; i++){
//             await this.colorChange(i,'green');
//             await this.colorChange(i+1,'green');
//             await this.wait();
//             if (nums[i] > nums[i+1]) {
//                 await this.swap(i,i+1);
//                 noSwaps = false;
//                 await this.wait();
//             }
//             await this.colorChange(i,'#cffaff');
//             await this.colorChange(i+1,'#cffaff');
//         }
//         await this.colorChange(j-1,'orange');
//         await this.wait();
//         if (noSwaps){
//             for(i = 0;i < j-1;i++){
//                 await this.colorChange(i,'orange');
//             }
//             break;
//         }
//     }
// }
