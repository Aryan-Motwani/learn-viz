import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

class Else extends Component {
    render(){
        let title = this.props.match.params.sub_category;
        let {mode} = this.props;
        return (
            <div>
                <h3 className="sub-head">Java Conditions and If Statements</h3>
                <p>Java supports the usual logical conditions from mathematics:</p>
                <ul>
                    <li>{`Less than: a < b`}</li>
                    <li>{`Less than or equal to: a <= b`}</li>
                    <li>{`Greater than: a > b`}</li>
                </ul>
                <h3>The if Statement</h3>
                <p>Use the if statement to specify a block of Java code to be executed if a condition is true.</p>
                <h3>Syntax :-</h3>
                <pre>
                    <code>
                    {
`
if (condition) {
    // block of code to be executed if the condition is true
}
`}
                    </code>
                </pre>
            </div>
        )
    }
}

export default withRouter(Else);