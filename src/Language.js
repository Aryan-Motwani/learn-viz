import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import topics from './notes/Java';
import Else from './notes/Java/else';

class Language extends Component {
    render(){
        let title = this.props.match.params.sub_category;
        let {mode} = this.props;
        return (
            <div>
                <Else />
            </div>
        )
    }
}

export default withRouter(Language);