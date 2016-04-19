import React from "react";
import {devCard, startRenderLoop} from './core.js';

let MyComponent = (props) => {
  return <div>Hello {props.str} </div>
};

const cmpParam = {
  str: "Joe"
}

devCard(
  "A not so fancy card",
  MyComponent,
  {...cmpParam}
)

devCard(
  "A card with makrdown",
  MyComponent,
  {str:"Joe"},
  `## Important Stuff

  ### Really important stuff
  Es6 doesn\'t get proper support for multi line string
  What a shame for cards like this one


  Here is some *weird* String! Don\'t You thinK Paulie?\
  `
);

const InteractiveCard = React.createClass({
  render(){
    const inc = () => {
      let cmpt = this.state ? this.state.cmpt : 0 ;
      this.setState({cmpt: cmpt + 1});
    }
    const cmpt = this.state ? this.state.cmpt : 0;

    return <div>
      <label>Compteur {cmpt} </label>
      <button onClick={inc}> Inc </button>
    </div>
  }
});

devCard(
  "My interactive counter card",
  InteractiveCard
);

var props = {
  cmpt: 1,
  inc: () => { 
    props.cmpt ++
    return props
  }
};

const InteractiveCardV2 = ({cmpt, inc}) => {
  return <div>
    Check my counter on the inside 
    <label> {cmpt}</label>
    <button onClick={inc}> Inc </button>
  </div>
};

devCard(
  "An interactive card with debug on props",
  InteractiveCardV2,
  props
);

startRenderLoop();
