import React, { Component } from "react";
import {
  bubbleSortCode,
  selectionSortCode,
  insertionSortCode,
  mergeSortCode,
  quickSortCode,
  radixSortCode,
} from "./Notes";

export default class Code extends Component {
  render() {
    let { title } = this.props;
    let code;
    switch (title) {
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
    return (
      <div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }
}
