import React from 'react'
import ReactDOM from 'react-dom'
import hljs from "highlight.js"

import {mapObj, groupBy, sortBy, markdownToHtml} from './utils'

const DevCardTitle = (props) => {
  const titleStyle = {
    backgroundColor: "rgb(239, 237, 237)",
    color: "#666",
    padding: "8px 15px"
  },
  title = props.value || "";

  if (!title) { return null; }
  
  return <div style={titleStyle}>
    {title}
  </div>;
};
const DevCardDoc = (props) => {
  const mdDoc = props.value || "";
  const doc = {__html: markdownToHtml(mdDoc)};
  if (!doc) { return null; }
  return <div dangerouslySetInnerHTML={doc}/>
};
const DevCardsPropsDisplay = React.createClass({
  render: function(){
    if(!this.props.props || Object.keys(this.props.props).length == 0){ return null; }
    const json = JSON.stringify(this.props.props); 
    return <pre><code className="hljs json">{json}</code></pre>;
  },
  highlight(){
    const node = ReactDOM.findDOMNode(this);
    if(node){
      hljs.highlightBlock(node);
    }    
  },
  componentDidMount(){
    this.highlight();
  },
  componentWillUpdate(){
    this.highlight();
  }
});
const DevCardBody = (props) => {
  const bodyStyle = {
    margin: "10px"
  };
  return <div style={bodyStyle}>
    <DevCardDoc value={props.doc}/>
    {props.children}
    <DevCardsPropsDisplay props={props.props}/> 
  </div>;
};
export const DevCard = React.createClass({
  getInitialState: function() {
    const wrapFunc = (func) => _ => {
      const newProps = func.apply(arguments); 
      const newWrappedProps = mapObj(newProps, wrapProp)
      this.setState({props:newWrappedProps});
    }
    const wrapProp = (p) => (typeof p == "function") ? wrapFunc(p) : p
    const wrappedProps = mapObj(this.props.props, wrapProp)
    return {uniqueId: `devcards.js.${Date.now()}`, props: wrappedProps}
  },

  render: function() {
    const cardStyle = {
        border: "1px solid rgb(231,234,242)",
        borderRadius: "3px",
        marginTop: "20px"
    }

    return <div style={cardStyle}>
      <DevCardTitle value={this.props.title}/>
      <DevCardBody doc={this.props.doc}
                   props={this.state.props}>
                   {React.createElement(this.props.component, this.state.props)}
      </DevCardBody>
      </div>;
    }
});
const DevCardsListing = ({devcards = []}) => {
    const listStyle = {
      listStyle: "none",
      padding: "0px",
      width: "100%"
    }

    const cards = devcards.map(({devcard}, index) => {
      return <li key={"devcard-"+index}> 
        {React.createElement(devcard)}
      </li>;
    });
  return <ul style={listStyle}>
    {cards}
  </ul>
};

const DevCardsMenu = ({grouppedSortedDevCards, activeComponent, onSelectComponent}) => {
  const componentNames = Object.keys(grouppedSortedDevCards)
    const s = (activeComponent) => {font}
  const groups = componentNames.map((name, index) => { 
    const style = {
      cursor: "pointer",
      fontWeight:activeComponent == name ? "bold": "initial"
    }
    return <li key={'component'+ index}>
      <a onClick={_=>onSelectComponent(name)} style={style}>
        {name}
      </a>
    </li>
  })

  const style = {
    height: "100%",
    listStyle: "none",
    backgroundColor: "#EFEFEF",
    padding: "10px",
    marginRight: "10px",
    minWidth: "15%"
  }
  return <ul style={style}>{groups}</ul>
}

export const DevCardsApp = ({devcards, activeComponent, onSelectComponent}) => {
  const grouppedDevCards = groupBy(devcards, 'componentName')
  const sortedDevCards = mapObj(grouppedDevCards, (cards) => sortBy(cards, 'cardTitle'))
  const currentCards = sortedDevCards[activeComponent] || []
  return <div style={{display:"flex"}}>
    <DevCardsMenu grouppedSortedDevCards={sortedDevCards} activeComponent={activeComponent} onSelectComponent={onSelectComponent}/>
    <DevCardsListing devcards={currentCards}/>
  </div>
}
