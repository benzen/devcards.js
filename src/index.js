
let MyComponent = comp(function(){
  return <div>Hello {this.props.str}</div>
});

const cmpParam = {
  str: "Joe"
}

devCard(
    "A not so fancy card",
    null,
    <MyComponent {...cmpParam}/>
    )
devCard(
  "A card with makrdown",
  `## Important Stuff

  ### Really important stuff
  Es6 doesn\'t get proper support for multi line string
  What a shame for cards like this one


  Here is some *weird* String! Don\'t You thinK Paulie?\
  `,
  <MyComponent str="Joe"/>
);

var InteractiveCard = comp(function(){
  var inc = function(){
    let cmpt = this.state ? this.state.cmpt : 0 ;
    this.setState({cmpt: cmpt + 1});
  }.bind(this),
  cmpt = this.state ? this.state.cmpt : 0;

  return <div>
    <label>Compteur {cmpt} </label>
    <button onClick={inc}> Inc </button>
  </div>
});

devCard("My interactive card",
    null,
    <InteractiveCard/>);

var InteractiveCardV2 = comp({
  getInitialState: function(){
    return {cmpt:0};
  },

  inc:function(){
    this.props.inc();
  },
  render: function(){
    return <div>
    "hello"
      <label>Compteur {this.props.cmpt} </label>
      <button onClick={this.inc}> Inc </button>
    </div>
  }
});
let props = props || {
  cmpt: 1,
  inc: function(){
    props.cmpt = props.cmpt + 1;
}};

devCard(
  "My interactive card v2 just",
  '',
  <InteractiveCardV2 {...props}/>,
  props
);


