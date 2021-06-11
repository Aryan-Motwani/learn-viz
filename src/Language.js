import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import all from "./notes/Java/allcollect";

class Language extends Component {
    render(){
        let title = this.props.match.params.sub_category;
        let {mode} = this.props;
        mode = mode.toLowerCase().split(" ").join("_")
        return (
            <div>
                <h1>Hello</h1>
                {all[title][mode]}
            </div>
        )
    }
}

export default withRouter(Language);