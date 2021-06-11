import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import "./css/navbar.css"


class Navbar extends Component{
    render(){
        return (
            <div className="Navbar">
                <h1><NavLink className="lz-head" to="/">LearnViz</NavLink></h1>
                <ul>
                    <NavLink className={`nav-link`} to="/">Home</NavLink>
                    <NavLink className={`nav-link`} to="/a/Sorting Algorithms">Algorithms</NavLink>
                    <NavLink className={`nav-link`} to="/About">About</NavLink>
                </ul>
            </div>
        );
    }
}

export default withRouter(Navbar);