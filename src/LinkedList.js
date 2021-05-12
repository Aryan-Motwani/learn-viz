import React, { Component } from "react";

export default class LinkedList extends Component {
  constructor(props) {
    super(props);
    this.demoDiv = React.createRef();
    this.mainDiv = React.createRef();
    this.state = {
      nums: [1, 2, 3, 4, 5],
      num: "",
      pos: "",
      del: "",
    };
  }

  componentDidMount() {
    this.genList();
  }
  async wait() {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
  }

  genNode = (x, y, value, i = 0) => {
    let mainDiv = this.mainDiv.current;
    let demoDiv = this.demoDiv.current;

    let newNode = demoDiv.children[0].cloneNode(true);
    newNode.style.opacity = 1;
    newNode.style.transform = `translate(${x}px,${y}px)`;
    newNode.children[0].textContent = value;

    if (i === 0) mainDiv.append(newNode);
    else mainDiv.insertBefore(newNode, mainDiv.children[i * 2]);
  };

  genLinee = (i, j, hasArrow, k = -1) => {
    let mainDiv = this.mainDiv.current;
    let demoDiv = this.demoDiv.current;

    let nodeOne = mainDiv.children[i];
    let nodeTwo = mainDiv.children[j];

    let t1 = nodeOne.style.transform;
    let t2 = nodeTwo.style.transform;

    let x1 = +t1.substring(10, t1.indexOf("p"));
    let y1 = +t1.substring(t1.indexOf(" ") + 1, t1.indexOf(")") - 2);
    let x2 = +t2.substring(10, t2.indexOf("p"));
    let y2 = +t2.substring(t2.indexOf(" ") + 1, t2.indexOf(")") - 2);

    let arrow = demoDiv.children[1].cloneNode(true);
    let line = arrow.children[0];
    let arrowhead = arrow.children[1];
    arrow.style.opacity = 1;

    if (y1 === y2) {
      line.style.transform = `translate(${x1 + 35}px,${y1 + 15}px)`;
      line.style.width = `${hasArrow ? x2 - x1 - 30 - 10 : x2 - x1 - 30}px`;
      if (hasArrow) {
        arrowhead.style.transform = `translate(${x1 + 69}px,${y1 + 10}px)`;
      } else {
        arrowhead.style.opacity = 0;
      }
    } else {
    }

    if (k === -1) mainDiv.append(arrow);
    else
      mainDiv.insertBefore(
        arrow,
        mainDiv.children[this.state.nums.length + i + 1]
      );
  };

  genLine = (i, k) => {
    let mainDiv = this.mainDiv.current;
    let demoDiv = this.demoDiv.current;

    let arrow = demoDiv.children[1].cloneNode(true);
    let line = arrow.children[0];
    let arrowhead = arrow.children[1];
    arrow.style.opacity = 1;
    line.style.width = `35px`;
    line.style.transform = `translate(${435 + i * 75}px,15px)`;
    arrowhead.style.transform = `translate(${470 + i * 75}px,10px)`;
    if (!k) {
      mainDiv.append(arrow);
    } else {
      mainDiv.insertBefore(arrow, mainDiv.children[k + 1]);
    }
  };

  genList = () => {
    let { nums } = this.state;

    let mainDiv = this.mainDiv.current;
    while (mainDiv.children[0]) mainDiv.removeChild(mainDiv.children[0]);

    nums.forEach((n, i) => {
      this.genNode(400 + i * 75, 0, n);
      if (i < nums.length - 1) {
        this.genLine(i, false);
      }
    });

    // for (let i = 0; i < nums.length - 1; i++) this.genLine(i, i + 1, true);
  };

  add = async (i, value) => {
    let { nums } = this.state;
    let demoDiv = this.demoDiv.current;
    let mainDiv = this.mainDiv.current;
    nums = nums.slice(0, i).concat(value).concat(nums.slice(i, nums.length));
    this.setState({ nums });

    this.genNode(400 + i * 75, 75, value, i);
    this.genLine(i, 3, true, i);
    let list = mainDiv.children[nums.length + i].children;
    let line = list[0];
    let arrow = list[1];
    line.style.transform = `translate(${403 + i * 75}px, 60px) rotate(-90deg)`;
    arrow.style.transform = `rotate(-90deg) translate(-34px,${
      416.5 + 75 * i
    }px)`;
    line.style.width = `35px`;
    await this.wait();

    let prev = mainDiv.children[nums.length + i - 1];
    prev.children[0].style.transform = `translate(${
      422 + 75 * (i - 1)
    }px, 49px) rotate(45deg)`;
    prev.children[0].style.width = `65px`;
    prev.children[1].style.transform = `translate(${
      475 + 75 * (i - 1)
    }px,70px) rotate(45deg)`;

    await this.wait();

    prev.children[0].style.transform = `translate(${
      435 + 75 * (i - 1)
    }px, 15px)`;
    prev.children[0].style.width = `35px`;
    prev.children[1].style.transform = `translate(${
      470 + 75 * (i - 1)
    }px,10px)`;

    // line.style.transform = `translate(${435 + i * 75}px, 15px)`;
    // arrow.style.transform = `translate(${469 + 75 * i}px,10px)`;
    // mainDiv.children[i].style.transform = `translate(${400 + i * 75}px)`;

    for (let k = i + 1; k < nums.length; k++) {
      mainDiv.children[k].style.transform = `translate(${400 + k * 75}px)`;
    }

    for (let k = i + 1; k < nums.length; k++) {
      mainDiv.children[
        k + nums.length - 1
      ].style.transform = `translate(${75}px)`;
    }
  };

  addNode = async (i, value) => {
    let { nums } = this.state;
    let demoDiv = this.demoDiv.current;
    let mainDiv = this.mainDiv.current;
    nums = nums.slice(0, i).concat(value).concat(nums.slice(i, nums.length));
    this.setState({ nums });

    if (i == nums.length - 1) {
      this.genNode(400 + i * 75, 0, value, i);
      this.genLine(i - 1);
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
    let { num, pos } = this.state;
    this.addNode(+pos, +num);
  };

  handleDelete = (e) => {
    e.preventDefault();
    let { del } = this.state;
    this.remove(del);
  };

  remove = async (i) => {
    let mainDiv = this.mainDiv.current;
    let { nums } = this.state;
    if (i == nums.length - 1) {
      mainDiv.removeChild(mainDiv.children[i * 2]);
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

  render() {
    return (
      <div>
        <h1>Linked List</h1>
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
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            style={{ transform: "translate(0px,50px)", width: "15px" }}
            name="num"
            value={this.state.num}
          ></input>
          <input
            onChange={this.handleChange}
            style={{ transform: "translate(0px,50px)", width: "15px" }}
            name="pos"
            placeholder="pos"
            value={this.state.pos}
          ></input>
          <button style={{ transform: "translate(5px,-490px)" }}>add</button>
        </form>
        <form onSubmit={this.handleDelete}>
          <input
            onChange={this.handleChange}
            style={{ transform: "translate(20px,50px)", width: "15px" }}
            name="del"
            value={this.state.del}
          ></input>
          <button style={{ transform: "translate(25px,-470px)" }}>
            remove
          </button>
        </form>
      </div>
    );
  }
}
