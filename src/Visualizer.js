import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./css/viz.css";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  radixSort,
  quickSort,
  // mergeSort,
} from "./genSteps";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: this.genNums(),
      sortMode: "Bubble Sort",
      stepNum: 0,
      steps: [],
      mode: "key",
      delay: "0.5s",
      swapped: false,
      numbers: [],
      newNums: [],
      buckets: [[], [], [], [], [], [], [], [], [], []],
      textBoxes: [],
      isCreateOn:0
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
    this.setState({newNums : this.state.nums})
    // this.handleSortMode();
    this.stepsGen("Bubble Sort");
    document.addEventListener("keydown", this.handleKey);
    document.querySelectorAll('button')[0].addEventListener("mousedown", this.handleClick);
    document.querySelectorAll('button')[1].addEventListener("mousedown", this.handleClick);
    document.querySelectorAll('button')[1].addEventListener("mousedown", this.handleClick);
  }

  stepsGen = (sortMode) => {
    this.genBars();
    this.genBucks();

    let nums = this.state.nums.map(i => i);
    let isRadix = sortMode === "Radix Sort" ? 1 : 0; 
    for(let i = 0;i < 10;i++){
      this.buckets.current.children[i].style.opacity = isRadix;
    }
    
    switch (sortMode) {
      case "Bubble Sort":
        let i = bubbleSort(nums, []);
        this.setState({
          steps: i.steps,
          textBoxes: i.textBoxes,
        });
        break;
      case "Insertion Sort":
        this.setState({
          steps: insertionSort(nums, []),
        });
        break;
      case "Selection Sort":
        this.setState({
          steps: selectionSort(nums, this.state.steps),
        });
        break;
      case "Quick Sort":
        this.setState({
          steps: quickSort(nums, this.state.steps),
        });
        break;
      case "Merge Sort":
        this.setState({
          steps: this.mergeSortt(nums, this.state.steps),
        });
        break;
      case "Radix Sort":
        this.setState({
          steps: radixSort(nums, this.state.steps),
        });
        break;
      
      case "Binary Search":
        this.setState({
          steps : this.binarySearch(91)
        })
        break;

      case "Linear Search":
        this.setState({
          steps : this.linearSearch(91)
        })
        break;

      default:
        break;
    }
  }

  genNums() {
    let nums = [31, 44, 43, 37, 98, 77, 26];
    // let nums = [12, 19, 31, 45, 66, 91, 112, 135]
    // let nums = [];
    // for (let i = 0; i < 8; i++) nums.push(Math.floor(Math.random() * 100));
    return nums;
  }

  genBars() {
    let { nums, sortMode } = this.state;
    let bars = this.mainDiv.current.children;
    for (let i = 0; i < nums.length; i++) {
      bars[i].classList.add("Bar");
      bars[i].children[0].textContent = nums[i];
      bars[i].style.transform = `translate(${250 + (i * 64 + 10)}px)`;
      bars[i].style.backgroundColor = "#cffaff";
      bars[i].style.height = `${nums[i] * 2}px`;
      bars[i].style.width = "50px";
      if (sortMode === "Radix Sort") {
        bars[i].classList.add("radix");
        bars[i].style.height = `20px`;
        this.genBucks();
      }else{
        bars[i].classList.remove("radix");
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
      bucks[i].style.transform = `translate(${250 + i * 64}px,240px)`;
    }
  };

  move = async (i, j) => {
    // let { newNums } = this.state;
    let bars = this.mainDiv.current.children;
    bars[i].style.transform = `translate(${250 + 64 * j}px,170px)`;
    // newNums[j] = +bars[i].children[0].textContent;
    // this.setState({ newNums });
  };

  moveBack = async (i, j) => {
    let bars = this.mainDiv.current.children;
    let barArray = Array.from(bars).map((i) => +i.textContent);
    let idx = barArray.indexOf(j);
    bars[idx].style.transform = `translate(${250 + 64 * i}px,0px)`;
  };

  correctSwap = (arr, start, end) => {
    let nums = arr;
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

    const mixColors = [
      "purple",
      "green",
      "orange",
      "red",
      "yellow",
      "violet",
      "cyan",
      "magenta",
    ];

    await this.wait();

    steps.push([]);

    nums.forEach((block, i) => {
      this.colorChange(i, mixColors[i]);
      // steps[steps.length - 1].push(["c", i, mixColors, colors[i]]);
    });
    await this.wait();

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
    myMerge(nums);
  };

  mergeSortt = (nums, steps) => {
    const colors = ["#cffaff", "#cffaff", "#cffaff", "#cffaff", "#cffaff"];
    const mixColors = [
      "purple",
      "green",
      "orange",
      "red",
      "yellow",
      "violet",
      "cyan",
      "magenta",
    ];
    // await this.wait();
    nums.forEach((block, i) => {
      // this.colorChange(i, mixColors[i]);
      steps.push(["c", i, mixColors[i]]);
      colors[i] = mixColors[i];
    });
    // await this.wait();

    let merge = async (arr1, arr2) => {
      let newNums = [];
      let count = nums.indexOf(arr1[0]);
      let results = [];
      // let bars = this.mainDiv.current.children;
      // let primary = bars[nums.indexOf(arr1[0])].style.backgroundColor;
      let primary = colors[nums.indexOf(arr1[0])];
      let i = 0;
      let j = 0;

      while (i < arr1.length && j < arr2.length) {
        if (arr2[j] > arr1[i]) {
          results.push(arr1[i]);
          // this.move(nums.indexOf(arr1[i]), count);
          // bars[nums.indexOf(arr1[i])].style.backgroundColor = primary;
          steps.push(["m", nums.indexOf(arr1[i]), count]);
          steps.push(["c", nums.indexOf(arr1[i]), primary]);
          colors[nums.indexOf(arr1[i])] = primary;
          newNums[count] = arr1[i];
          i++;
        } else {
          results.push(arr2[j]);
          // this.move(nums.indexOf(arr2[j]), count);
          // bars[nums.indexOf(arr2[j])].style.backgroundColor = primary;
          steps.push(["m", nums.indexOf(arr2[j]), count]);
          steps.push(["c", nums.indexOf(arr2[j]), primary]);
          colors[nums.indexOf(arr2[j])] = primary;
          newNums[count] = arr2[j];
          j++;
        }
        count++;
        // await this.wait();
      }
      while (i < arr1.length) {
        results.push(arr1[i]);
        // this.move(nums.indexOf(arr1[i]), count);
        // bars[nums.indexOf(arr1[i])].style.backgroundColor = primary;
        steps.push(["m", nums.indexOf(arr1[i]), count]);
        steps.push(["c", nums.indexOf(arr1[i]), primary]);
        colors[nums.indexOf(arr1[i])] = primary;
        newNums[count] = arr1[i];
        i++;
        count++;
        // await this.wait();
      }
      while (j < arr2.length) {
        results.push(arr2[j]);
        // this.move(nums.indexOf(arr2[j]), count);
        // bars[nums.indexOf(arr2[j])].style.backgroundColor = primary;
        steps.push(["m", nums.indexOf(arr2[j]), count]);
        steps.push(["c", nums.indexOf(arr2[j]), primary]);
        colors[nums.indexOf(arr2[j])] = primary;
        newNums[count] = arr2[j];
        j++;
        count++;
        // await this.wait();
      }

      let start = nums.indexOf(arr1[0]);
      let end = nums.indexOf(arr2[arr2.length - 1]);

      let newList = nums.map((i) => i);

      for (let o = 0; o < newNums.length; o++)
        if (newNums[o]) newList[o] = newNums[o];

      // for (let n = 0; n < newNums.length; n++) if (newNums[n]) this.moveBack(n);
      for (let n = 0; n < newNums.length; n++)
        if (newNums[n]) steps.push(["b", n, newNums[n]]);

      // this.correctSwap(start, end);
      steps.push(["k", newList, start, end]);
      // await this.wait();

      console.log(newList);
      return results;
    };

    let myMerge = async (nums) => {
      let merged = nums.map((num) => [num]);
      let i = 0;
      let j = 0;
      ////// let k = j + 1;
      let temp;
      while (merged.length !== 1) {
        if (i < merged.length - 1) {
          if (merged[i].length === merged[i + 1].length) {
            temp = await merge(merged[i], merged[i + 1]);
            merged[i] = temp;
            merged.splice(i + 1, 1);
            i = 0;
          } else {
            i++;
          }
        } else {
          temp = await merge(merged[i - 1], merged[i]);
          merged[i - 1] = temp;
          merged.splice(i, 1);
          i = 0;
        }
        j++;
      }
    };
    myMerge(nums);
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
        }else if(currentStep[j][0] === "b"){
          for(let i =0; i< 10; i++){
            if(currentStep[j][1])
              this.buckets.current.children[i].opacity = 1
            else
              this.buckets.current.children[i].opacity = 0

          }
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
      await this.correctSwap(currentStep[1], currentStep[2], currentStep[3]);
    else if (currentStep[0] === "r") {
      await this.radixMove(currentStep[1], currentStep[2], currentStep[3]);
    } else if (currentStep[0] === "p") {
      await this.pickup(currentStep[1], currentStep[2]);
    }
    // console.log(steps[stepNum]);
    stepNum++;
    this.setState({ stepNum });
  }

  async spaceBar() {
    let { steps,nums, textBoxes, stepNum, delay } = this.state;
    this.setState({ mode: "spacebar", text: textBoxes[stepNum] });
    for (let i = stepNum; i < steps.length; i++) {
      if (this.state.mode === "key") {
        break;
      }
      let blocks = this.mainDiv.current.children;
      for (let j = 0; j < nums.length; j++) {
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
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.path[0].textContent);
    if (e.path[0].textContent === "Play") {
      if (this.state.mode === "spacebar") return this.setState({ mode: "key" });
      else this.setState({ mode: "spacebar" });
      this.spaceBar();
    } else if (e.path[0].textContent === "Rev") {
    }else if(e.path[0].textContent === "Create"){
      console.log(this.state.newNums);
    }
      
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
  };

  getDigit(num, digit) {
    let returnDigit = +num.toString().split("").reverse()[digit];
    if (returnDigit) return returnDigit;
    else return 0;
  }

  radixSort = (nums, steps) => {
    const buckets = [[], [], [], [], [], [], [], [], [], []];
    let digit;
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

      nums = numbs;
    }
    return steps;
  };

  binarySearch = (x) => {
    let {nums,steps} = this.state
    let start=0, end=nums.length-1;

    steps.push([]);
    nums.forEach((i,j) => {
      // this.colorChange(j,"orange")
      steps[0].push(["c",j,"orange"]);
    })
    // await this.wait();
    while (start<=end){
      let mid=Math.floor((start + end)/2);
      // this.colorChange(mid,"blue");
      steps.push(["c",mid,"blue"]);
      // await this.wait();
      if (nums[mid]===x){
        // this.colorChange(mid,"green");
        steps.push(["c",mid,"green"]);
        console.log("steps => ")
        console.log(steps);
        return steps;
      }
      else if (nums[mid] < x) {
        steps.push([]);
        for(let i = 0;i < mid;i++)
          // this.colorChange(i,"#cffaff");
          steps[steps.length-1].push(["c",i,"#cffaff"]);
        // await this.wait();
        start = mid + 1;
      }
      else{
        steps.push([]);
        for(let i = mid;i < nums.length;i++)
          // this.colorChange(i,"#cffaff");
          steps[steps.length-1].push(["c",i,"#cffaff"]);
        // await this.wait();
        end = mid - 1;
      }
      steps.push(["c",mid,"#cffaff"]);
      // await this.wait();
    }
    // this.setState({steps});
    return steps;
  }

  linearSearch = (x) => {
    let {nums, steps} = this.state;

    for(let i = 0; i < nums.length; i++){
      steps.push(["c",i,"blue"]);
      if(nums[i] === x){
        steps.push(["c",i,"green"]);
        return steps;
      }else{
        steps.push(["c",i,"orange"]);
      }
    }
    return steps;
  }

  handleSortMode = (e) => {
    e.preventDefault();
    this.setState({sortMode : e.target.value, steps : [], stepNum : 0}, () => {
      this.stepsGen(e.target.value);
    })
  }

  handleNew = (e) => {
    e.preventDefault();
    let nums = this.state.newNums.split(",").map(i => +i);
    this.setState({nums,steps : [], stepNum : 0}, () => {
      this.stepsGen(this.state.sortMode);
    });
  }

  sortedButton = (e) => {
    e.preventDefault()
    let nums = [];
    while(nums.length < this.state.nums.length){
      var r = Math.floor(Math.random() * 90) + 10;
      if(nums.indexOf(r) === -1) nums.push(r);
    }
    nums.sort((a, b) => a - b);
    this.setState({nums,steps : [], stepNum : 0}, () => {
      // this.genBars();
      this.stepsGen(this.state.sortMode);
    });
  }

  randomButton = (e) => {
    e.preventDefault();
    let nums = [];
    while(nums.length < this.state.nums.length){
        var r = Math.floor(Math.random() * 90) + 10;
        if(nums.indexOf(r) === -1) nums.push(r);
    }
    this.setState({nums,steps : [], stepNum : 0}, () => {
      this.stepsGen(this.state.sortMode);
      // this.genBars();
    });
  }

  createButton = (e) => {
    e.preventDefault();
    let {isCreateOn} = this.state;
    isCreateOn = isCreateOn ? 0 : 1;
    this.setState({isCreateOn});
  }

  render() {
    let a;
    switch(this.state.sortMode){
      case "Bubble Sort":
        a = <p>Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent 
        elements and swaps them if they are in  the wrong order. The pass through the list is repeated until the list is sorted. The pass through the list 
        is repeated until the list is sorted.The primary advantage of the bubble sort is that it is popular and easy to implement.<br></br><br></br>
        One of the main advantages of a bubble sort is that it is a very simple algorithm to describe to a computer. There is only really one task to 
           perform (compare two values and, if needed, swap them). This makes for a very small and simple computer program.It uses less storage space. 
           Bubble sort can be beneficial to sort the unsorted elements in a specific order. It can be used to sort the students on basis of their 
           height in a line.<br></br><br></br>

           Bubble Sort is an easy-to-implement, stable sorting algorithm with a time complexity of O(n²) in the average and worst cases – and O(n) 
           in the best case.<br></br></p>
          
       
        break;

        case "Selection Sort":
        a = <p>Selection sort is a simple sorting algorithm. The smallest element is selected from the unsorted array and swapped with the leftmost 
            element, and that element becomes a part of the sorted array. This process continues moving unsorted array boundary by one element to the 
            right. Selection sort almost always outperforms bubble sort. Can be useful when memory write is a costly operation.<br></br><br></br>

           Selection sort performs very well on small lists. It is an in-place algorithm. It does not require a lot of space for sorting.
            Only one extra space is required for holding the temporal variable.
            It performs well on items that have already been sorted.<br></br><br></br>

          It has an O(n²) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort.
            Selection sort can also be used on list structures that make add and remove efficient, such as a linked list<br></br>

           </p>
        break;
          
        case "Insertion Sort":
        a = <p>Insertion sort has a fast best-case running time and is a good sorting algorithm to use if the input list is already mostly sorted. 
            Insertion sort is a sorting algorithm in which the elements are transferred one at a time to the right position. In other words, 
            an insertion sort helps in building the final sorted list, one item at a time, with the movement of higher-ranked elements. 
            An insertion sort has the benefits of simplicity and low overhead.<br></br><br></br>

          Insertion sort is used when number of elements is small. It can also be useful when input array is almost 
            sorted, only few elements are misplaced in complete big array. Insertion sort is the pure simplicity of the algorithm. in these sort 
            relative order of items with equal keys does not change. it has ability to sort a list as it is being received.
             <br></br><br></br>

          So insertion sort, on average, takes O {'( n 2 ) O(n^2) O(n2)'} time. Insertion sort has a fast best-case running time and is a good 
            sorting algorithm to use if the input list is already mostly sorted.<br></br></p>
        break;

        case "Quick Sort":
        a = <p>Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements 
            into two sub-arrays,  according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.
            This is because of its significant advantage in terms of efficiency because it is able to deal well with a huge list of items. 
            Because it sorts in place, no additional storage is required as well.<br></br><br></br>
           

          Quick sort is in-place since it uses only a small auxiliary stack. It has an extremely short inner loop.This algorithm has been subjected 
            to a thorough mathematical analysis, a very precise statement can be made about performance issues.It is used in operational research and 
            event-driven simulation. Numerical computations and in scientific research, for accuracy in calculations most of the efficiently
             developed algorithm uses quick sort is used for sorting.<br></br><br></br>


          To sort an array of n distinct elements, quicksort takes O(n log n) time in expectation, averaged over all n!
             permutations of n elements with equal probability.<br></br>

           </p>
        break;

        case "Radix Sort":
        a = <p>Radix sort is an integer sorting algorithm that sorts data with integer keys by grouping the keys by individual digits that share the
             same significant position and value (place value) and Then, sort the elements according to their increasing/decreasing order.
              Radix sort uses counting sort as a subroutine to sort an array of numbers. Radix sort performs better than quick sort when we 
              have log n bits for every digit. But radix sort takes more space as compared to quick sort.<br></br><br></br>

           radix sort is Fast when the keys are short i.e. when the range of the array elements is less. Radix Sort is stable sort as relative order 
             of elements with equal values is maintained. In computer science, radix sort is a non-comparative sorting algorithm. 
             Radix sort can be applied to data that can be sorted lexicographically, be they integers, words, punch cards, playing cards, or the mail.
             <br></br><br></br>Radix Sort takes O(d*(n+b)) time where b is the base for representing numbers, for example, for the decimal system, b is 10.
            If k is the maximum possible value, then d would be O(logb(k)). So overall time complexity is O((n+b) * logb(k)).<br></br>
</p>
    }
    let bucks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let { nums, text, isCreateOn } = this.state;
    isCreateOn = +isCreateOn
    console.log(isCreateOn);
    return (
      <div className="bar-main">
        <h1>{this.state.sortMode}</h1>
        <select onChange={this.handleSortMode}>
          <option>Bubble Sort</option>
          <option>Selection Sort</option>
          <option>Radix Sort</option>
          <option>Insertion Sort</option>
          <option>Quick Sort</option>
        </select>
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
        </div>
        <button className="btn" style={{ transform: "translate(10px,-17px)" }}>Play</button>
        <form onSubmit={this.handleNew}>
        <input
          style={{transform : "translate(265px,357px)", opacity:isCreateOn}}
          type="text"
          name="newNums"
          className="txt"
          value={this.state.newNums}
          onChange={this.handleChange}
          ></input>
          <button className="btn" style={{transform : "translate(270px,-50px)", opacity:isCreateOn }}>Go</button>
          <button onClick={this.createButton} className="btn" style={{transform : "translate(-293px,-50px)"}}>Create</button>
          <button onClick={this.randomButton} className="btn" style={{transform : "translate(-210px,-50px)", opacity:isCreateOn }}>Random</button>
          <button onClick={this.sortedButton} className="btn" style={{transform : "translate(-125px,-50px)", opacity:isCreateOn }}>Sorted</button>
        </form>
        <div style={{transform: "translate(900px,-100px)"}} className="theory">
          <h3>{this.state.sortMode}</h3>
          {a}
        </div>
      </div>
    );
  }
}

export default withRouter(Visualizer);