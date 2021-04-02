import React, { Component } from "react";
import main from './Pages';
import { withRouter } from "react-router-dom";
import Box from './Box';

class ListPage extends Component {
  constructor(props){
    super(props);
    this.state = {list : this.getVals()}
    this.go = this.go.bind(this);
  }

  go(e){
    let path = this.state.list[e];
    if (main[path]) {
      this.props.history.push(`/${path}`);
    }else{
      this.props.history.push(`/a/${path}`);
    }
  }

  getVals(){
    if(this.props.match.url === "/") return main["Home"];
    return main[this.props.match.params.category];
  }

  render(){
    return (
        <div>
            {this.state.list.map((item,i) => (
                <Box idx={i} key={i} title={item} handleClick={this.go}/>                
              ))}
        </div>
    );
  }
}

export default withRouter(ListPage);