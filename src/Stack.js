import React, { Component } from "react";

export default class Stack extends Component {
  constructor(props) {
    super(props);
    this.demoDiv = React.createRef();
    this.mainDiv = React.createRef();
    this.state = {
      nums: [1, 2, 3, 4, 5],
      num: "",
      pos: "",
      del: "",
      searchVal: "",
      stepNum: 0,
      steps: [],
      newVals: [],
      mode: "spacebar",
    };
  }

  componentDidMount() {
    this.genList();
    document.addEventListener("keydown", this.handleKey);
    document.querySelector("#play-btn").addEventListener("mousedown", this.handleClick);
  }

  async wait() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
  }

  genNode = (x, y, value, i = -1) => {
    let mainDiv = this.mainDiv.current;
    let demoDiv = this.demoDiv.current;

    let newNode = demoDiv.children[0].cloneNode(true);
    newNode.style.opacity = 1;
    newNode.style.transform = `translate(${x}px,${y}px)`;
    newNode.children[0].textContent = value;

    if (i === -1) mainDiv.append(newNode);
    else mainDiv.insertBefore(newNode, mainDiv.children[i * 2]);
  };

  genLine = (i, k = -1) => {
    let mainDiv = this.mainDiv.current;
    let demoDiv = this.demoDiv.current;

    let arrow = demoDiv.children[1].cloneNode(true);
    let line = arrow.children[0];
    let arrowhead = arrow.children[1];
    arrow.style.opacity = 1;
    line.style.width = `35px`;
    line.style.transform = `translate(${435 + i * 75}px,15px)`;
    arrowhead.style.transform = `translate(${470 + i * 75}px,10px)`;
    if (k == -1) {
      mainDiv.append(arrow);
    } else {
      mainDiv.insertBefore(arrow, mainDiv.children[k + 1]);
    }
  };

  genList = () => {
    let { nums } = this.state;

    let mainDiv = this.mainDiv.current;
    while (mainDiv.children[0]) mainDiv.remove(mainDiv.children[0]);

    nums.forEach((n, i) => {
      this.genNode(400 + i * 75, 0, n);
      if (i < nums.length - 1) {
        this.genLine(i);
      }
    });

    // for (let i = 0; i < nums.length - 1; i++) this.genLine(i, i + 1, true);
  };

  high = async (i,color) => {
    let mainDiv = this.mainDiv.current;
    if(i%2==0) mainDiv.children[i].style.borderColor = color;
    else mainDiv.children[i].children[0].style.backgroundColor = color
  };

  allNormal = async () => {
    let mainDiv = this.mainDiv.current;
    for(let i = 0;i < mainDiv.children.length;i++){
      if(i%2===0) mainDiv.children[i].style.borderColor = "black";
      else mainDiv.children[i].children[0].style.backgroundColor = "black"
    }
  }

  addNode = async (i, value) => {
    let { nums } = this.state;
    let demoDiv = this.demoDiv.current;
    let mainDiv = this.mainDiv.current;
    nums = nums.slice(0, i).concat(value).concat(nums.slice(i, nums.length));
    this.setState({ nums });

    // Last Index
    if (i == nums.length - 1) {
      this.genNode(400 + i * 75, 0, value, i);
      this.genLine(i - 1);
      return;
    }

    // First Index
    if (i === 0) {
      this.genNode(400 + i * 75, 0, value, i);
      this.genLine(0, 0);
      mainDiv.children[0].style.opacity = 0;
      mainDiv.children[1].style.opacity = 0;
      for (let l = (i + 1) * 2; l < nums.length * 2 - 1; l++) {
        if (l % 2 === 0)
          mainDiv.children[l].style.transform = `translate(${
            400 + (l / 2) * 75
          }px)`;
        else {
          mainDiv.children[l].children[0].style.transform = `translate(${
            435 + 75 * Math.floor(l / 2)
          }px,15px)`;
          console.log(`translate(${435 + 75 * (i + 1)}px,15px)`);
          mainDiv.children[l].children[1].style.transform = `translate(${
            470 + 75 * Math.floor(l / 2)
          }px,10px)`;
        }
      }
      await this.wait();
      mainDiv.children[0].style.opacity = 1;
      mainDiv.children[1].style.opacity = 1;
      return;
    }

    this.genNode(400 + i * 75, 75, value, i);
    this.genLine(i, i * 2);
    let list = mainDiv.children[i * 2 + 1].children;

    let line = list[0];
    let arrow = list[1];
    line.style.transform = `translate(${403 + i * 75}px, 60px) rotate(-90deg)`;
    arrow.style.transform = `rotate(-90deg) translate(-34px,${
      416.5 + 75 * i
    }px)`;
    line.style.width = `35px`;

    await this.wait();

    if (i !== 0) {
      let prev = mainDiv.children[(i - 1) * 2 + 1];
      prev.children[0].style.transform = `translate(${
        422 + 75 * (i - 1)
      }px, 49px) rotate(45deg)`;
      prev.children[0].style.width = `65px`;
      prev.children[1].style.transform = `translate(${
        475 + 75 * (i - 1)
      }px,70px) rotate(45deg)`;
    }

    await this.wait();
    await this.wait();
    await this.wait();

    let len = mainDiv.children.length;
    for (let l = (i + 1) * 2; l < nums.length * 2 - 1; l++) {
      if (l % 2 === 0){
        mainDiv.children[l].style.transform = `translate(${
          400 + (l / 2) * 75
        }px)`;

        console.log(`${value} = translate(${400 + (l / 2) * 75}px)`);
      }else {
        mainDiv.children[l].children[0].style.transform = `translate(${
          435 + 75 * Math.floor(l / 2)
        }px,15px)`;
        console.log(`translate(${435 + 75 * (i + 1)}px,15px)`);
        mainDiv.children[l].children[1].style.transform = `translate(${
          470 + 75 * Math.floor(l / 2)
        }px,10px)`;
      }
    }

    let node = mainDiv.children[i * 2];
    node.style.transform = `translate(${400 + i * 75}px)`;
    line.style.transform = `translate(${435 + i * 75}px,15px)`;
    arrow.style.transform = `translate(${470 + i * 75}px,10px)`;

    if (i !== 0) {
      let prev = mainDiv.children[(i - 1) * 2 + 1];
      prev.children[0].style.transform = `translate(${
        435 + (i - 1) * 75
      }px,15px)`;
      prev.children[0].style.width = `35px`;
      prev.children[1].style.transform = `translate(${
        470 + (i - 1) * 75
      }px,10px)`;
    }
  };

  handleChange = (evt) => {
    evt.preventDefault();
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let {steps, num, nums } = this.state;
    num = +num
    let pos = nums.length

    steps.push(["g",pos,num]);
    steps.push(["s",pos-1]);
    steps.push(["n"])
    this.setState({steps});
    this.spaceBar();
  };

  handleDelete = (e) => {
    e.preventDefault();
    let { steps,nums } = this.state;
    
    steps.push(["r",nums.length-1]);
      
    this.setState({steps})
    this.spaceBar();
  };

  remove = async (i) => {
    let mainDiv = this.mainDiv.current;
    let { nums } = this.state;
    if (i == nums.length - 1) {
      mainDiv.remove(mainDiv.children[i * 2]);
      await this.wait();
      mainDiv.removeChild(mainDiv.children[i * 2 - 1]);
      nums.pop();
      this.setState({ nums });
      return;
    }
    if (i == 0) {
      mainDiv.removeChild(mainDiv.children[0]);
      await this.wait();
      mainDiv.removeChild(mainDiv.children[0]);
      let len = mainDiv.children.length;
      for (let l = i * 2; l < len; l++) {
        if (l % 2 === 0)
          mainDiv.children[l].style.transform = `translate(${
            400 + (l / 2) * 75
          }px)`;
        else {
          mainDiv.children[l].children[0].style.transform = `translate(${
            435 + 75 * Math.floor(l / 2)
          }px,15px)`;
          console.log(`translate(${435 + 75 * (i + 1)}px,15px)`);
          mainDiv.children[l].children[1].style.transform = `translate(${
            470 + 75 * Math.floor(l / 2)
          }px,10px)`;
        }
      }
      let a = nums.slice(i);
      a.shift();
      nums = nums.slice(0, i).concat(a);
      this.setState({ nums });
      return;
    }

    await this.wait();
    mainDiv.children[i * 2].style.transform = `translate(${
      400 + i * 75
    }px,50px)`;

    mainDiv.children[i * 2 + 1].children[0].style.transform = `translate(${
      432 + 75 * i
    }px,50px) rotate(-40deg)`;

    mainDiv.children[i * 2 + 1].children[0].style.width = `50px`;

    mainDiv.children[i * 2 + 1].children[1].style.transform = `translate(${
      475 + 75 * i
    }px,26px) rotate(-45deg)`;

    await this.wait();
    mainDiv.children[i * 2 - 1].children[0].style.width = `110px`;
    mainDiv.children[i * 2 - 1].children[1].style.transform = `translate(${
      470 + 75 * i
    }px,10px)`;

    await this.wait();
    await this.wait();
    await this.wait();
    await this.wait();
    mainDiv.removeChild(mainDiv.children[i * 2]);
    mainDiv.removeChild(mainDiv.children[i * 2]);

    let len = mainDiv.children.length;
    for (let l = i * 2; l < len; l++) {
      if (l % 2 === 0)
        mainDiv.children[l].style.transform = `translate(${
          400 + (l / 2) * 75
        }px)`;
      else {
        mainDiv.children[l].children[0].style.transform = `translate(${
          435 + 75 * Math.floor(l / 2)
        }px,15px)`;
        console.log(`translate(${435 + 75 * (i + 1)}px,15px)`);
        mainDiv.children[l].children[1].style.transform = `translate(${
          470 + 75 * Math.floor(l / 2)
        }px,10px)`;
      }
    }

    mainDiv.children[(i - 1) * 2 + 1].children[0].style.width = `40px`;

    mainDiv.children[
      (i - 1) * 2 + 1
    ].children[1].style.transform = `translate(${470 + 75 * (i - 1)}px,10px)`;

    let a = nums.slice(i);
    if (a.length != 1) a.shift();
    nums = nums.slice(0, i).concat(a);
    this.setState({ nums });
    console.log(nums);

  };

  handleSearch = async (evt) => {
    evt.preventDefault();
    let { searchVal, nums,steps } = this.state;
    let mainDiv = this.mainDiv.current;

    let idx = nums.indexOf(+searchVal)===-1 ? nums.length-1 : nums.indexOf(+searchVal);


    for(let i = 0;i < idx*2+1;i++){
      steps.push(["h",i,"orange"]);
    }

    if(nums.indexOf(+searchVal) !== -1) steps.push(["h",idx*2,"green"])

    steps.push(["n"])
    this.setState({steps});
    this.spaceBar();
  };

  GenNode = async (i,value) => {
    let {nums} = this.state;
    let x = 400 + i * 75;
    let y = i===0 || i===nums.length? 0 : 75;
    let mainDiv = this.mainDiv.current;
    let demoDiv = this.demoDiv.current;

    let newNode = demoDiv.children[0].cloneNode(true);
    newNode.style.opacity = 1;
    newNode.style.transform = `translate(${x}px,${y}px)`;
    newNode.children[0].textContent = value;

    if (i === -1) mainDiv.append(newNode);
    else mainDiv.insertBefore(newNode, mainDiv.children[i * 2]);
  }

  GenItem = async (i,k=-1,value) => {
    this.GenNode(i,value)
    let mainDiv = this.mainDiv.current;
    let demoDiv = this.demoDiv.current;
    let {nums} = this.state;
      let arrow = demoDiv.children[1].cloneNode(true);
      let line = arrow.children[0];
      let arrowhead = arrow.children[1];
      arrow.style.opacity = 0;
      line.style.width = `35px`;

      if(i === 0){
        line.style.transform = `translate(${435 + i * 75}px,15px)`;
        arrowhead.style.transform = `translate(${470 + i * 75}px,10px)`;  
        mainDiv.insertBefore(arrow, mainDiv.children[1]);
        return;
      }

      if(i === nums.length){
        line.style.transform = `translate(${435 + (i-1) * 75}px,15px)`;
        arrowhead.style.transform = `translate(${470 + (i-1) * 75}px,10px)`;  
        mainDiv.insertBefore(arrow,mainDiv.children[nums.length*2-1]);
        nums.push(value);
        this.setState({nums})
        return;
      }

      line.style.transform = `translate(${435 + i * 75}px,15px)`;
      arrowhead.style.transform = `translate(${470 + i * 75}px,10px)`;
      if (k == -1) {
        mainDiv.append(arrow);
      } else {
        mainDiv.insertBefore(arrow, mainDiv.children[k + 1]);
      }

    let list = mainDiv.children[i * 2 + 1].children;

    line = list[0];
    arrow = list[1];
    line.style.transform = `translate(${403 + i * 75}px, 60px) rotate(-90deg)`;
    arrow.style.transform = `rotate(-90deg) translate(-34px,${
      416.5 + 75 * i
    }px)`;
    line.style.width = `35px`;

    
    // mainDiv.children[(i+1)*2].style.opacity = 0;
  }

  ShowEdge = async (i) => {
    let mainDiv = this.mainDiv.current
    mainDiv.children[(+i +1)*2-1].style.opacity = 1;
  }

  movePrevEdge = async (i) => {
    let mainDiv = this.mainDiv.current
    let prev = mainDiv.children[(i - 1) * 2 + 1];
      prev.children[0].style.transform = `translate(${
        422 + 75 * (i - 1)
      }px, 49px) rotate(45deg)`;
      prev.children[0].style.width = `65px`;
      prev.children[1].style.transform = `translate(${
        475 + 75 * (i - 1)
      }px,70px) rotate(45deg)`;
  }

  moveEverythingUp = async (i,value) => {
    let mainDiv = this.mainDiv.current;
    let {nums} = this.state;
    let list = mainDiv.children[(i+1) * 2-1].children;
    let line = list[0];
    let arrow = list[1];
    nums = nums.slice(0, i).concat(value).concat(nums.slice(i, nums.length));
    this.setState({ nums });

    let node = mainDiv.children[i * 2];
    node.style.transform = `translate(${400 + i * 75}px)`;
    line.style.transform = `translate(${435 + i * 75}px,15px)`;
    arrow.style.transform = `translate(${470 + i * 75}px,10px)`;

    if (i !== 0) {
      let prev = mainDiv.children[(i - 1) * 2 + 1];
      prev.children[0].style.transform = `translate(${
        435 + (i - 1) * 75
      }px,15px)`;
      prev.children[0].style.width = `35px`;
      prev.children[1].style.transform = `translate(${
        470 + (i - 1) * 75
      }px,10px)`;
    }

    for (let l = (i+1)*2-1; l < (nums.length-1)*2; l++) {
      console.log(l);
      if (l % 2 === 0){
        mainDiv.children[+l +1].children[0].style.transform = `translate(${
          435 + 75 * Math.floor((+l+1) / 2)
        }px,15px)`;
        mainDiv.children[+l +1].children[1].style.transform = `translate(${
          470 + 75 * Math.floor((+l+1) / 2)
        }px,10px)`;
      }else {
        mainDiv.children[+l+1].style.transform = `translate(${
          400 + ((+l +1) / 2) * 75
        }px)`;
      }
    }
  }

  addHead = async (i,value) => {
    let mainDiv = this.mainDiv.current;
    let {nums} = this.state;

    for (let l = 0; l < nums.length*2-1; l++) {
      if (l % 2 !== 0){
        mainDiv.children[l].children[0].style.transform = `translate(${
          435 + 75 * Math.floor((+l+1) / 2)
        }px,15px)`;
        mainDiv.children[l].children[1].style.transform = `translate(${
          470 + 75 * Math.floor((+l+1) / 2)
        }px,10px)`;
      }else {
        mainDiv.children[l].style.transform = `translate(${
          400 + ((+l +2) / 2) * 75
        }px)`;
      }
    }
    nums = nums.slice(0, i).concat(value).concat(nums.slice(i, nums.length));
    this.setState({nums})
  }

  run = async () => {
    // this.GenItem(5,0,45)
    // await this.wait();
    // this.ShowEdge(4)

    // await this.wait();
    // this.movePrevEdge(2)
    // await this.wait();
    // await this.wait();
    // await this.wait();
    // this.moveEverythingUp(2,45)

    // 

    // this.MoveDown(0)
    // await this.wait()
    // await this.wait()
    // await this.wait()
    // await this.wait()

    this.RemoveNode(4)
    // await this.wait()
    // this.MoveBack(0);
  }

  MoveDown = async (i) => {
    let mainDiv = this.mainDiv.current;
    let {nums} = this.state;

    // await this.wait();
    mainDiv.children[i * 2].style.transform = `translate(${
      400 + i * 75
    }px,50px)`;

    mainDiv.children[i * 2 + 1].children[0].style.transform = `translate(${
      432 + 75 * i
    }px,50px) rotate(-40deg)`;

    mainDiv.children[i * 2 + 1].children[0].style.width = `50px`;

    mainDiv.children[i * 2 + 1].children[1].style.transform = `translate(${
      475 + 75 * i
    }px,26px) rotate(-45deg)`;

    mainDiv.children[i * 2 - 1].children[0].style.width = `110px`;
    mainDiv.children[i * 2 - 1].children[1].style.transform = `translate(${
      470 + 75 * i
    }px,10px)`;
  }

  RemoveNode = async (i) => {
    let mainDiv = this.mainDiv.current;
    let {nums} = this.state;

    if(i === nums.length-1){
      nums.pop();
      this.setState({nums});
      mainDiv.removeChild(mainDiv.children[i * 2]);
      mainDiv.removeChild(mainDiv.children[i * 2-1]);
      return;
    }

    mainDiv.removeChild(mainDiv.children[i * 2]);
    if(i === nums.length-1)
      mainDiv.removeChild(mainDiv.children[i * 2-1]);
    else
      mainDiv.removeChild(mainDiv.children[i * 2]);
  }

  MoveBack = async(i) => {
    let mainDiv = this.mainDiv.current;
    let len = mainDiv.children.length;
    let {nums} = this.state;

    let a = nums.slice(i);
    if (a.length != 1) a.shift();
    nums = nums.slice(0, i).concat(a);
    this.setState({ nums });

    for (let l = i * 2; l < nums.length*2-1; l++) {
      if (l % 2 === 0)
        mainDiv.children[l].style.transform = `translate(${
          400 + (l/ 2) * 75
        }px)`;
      else {
        mainDiv.children[l].children[0].style.transform = `translate(${
          435 + 75 * Math.floor(l/ 2)
        }px,15px)`;
        mainDiv.children[l].children[1].style.transform = `translate(${
          470 + 75 * Math.floor(l/ 2)
        }px,10px)`;
      }
    }

    if(i !== 0){

      mainDiv.children[(i - 1) * 2 + 1].children[0].style.width = `40px`;
      
      mainDiv.children[
        (i - 1) * 2 + 1
      ].children[1].style.transform = `translate(${470 + 75 * (i - 1)}px,10px)`;
    }      

    
    console.log(nums);
  }

  stepForward = async () => {
    let { steps, stepNum } = this.state;
    let currentStep = steps[stepNum];
    if (stepNum >= steps.length) {
      this.setState({steps: [], stepNum:0})
      return;
    }

    if(Array.isArray(currentStep[0])){
      for (let j = 0; j < currentStep.length; j++) {
        switch(currentStep[j][0]){
          case "g":
          await this.GenItem(currentStep[j][1],currentStep[j][1]*2,currentStep[j][2]);
          break;
    
          case "s":
          await this.ShowEdge(currentStep[j][1]);
          break;
    
          case "m":
          await this.movePrevEdge(currentStep[j][1]);
          break;
    
          case "e":
          await this.moveEverythingUp(currentStep[j][1],currentStep[j][2]);
          break;
    
          case "h":
          await this.high(currentStep[j][1],currentStep[j][2])
          break;
    
          case "n":
          await this.allNormal();
          break;
    
          case "d":
            await this.MoveDown(currentStep[j][1]);
            break;
    
          case "r":
            await this.RemoveNode(currentStep[j][1]);
            break;
    
          case "b":
            await this.MoveBack(currentStep[j][1]);
            break;

          case "w":
            await this.wait();
            break;
          
          case "a":
            await this.addHead(currentStep[j][1],currentStep[j][2]);
            break;
        }
      }
    }

    switch(currentStep[0]){
      case "g":
      await this.GenItem(currentStep[1],currentStep[1]*2,currentStep[2]);
      break;

      case "s":
      await this.ShowEdge(currentStep[1]);
      break;

      case "m":
      await this.movePrevEdge(currentStep[1]);
      break;

      case "e":
      await this.moveEverythingUp(currentStep[1],currentStep[2]);
      break;

      case "h":
      await this.high(currentStep[1],currentStep[2])
      break;

      case "n":
      await this.allNormal();
      break;

      case "d":
        await this.MoveDown(currentStep[1]);
        break;

      case "r":
        await this.RemoveNode(currentStep[1]);
        break;

      case "b":
        await this.MoveBack(currentStep[1]);
        break;

      case "w":
        await this.wait();
        break;
      
      case "a":
        await this.addHead(currentStep[1],currentStep[2]);
        break;
    }

    console.log(currentStep);
    stepNum++;
    this.setState({stepNum});
  }

  handleCreate = async (evt) => {
    evt.preventDefault();
    let {nums,newVals} = this.state;
    nums = newVals.split(",").map(i => +i)
    this.setState({steps:[],nums,stepNum:0});
    let mainDiv = this.mainDiv.current;
    while(mainDiv.children[0])
      mainDiv.removeChild(mainDiv.children[0]);
      await this.wait()
    this.genList();
  }

  handleKey = (e) => {
    if (e.keyCode === 39) {
      this.setState({ mode: "key" });
      this.stepForward();
    } else if (e.keyCode === 37) {
      this.setState({ mode: "key" });
      // this.stepBack();
    } else if (e.keyCode === 32) {
      if (this.state.mode === "spacebar") return this.setState({ mode: "key" });
      else this.setState({ mode: "spacebar" });
      this.spaceBar();
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    if (e.path[0].textContent === "Play") {
      if (this.state.mode === "spacebar") return this.setState({ mode: "key" });
      else this.setState({ mode: "spacebar" });
      this.spaceBar();
    } else if (e.path[0].textContent === "Rev") {
    }
  };

  async spaceBar() {
    let { steps, stepNum} = this.state;
    this.setState({ mode: "spacebar"});
    for (let i = stepNum; i < steps.length; i++) {
      if (this.state.mode === "key") {
        break;
      }
      await this.stepForward();
      stepNum++;
      this.setState({ stepNum });
      await this.wait();
    }
  }

  render() {
    return (
      <div>
        <h1>Stack</h1>
        <div style={{ opacity: 0 }} ref={this.demoDiv}>
          <div className="block">
            <label>0</label>
          </div>
          <div className="arrow">
            <div className="line"></div>
            <div className="arrowhead"></div>
          </div>
        </div>

        <div ref={this.mainDiv} className="mainDiv"></div>

        <form onSubmit={this.handleCreate}>
          <input
            className="txt"
            onChange={this.handleChange}
            style={{ transform: "translate(5px,50px)", width: "100px",height: "20px" }}
            name="newVals"
            value={this.state.newVals}
          ></input>
          <button className="btn" style={{ transform: "translate(10px,-383px)", height: "22px",width:"60px" }}>
            create
          </button>
        </form>

        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            className="txt"
            style={{ transform: "translate(5px,50px)", width: "30px", height: "20px" }}
            name="num"
            value={this.state.num}
          ></input>
          <button className="btn" style={{ transform: "translate(80px,-357px)", height: "22px",width:"60px"}}>push</button>
        </form>

        <form onSubmit={this.handleDelete}>
          <button className="btn" style={{ transform: "translate(115px,-330px)", height: "22px",width:"60px"}}>
            pop
          </button>
        </form>
        
        <button id="play-btn">Play</button>
        <div style={{transform: "translate(900px,-100px)"}} className="theory">
          <h3>Stack</h3>
        <p>Stack is a linear data structure which follows a particular order in which the operations are performed. The order may be 
            LIFO(Last In First Out) or FILO(First In Last Out). In computer science, a stack is an abstract data type that serves as a collection of 
            elements, with two main principal operations: Push, which adds an element to the collection, and. Pop, which removes the most recently 
            added element that was not yet removed.  <br></br><br></br>
          
           

        	Application of stack is:<br></br>
            1.Expression Handling 
            2.Backtracking Procedure 
            3.Another great use of stack is during the function call and return process.<br></br><br></br>
         

        	This is especially important in understanding how recursion works. In stack we can allocate memory dynamically. When a function is called 
            the local variables are stored in a stack, and it is automaticallydestroyed once returned. A stack is used when a 
            variable is not used outside that function. It allows you to control how memory is allocated and deallocated. Stack automatically cleans 
            up the object.<br></br>
         

        	 </p>
      </div>
      </div>
    );
  }
}
