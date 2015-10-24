import React from "react";
import {devCard, startRenderLoop} from './core.js';

let MyComponent = (props) => {
  return <div>Hello {
    props.str}</div>
};

const cmpParam = {
  str: "Joe"
}

devCard(
    "A not so fancy card",
    null,
    () => <MyComponent {...cmpParam}/>
    )

devCard(
  "A card with makrdown",
  `## Important Stuff

  ### Really important stuff
  Es6 doesn\'t get proper support for multi line string
  What a shame for cards like this one


  Here is some *weird* String! Don\'t You thinK Paulie?\
  `,
  () => <MyComponent str="Joe"/>
);

var InteractiveCard = React.createClass({
  render(){
    var inc = function(){
      let cmpt = this.state ? this.state.cmpt : 0 ;
      this.setState({cmpt: cmpt + 1});
    }.bind(this),
    cmpt = this.state ? this.state.cmpt : 0;

    return <div>
      <label>Compteur {cmpt} </label>
      <button onClick={inc}> Inc </button>
    </div>
  }
});

devCard("My interactive counter card",
    null,
    () => <InteractiveCard/>);

var props = props || {
  cmpt: 1,
  inc: function(){
    props.cmpt = props.cmpt + 1;
}};

var InteractiveCardV2 = React.createClass({
  getInitialState: function(){
    return {cmpt:0};
  },

  inc:function(){
    this.props.inc();
  },
  render: function(){
    return <div>
      Check my counter on the inside 
      <label> {this.props.cmpt}</label>
      <button onClick={this.inc}> Inc </button>
    </div>
  }
});


devCard(
  "An interactive card with debug on props",
  '',
  () => <InteractiveCardV2 {...props}/>,
  props
);

startRenderLoop();

