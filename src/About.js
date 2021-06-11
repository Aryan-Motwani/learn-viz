import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div>
          <h1>About Page</h1>
          <p>Data Structure can be defined as the group of data elements which provides an efficient way of storing and organizing data in the computer so that it can be used<br></br>
efficiently. Some examples of Data Structures are arrays, Linked List, Stack, Queue, etc.<br></br>
An algorithm is a collection of steps to solve a particular problem. Learning data structures and algorithms allow us to write efficient and optimized computer programs. </p>


      </div>
    );
  }
}

export default withRouter(About);
