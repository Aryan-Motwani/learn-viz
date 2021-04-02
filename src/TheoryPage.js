import React, { Component } from "react";

export default class TheoryPage extends Component {
  render() {
    return (
      <div>
        <h3>Bubble Sort</h3>
        <p>
          Bubble sort, sometimes referred to as sinking sort, is a simple
          sorting algorithm that repeatedly steps through the list, compares
          adjacent elements and swaps them if they are in the wrong order. The
          pass through the list is repeated until the list is sorted. The
          algorithm, which is a comparison sort, is named for the way smaller or
          larger elements "bubble" to the top of the list
        </p>
        <h3>Big O of Bubble Sort</h3>
        <strong>Worst and Average Case Time Complexity</strong>: O(n*n).Worst
        case occurs when array is reverse sorted.<br></br>
        <strong>Best Case Time Complexity</strong>: O(n). Best case occurs when
        array is already sorted.<br></br>
        <strong>Auxiliary Space</strong>: O(1)
        <br></br>
        <strong>Boundary Cases</strong>: Bubble sort takes minimum time (Order
        of n) when elements are already sorted.
        <h3>Uses of Bubble Sort</h3>
        <p>
          Due to its simplicity, bubble sort is often used to introduce the
          concept of a sorting algorithm. In computer graphics it is popular for
          its capability to detect a very small error (like swap of just two
          elements) in almost-sorted arrays and fix it with just linear
          complexity (2n). For example, it is used in a polygon filling
          algorithm, where bounding lines are sorted by their x coordinate at a
          specific scan line (a line parallel to x axis) and with incrementing y
          their order changes (two elements are swapped) only at intersections
          of two lines
        </p>
      </div>
    );
  }
}
