import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./css/sidebar.css"


class SideBar extends Component{
    render(){
        let modes = ["Visualizer","Tutorial","Theory","Code"];
        let propMode = this.props.mode;
        return (
            <div className="SideBar">
                {modes.map((mode,i) => (
                    <li className={propMode === mode ? 'side-bar-active' : ''} key={i} onClick={(e) => this.props.handleClick(e)}>{mode}</li>
                ))}
            </div>
        );
    }
}

export default withRouter(SideBar);