import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import topics from './notes/Java';


class SubCategory extends Component {
    render(){
        let title = this.props.match.params.sub_category;
        let {mode} = this.props;
        // console.log(topics.topics);
        return (
            <div>
                <h1>{title}</h1>
                <h3>{mode}</h3>
                <pre>
                    <code>
                        {topics.topics[mode]}
                    </code>
                </pre>
            </div>
        )
    }
}

export default withRouter(SubCategory);