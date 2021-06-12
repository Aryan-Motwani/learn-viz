import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

class About extends Component {
  render() {
    return (
      <div>
          <h1>About Page</h1>
          <p>This Website will definately help you to understanding the concept of Data Structure by using Animations.we have basically
           created the website of Data Structure(DS) Algorithm Visualization and Programming learning. this website is informative as well 
           as training based website for the Students who gate the knowledge of Data Structures as well as the various programming 
           languages. Where these website developed with the help of basic languages.<br></br><br></br>

           The Goals of our website is:<br></br>
1. Enhance the quality of learning .<br></br>
2. Meet the learning style or needs of students.<br></br>
3. Improve the efficiency and effectiveness.<br></br>
4. Improve user-accessibility and time flexibility to engage learners in the learning process.<br></br><br></br>

           After opening this website various square blocks are displayed. This blocks are divided into various categories like programming
           languages, Searching, sorting algorithms Stack, Queue, Linked list, Tress ,Graphs and so on. If you selected any one from it 
           then you get the information or visualization of that particular topic. In this website various visualization concepts are also
           ded means How to sort order wise elements using different sorting techniques, Search the element using searching methods as well
           as you can also create a link list, add element in trees and graphs, you can also perform the various operations on data
           structures like stack, Queue and Linked list. This website fully helpful to you for the visualization concepts of Data Structure.
           <br></br><br></br>Although after completing our website it is not perfect, we had planned to make some enhancement as well as
           new Technical Skills in the future. We will include more features, function For Online Learning Like code editor, We can Also 
           Include compile, video lecture, coding projects, coding challenges Project can be updated in near future as and when an
           requirement for the same arise, as it is very flexible in terms of expansion.<br></br><br></br>

           Under the Guidance of All Teachers This website is develop by MGM's Polytechnic Students name are as Follows:<br></br>
			<b>1.Aarti Joshi<br></br>
			2.Aryan Motwani<br></br>
			3.Varun Dusane<br></br>
			4.Anam Mohammad<br></br></b>
           </p>


      </div>
    );
  }
}

export default withRouter(About);
