import React, { Component } from "react";
import {
  bubbleSortCode,
  selectionSortCode,
  insertionSortCode,
  mergeSortCode,
  quickSortCode,
  radixSortCode,
} from "./SortAlgoCode";

export default class Code extends Component {
  constructor(props){
    super(props);
    this.state = {sortMode : "Bubble Sort"}
  }

  codeAssign = () => {
    let { sortMode } = this.state;
    let code;
  switch (sortMode) {
    case "Bubble Sort":
      code = bubbleSortCode;
      break;

    case "Selection Sort":
      code = selectionSortCode;
      break;

    case "Insertion Sort":
      code = insertionSortCode;
      break;

    case "Merge Sort":
      code = mergeSortCode;
      break;

    case "Quick Sort":
      code = quickSortCode;
      break;

    case "Radix Sort":
      code = radixSortCode;
      break;

    default:
      break;
  }
  return code
  }
  handleSortMode = (e) => {
    this.setState({sortMode : e.target.value})
  }

  render() {
    let code = this.codeAssign();
    console.log(code);
    return (
      <div>
        <select onChange={this.handleSortMode}>
          <option>Bubble Sort</option>
          <option>Selection Sort</option>
          <option>Radix Sort</option>
          <option>Insertion Sort</option>
          <option>Quick Sort</option>
        </select>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }
}
