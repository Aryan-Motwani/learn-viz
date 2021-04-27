import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./css/bar.css";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  // quickSort,
  // mergeSort,
} from "./genSteps";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: this.genNums(),
      stepNum: 0,
      steps: [],
      mode: "key",
      delay: "0.5s",
      swapped: false,
      numbers: [],
      newNums: [],
      buckets: [[], [], [], [], [], [], [], [], [], []],
      textBoxes: [],
    };

    this.mainDiv = React.createRef();
    this.buckets = React.createRef();

    this.swap = this.swap.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.genBars = this.genBars.bind(this);
    this.spaceBar = this.spaceBar.bind(this);
    this.stepForward = this.stepForward.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.genBars();
    switch (this.props.location.pathname.split("/")[2]) {
      case "Bubble Sort":
        let i = bubbleSort(this.state.nums, this.state.steps);
        this.setState({
          steps: i.steps,
          textBoxes: i.textBoxes,
        });
        break;
      case "Insertion Sort":
        this.setState({
          steps: insertionSort(this.state.nums, this.state.steps),
        });
        break;
      case "Selection Sort":
        this.setState({
          steps: selectionSort(this.state.nums, this.state.steps),
        });
        break;
      case "Quick Sort":
        this.setState({
          steps: this.quickk(this.state.nums, this.state.steps),
        });
        break;
      case "Merge Sort":
        this.mergeSort(this.state.nums, this.state.steps);
        break;
      case "Radix Sort":
        this.genBucks();
        this.setState({
          steps: this.radixSort(this.state.nums, this.state.steps),
        });
        break;

      default:
        break;
    }
    // console.log("state", this.state.steps);
    document.addEventListener("keydown", this.handleKey);
  }

  genNums() {
    let nums = [21, 99, 44, 1, 37, 98, 35, 26];
    // let nums = [];
    // for (let i = 0; i < 8; i++) nums.push(Math.floor(Math.random() * 100));
    return nums;
  }

  genBars() {
    let { nums } = this.state;
    let bars = this.mainDiv.current.children;
    for (let i = 0; i < 8; i++) {
      bars[i].classList.add("Bar");
      bars[i].children[0].textContent = nums[i];
      bars[i].style.transform = `translate(${250 + (i * 64 + 10)}px)`;
      bars[i].style.backgroundColor = "#cffaff";
      bars[i].style.height = `${nums[i] * 2}px`;
      bars[i].style.width = "50px";
      if (this.props.location.pathname.split("/")[2] === "Radix Sort") {
        bars[i].classList.add("radix");
        bars[i].style.height = `20px`;
      }
    }
  }

  async wait() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
  }

  genBucks = () => {
    let bucks = this.buckets.current.children;
    for (let i = 0; i < bucks.length; i++) {
      bucks[i].style.transform = `translate(${250 + i * 64}px,320px)`;
    }
  };

  move = async (i, j) => {
    let { newNums } = this.state;
    let bars = this.mainDiv.current.children;
    bars[i].style.transform = `translate(${250 + 64 * j}px,170px)`;
    // newNums[j] = +bars[i].children[0].textContent;
    this.setState({ newNums });
  };

  moveBack = async (i, j = 0) => {
    let bars = this.mainDiv.current.children;
    bars[i].style.transform = `translate(${250 + 64 * i}px,0px)`;
  };

  correctSwap = (start, end) => {
    let { nums } = this.state;
    end++;
    let bars = this.mainDiv.current.children;
    for (let j = start; j < end; j++) {
      let ary = Array.from(bars).map((i) => {
        return +i.children[0].textContent;
      });
      this.swapNodes(ary.indexOf(nums[j]), j);
    }
  };

  mergeSort = async (nums, steps) => {
    // this.setState({ nums: [] });
    let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];
    // const mixColors = [
    //   "purple",
    //   "green",
    //   "orange",
    //   "red",
    //   "yellow",
    //   "violet",
    //   "cyan",
    //   "magenta",
    // ];
    await this.wait();
    steps.push([]);
    nums.forEach((block, i) => {
      // this.colorChange(i, mixColors[i]);
      // steps[steps.length - 1].push(["c", i, mixColors, colors[i]]);
    });
    // await this.wait();

    let merge = async (arr1, arr2) => {
      await this.wait();
      console.log(arr1[0], arr2[0]);
      await this.wait();

      let newNums = [];
      let count = nums.indexOf(arr1[0]);
      let results = [];
      let bars = this.mainDiv.current.children;
      let primary = bars[nums.indexOf(arr1[0])].style.backgroundColor;
      let i = 0;
      let j = 0;
      while (i < arr1.length && j < arr2.length) {
        if (arr2[j] > arr1[i]) {
          results.push(arr1[i]);
          this.move(nums.indexOf(arr1[i]), count);
          bars[nums.indexOf(arr1[i])].style.backgroundColor = primary;
          newNums[count] = arr1[i];
          i++;
        } else {
          results.push(arr2[j]);
          this.move(nums.indexOf(arr2[j]), count);
          bars[nums.indexOf(arr2[j])].style.backgroundColor = primary;
          newNums[count] = arr2[j];
          j++;
        }
        count++;
        await this.wait();
      }
      while (i < arr1.length) {
        results.push(arr1[i]);
        // console.log("|-", arr1[i]);
        this.move(nums.indexOf(arr1[i]), count);
        bars[nums.indexOf(arr1[i])].style.backgroundColor = primary;

        newNums[count] = arr1[i];
        i++;
        count++;
        await this.wait();
      }
      while (j < arr2.length) {
        results.push(arr2[j]);
        // console.log("|-", arr2[j]);
        this.move(nums.indexOf(arr2[j]), count);
        bars[nums.indexOf(arr2[j])].style.backgroundColor = primary;
        newNums[count] = arr2[j];
        j++;
        count++;
        await this.wait();
      }
      let start = nums.indexOf(arr1[0]);
      let end = nums.indexOf(arr2[arr2.length - 1]);
      for (let o = 0; o < newNums.length; o++)
        if (newNums[o]) nums[o] = newNums[o];
      this.setState({ nums });
      this.correctSwap(start, end);
      for (let n = 0; n < newNums.length; n++) if (newNums[n]) this.moveBack(n);
      await this.wait();
      return results;
    };

    let myMerge = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }
      let mid = Math.floor(arr.length / 2);
      let left = myMerge(arr.slice(0, mid));
      let right = myMerge(arr.slice(mid));
      return merge(left, right);
    };
    // console.log(nums);
    myMerge(nums);
  };

  quick = async (nums, steps) => {
    let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];

    let pivot = async (nums, start = 0, end = nums.length - 1) => {
      let pivot = nums[start];
      let swapIdx = start;
      this.colorChange(start, "orange");
      await this.wait();
      for (let i = start + 1; i <= end; i++) {
        this.colorChange(i, "red");
        await this.wait();

        if (pivot > nums[i]) {
          swapIdx++;
          this.swap(i, swapIdx);
          await this.wait();
          this.colorChange(swapIdx, "green");
        } else {
          this.colorChange(i, "purple");
        }
      }

      await this.wait();
      this.swap(start, swapIdx);
      await this.wait();
      colors = Array.from(this.mainDiv.current.children).map(
        (i) => i.style.backgroundColor
      );
      for (let i = start; i < end + 1; i++)
        if (colors[i] !== "orange") {
          this.colorChange(i, "#cffaff");
        }
      colors = Array.from(this.mainDiv.current.children).map(
        (i) => i.style.backgroundColor
      );

      this.colorChange(swapIdx, "orange");
      return swapIdx;
    };

    let quicks = async (nums, left = 0, right = nums.length - 1) => {
      let temp = nums.slice(left, right + 1);
      if (temp.length === 1) {
        nums.forEach((i, j) => {
          if (i === temp[0]) {
            // steps.push(["c", j, "orange", colors[j]]);
            // colors[j] = "orange";
            this.colorChange(j, "orange");
          }
        });
      }
      await this.wait();
      if (left < right) {
        let pivotIndex = await pivot(nums, left, right); //3
        await quicks(nums, left, pivotIndex - 1);
        await quicks(nums, pivotIndex + 1, right);
      }
      return nums;
    };
    quicks(nums);
  };

  quickk = (nums, steps) => {
    let swap = (arr, idx1, idx2) => {
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    };
    let colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];

    let pivot = (nums, start = 0, end = nums.length - 1) => {
      let pivot = nums[start];
      let swapIdx = start;
      // this.colorChange(start, "orange");
      steps.push(["c", start, "orange"]);
      colors[start] = "orange";
      // await this.wait();
      for (let i = start + 1; i <= end; i++) {
        steps.push(["c", i, "red"]);
        colors[i] = "red";
        // this.colorChange(i, "red");
        // await this.wait();

        if (pivot > nums[i]) {
          swapIdx++;
          steps.push(["s", i, swapIdx]);
          swap(nums, i, swapIdx);

          // this.swap(i, swapIdx);
          // await this.wait();
          // this.colorChange(swapIdx, "green");

          // console.log(`${pivot} > ${nums[i]}`);
          // console.log("turning green : " + nums[i]);

          steps.push(["c", swapIdx, "green"]);
          colors[swapIdx] = "green";
        } else {
          // this.colorChange(i, "purple");
          steps.push(["c", i, "purple"]);
          colors[i] = "purple";
        }
      }

      // await this.wait();
      // this.swap(start, swapIdx);
      steps.push(["s", start, swapIdx]);
      swap(nums, start, swapIdx);

      // await this.wait();

      // colors = Array.from(this.mainDiv.current.children).map(
      //   (i) => i.style.backgroundColor
      // );

      for (let i = start; i < end + 1; i++)
        if (colors[i] !== "orange") {
          // this.colorChange(i, "#cffaff");
          steps.push(["c", i, "#cffaff"]);
          colors[i] = "#cffaff";
        }
      // colors = Array.from(this.mainDiv.current.children).map(
      //   (i) => i.style.backgroundColor
      // );

      // this.colorChange(swapIdx, "orange");
      steps.push(["c", swapIdx, "orange"]);
      colors[swapIdx] = "orange";

      console.log(nums + "\n-------------");
      return swapIdx;
    };

    let quicks = (nums, left = 0, right = nums.length - 1) => {
      let temp = nums.slice(left, right + 1);
      if (temp.length === 1) {
        nums.forEach((i, j) => {
          if (i === temp[0]) {
            // colors[j] = "orange";
            // this.colorChange(j, "orange");
            steps.push(["c", j, "orange"]);
            colors[j] = "orange";
          }
        });
      }
      // await this.wait();
      if (left < right) {
        let pivotIndex = pivot(nums, left, right); //3
        quicks(nums, left, pivotIndex - 1);
        quicks(nums, pivotIndex + 1, right);
      }
      return nums;
    };
    quicks(nums);
    console.log(steps);
    return steps;
  };

  async stepBack() {
    let { steps, stepNum } = this.state;
    let currentStep = steps[stepNum - 1];
    if (stepNum === 0) {
      return;
    }
    if (Array.isArray(currentStep[0])) {
      for (let j = 0; j < currentStep.length; j++) {
        console.log(currentStep[j]);
        if (currentStep[j][0] === "c")
          await this.colorChange(currentStep[j][1], currentStep[j][3]);
        else if (currentStep[j][0] === "s")
          this.swap(currentStep[j][1], currentStep[j][2]);
      }
    }
    if (currentStep[0] === "c")
      await this.colorChange(currentStep[1], currentStep[3]);
    else if (currentStep[0] === "s") this.swap(currentStep[1], currentStep[2]);

    // await this.wait();
    stepNum--;
    this.setState({ stepNum });
  }

  async stepForward() {
    let { steps, stepNum } = this.state;
    // this.setState({ text: textBoxes[stepNum] });
    let currentStep = steps[stepNum];
    if (stepNum >= steps.length) {
      return;
    }
    console.log(currentStep);
    if (Array.isArray(currentStep[0])) {
      for (let j = 0; j < currentStep.length; j++) {
        if (currentStep[j][0] === "c")
          this.colorChange(currentStep[j][1], currentStep[j][2]);
        else if (currentStep[j][0] === "s") {
          await this.swap(currentStep[j][1], currentStep[j][2]);
        } else if (currentStep[j][0] === "m") {
          await this.move(currentStep[j][1], currentStep[j][2]);
        } else if (currentStep[j][0] === "b") {
          await this.moveBack(currentStep[j][1], currentStep[j][2]);
        } else if (currentStep[j][0] === "k") {
          await this.correctSwap(currentStep[j][1], currentStep[j][2]);
        } else if (currentStep[j][0] === "r") {
          await this.radixMove(
            currentStep[j][1],
            currentStep[j][2],
            currentStep[j][3]
          );
        } else if (currentStep[j][0] === "p") {
          await this.pickup(currentStep[j][1], currentStep[j][2]);
        }
      }
    }
    if (currentStep[0] === "c")
      await this.colorChange(currentStep[1], currentStep[2]);
    else if (currentStep[0] === "s")
      await this.swap(currentStep[1], currentStep[2]);
    else if (currentStep[0] === "m")
      await this.move(currentStep[1], currentStep[2]);
    else if (currentStep[0] === "b")
      await this.moveBack(currentStep[1], currentStep[2]);
    else if (currentStep[0] === "k")
      await this.correctSwap(currentStep[1], currentStep[2]);
    else if (currentStep[0] === "r") {
      await this.radixMove(currentStep[1], currentStep[2], currentStep[3]);
    } else if (currentStep[0] === "p") {
      await this.pickup(currentStep[1], currentStep[2]);
    }

    // await this.wait();
    // console.log(steps[stepNum]);
    stepNum++;
    this.setState({ stepNum });
  }

  async spaceBar() {
    let { steps, textBoxes, stepNum, delay } = this.state;
    this.setState({ mode: "spacebar", text: textBoxes[stepNum] });
    for (let i = stepNum; i < steps.length; i++) {
      if (this.state.mode === "key") {
        break;
      }
      let blocks = this.mainDiv.current.children;
      for (let j = 0; j < 8; j++) {
        blocks[j].style["transition-duration"] = delay;
      }

      await this.stepForward();
      stepNum++;
      this.setState({ stepNum });
      await this.wait();
      // console.log(steps[stepNum]);
    }
  }

  swapNodes(i, j) {
    if (i === j) return;

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

      // temp = nums[i];
      // nums[i] = nums[j];
      // nums[j] = temp;

      temp = bars[i].style.transform;
      bars[i].style.transform = bars[j].style.transform;
      bars[j].style.transform = temp;

      // window.requestAnimationFrame(() => {
      setTimeout(() => {
        this.swapNodes(j, i);
        resolve();
      }, 500);
    });
    // });
  }

  colorChange(i, color) {
    let bars = this.mainDiv.current.children;
    bars[i].style.backgroundColor = color;
  }

  handleKey = (e) => {
    if (e.keyCode === 39) {
      this.setState({ mode: "key" });
      this.stepForward();
    } else if (e.keyCode === 37) {
      this.setState({ mode: "key" });
      this.stepBack();
    } else if (e.keyCode === 32) {
      if (this.state.mode === "spacebar") return this.setState({ mode: "key" });
      else this.setState({ mode: "spacebar" });
      this.spaceBar();
      // this.space();
    }
  };

  space = (e) => {
    let { steps } = this.state;
    if (this.state.mode === "spacebar") return this.setState({ mode: "key" });
    else this.setState({ mode: "spacebar" });
    steps.push(["m", 0, 1]);
    this.setState({ steps });
    // this.stepForward();
  };

  textBoxes = () => {
    // let currentElement, nextElement, nextWord, currWord;
    // let str = [
    //   `We compare ${currentElement} (${currWord} element) & ${nextElement} (${nextWord} element)`,
    //   `As ${currentElement} (${currWord} element) is greater than ${nextElement} (${nextWord} element), We swap to move the greater number (${currentElement}) ahead`,
    //   `As ${currentElement} (${currWord} element) is smaller than ${nextElement} (${nextWord} element), to keep the greater number (${currentElement}) ahead, we dont swap`,
    // ];
    // return str;
    // this.setState({s})
  };

  handleChange(evt) {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let { nums, numbers } = this.state;
    nums = numbers.split(",");
    nums.map((i) => +i);
    // this.setState({ nums });
    // this.genBars();
    // console.log(nums);
  }

  radixMove = (val, digit, bucketLength) => {
    let bars = this.mainDiv.current.children;
    let idx;
    Array.from(bars).forEach((i, j) => {
      if (+i.textContent === val) idx = j;
    });
    bars[idx].style.transform = `translate( ${252 + 64 * digit}px,${
      205 - bucketLength * 35
    }px)`;
  };

  pickup = (val, i) => {
    let bars = this.mainDiv.current.children;
    let barArray = Array.from(bars).map((i) => +i.textContent);
    let idx = barArray.indexOf(val);
    bars[idx].style.transform = `translate(${250 + (i * 64 + 10)}px)`;
    this.swapNodes(i, idx);
  };

  getDigit(num, digit) {
    let returnDigit = +num.toString().split("").reverse()[digit];
    if (returnDigit) return returnDigit;
    else return 0;
  }

  radixSort = (nums, steps) => {
    const buckets = [[], [], [], [], [], [], [], [], [], []];
    let digit;
    let digitPlace = 0;
    for (let digitPlace = 0; digitPlace < 2; digitPlace++) {
      for (let i = 0; i < nums.length; i++) {
        digit = this.getDigit(nums[i], digitPlace);
        steps.push(["r", nums[i], digit, buckets[digit].length]);
        buckets[digit].push(nums[i]);
      }

      let numbs = [];
      for (let i = 0; i < 10; i++) {
        let l = buckets[i].length;
        for (let j = 0; j < l; j++) {
          numbs.push(buckets[i].shift());
        }
      }

      for (let i = 0; i < numbs.length; i++) {
        steps.push(["p", numbs[i], i]);
      }
    }
    return steps;

    // for (let i = 0; i < nums.length; i++) {
    //   steps.push(["r", nums[i], 0]);
    // }

    // let { buckets } = this.state;
    // let numbs = [];
    // for (let i = 0; i < 10; i++) {
    //   let l = buckets[i].length;
    //   for (let j = 0; j < l; j++) {
    //     numbs.push(buckets[i].shift());
    //   }
    // }

    // steps.push(["p", numbs]);

    // for (let k = 0; k < 2; k++) {
    //   for (let i = 0; i < nums.length; i++) {
    //     steps.push(["r", nums[i], k]);
    //   }
    //   let { buckets } = this.state;
    //   let numbs = [];
    //   for (let i = 0; i < 10; i++) {
    //     let l = buckets[i].length;
    //     for (let j = 0; j < l; j++) {
    //       numbs.push(buckets[i].shift());
    //     }
    //   }

    //   steps.push(["p", numbs]);
    //   nums = numbs;
    // }
    // return steps;

    // for (let k = 0; k < 2; k++) {
    //   await this.wait();
    //   for (let i = 0; i < nums.length; i++) {
    //     await this.radixMove(nums[i], k);
    //     await this.wait();
    //   }
    //   let { buckets } = this.state;
    //   let numbs = [];
    //   for (let i = 0; i < 10; i++) {
    //     let l = buckets[i].length;
    //     for (let j = 0; j < l; j++) {
    //       numbs.push(buckets[i].shift());
    //     }
    //   }

    //   await this.pickup(numbs);
    //   nums = numbs;
    // }
  };

  render() {
    let bucks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let { nums, text } = this.state;
    // console.log(buckets);
    return (
      <div className="bar-main">
        {/* <button style={{ transform: "translate(80px)" }}>Random</button>
        <button style={{ transform: "translate(150px)" }}>Nearly Sorted</button>
        <button style={{ transform: "translate(250px)" }}>Sorted</button>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="numbers"
            value={this.state.numbers}
            onChange={this.handleChange}
          />
          <button style={{ transform: "translate(150px)" }}>go</button>
        </form>
        <button style={{ transform: "translate(380px)" }}>{"<<"}</button>
        <button style={{ transform: "translate(420px)" }}>{"<>"}</button>
        <button style={{ transform: "translate(460px)" }}>{">>"}</button> */}
        <div className="main-div" ref={this.mainDiv}>
          {nums.map((i, j) => (
            <div key={j}>
              <label></label>
            </div>
          ))}
        </div>
        <div className="buckets" ref={this.buckets}>
          {bucks.map((i) => (
            <div key={i} className="bucket">
              <label className="bucket__id">{i}</label>
            </div>
          ))}
          ;
        </div>
        <button onClick={this.space}>Move</button>
        <div className="tbox">{text}</div>
        {/* <div
          className="bc"
          style={{
            height: "10px",
            width: "10px",
            transform: " translate(10px, 1000px)",
          }}
        ></div> */}
      </div>
    );
  }
}

export default withRouter(Visualizer);

// mergeSort = async (nums, steps) => {
//   // this.setState({ nums: [] });
//   const mixColors = [
//     "purple",
//     "green",
//     "orange",
//     "red",
//     "yellow",
//     "violet",
//     "cyan",
//     "magenta",
//   ];
//   await this.wait();
//   nums.forEach((block, i) => {
//     this.colorChange(i, mixColors[i]);
//   });
//   await this.wait();

//   let merge = async (arr1, arr2) => {
//     let newNums = [];
//     let count = nums.indexOf(arr1[0]);
//     let results = [];
//     let bars = this.mainDiv.current.children;
//     let primary = bars[nums.indexOf(arr1[0])].style.backgroundColor;
//     let i = 0;
//     let j = 0;
//     while (i < arr1.length && j < arr2.length) {
//       if (arr2[j] > arr1[i]) {
//         results.push(arr1[i]);
//         this.move(nums.indexOf(arr1[i]), count);
//         bars[nums.indexOf(arr1[i])].style.backgroundColor = primary;
//         newNums[count] = arr1[i];
//         i++;
//       } else {
//         results.push(arr2[j]);
//         this.move(nums.indexOf(arr2[j]), count);
//         bars[nums.indexOf(arr2[j])].style.backgroundColor = primary;
//         newNums[count] = arr2[j];
//         j++;
//       }
//       count++;
//       await this.wait();
//     }
//     while (i < arr1.length) {
//       results.push(arr1[i]);
//       // console.log("|-", arr1[i]);
//       this.move(nums.indexOf(arr1[i]), count);
//       bars[nums.indexOf(arr1[i])].style.backgroundColor = primary;

//       newNums[count] = arr1[i];
//       i++;
//       count++;
//       await this.wait();
//     }
//     while (j < arr2.length) {
//       results.push(arr2[j]);
//       // console.log("|-", arr2[j]);
//       this.move(nums.indexOf(arr2[j]), count);
//       bars[nums.indexOf(arr2[j])].style.backgroundColor = primary;
//       newNums[count] = arr2[j];
//       j++;
//       count++;
//       await this.wait();
//     }
//     let start = nums.indexOf(arr1[0]);
//     let end = nums.indexOf(arr2[arr2.length - 1]);
//     for (let o = 0; o < newNums.length; o++)
//       if (newNums[o]) nums[o] = newNums[o];
//     this.setState({ nums });
//     this.correctSwap(start, end);
//     for (let n = 0; n < newNums.length; n++) if (newNums[n]) this.moveBack(n);
//     await this.wait();
//     return results;
//   };

//   let myMerge = async (nums) => {
//     let merged = nums.map((i) => [i]);
//     let i = 0;
//     let j = 0;
//     let k = j + 1;
//     let temp;
//     while (merged.length !== 1) {
//       if (i < merged.length - 1) {
//         if (merged[i].length === merged[i + 1].length) {
//           temp = await merge(merged[i], merged[i + 1]);
//           merged[i] = temp;
//           merged.splice(i + 1, 1);
//           i = 0;
//         } else {
//           i++;
//         }
//       } else {
//         temp = await merge(merged[i - 1], merged[i]);
//         merged[i - 1] = temp;
//         merged.splice(i, 1);
//         i = 0;
//       }
//       j++;
//     }
//   };
//   // console.log(nums);
//   myMerge(nums);
// };

// radixSort = async (nums, steps) => {
//   await this.wait();
//   for (let i = 0; i < nums.length; i++) {
//     await this.radixMove(nums[i], 0);
//     await this.wait();
//   }
//   let { buckets } = this.state;
//   let numbs = [];
//   for (let i = 0; i < 10; i++) {
//     let l = buckets[i].length;
//     for (let j = 0; j < l; j++) {
//       numbs.push(buckets[i].shift());
//     }
//   }
//   await this.pickup(numbs);
//   await this.wait();
//   for (let i = 0; i < nums.length; i++) {
//     await this.radixMove(nums[i], 1);
//     await this.wait();
//   }
//   buckets = this.state.buckets;
//   numbs = [];
//   buckets.map((d) => d.map((i) => numbs.push(i)));
//   this.pickup(numbs);
// };
