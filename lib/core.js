import React from "react";
import ReactDOM from 'react-dom';
import hljs from "highlight.js";
import commonmark from "commonmark";

let DevCardTitle = (props) => {
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

let DevCardDoc = (props) => {
  var markdownHanlder = function(){
    return {
      reader: new commonmark.Parser(),
      writer: new commonmark.HtmlRenderer({
        safe: true
      })
    };
  };

  var markdownToHtml = function (mdHandler, src){
    var parsed = mdHandler.reader.parse(src);
    return mdHandler.writer.render(parsed);
  };
  const mdDoc = props.value || "",
        doc = {__html: markdownToHtml(markdownHanlder(), mdDoc)};
  if (!doc) { return null; }
  return <div dangerouslySetInnerHTML={doc}/>
};

let DevCardsPropsDisplay = React.createClass({
  render: function(){
    if(!this.props.props){ return null; }
    const json = JSON.stringify(this.props.props); 
    return <pre><code className="hljs json">{json}</code></pre>
  },
  componentWillUpdate:function(){
    const node = ReactDOM.findDOMNode(this);
    if(node){
      hljs.highlightBlock(node);
    }
  }
});

let DevCardBody = (props) => {
  const bodyStyle = {
    margin: "10px"
  };
  return <div style={bodyStyle}>
    <DevCardDoc value={props.doc}/>
    {props.children}
    <DevCardsPropsDisplay props={props.props}/> 
  </div>;
};

let DevCard = React.createClass({
  getInitialState: function(){  return {uniqueId: `devcards.js.${Date.now()}`}},

  render: function() {
    var cardStyle = {
        border: "1px solid rgb(231,234,242)",
        borderRadius: "3px",
        marginTop: "20px"
      };
  return <div style={cardStyle}>
    <DevCardTitle value={this.props.title}/>
    <DevCardBody doc={this.props.doc}
                 props={this.props.props}>
      {this.props.children}
    </DevCardBody>
    </div>;
  }
});

let devCardsToShow = devCardsToShow || [];
let devCardsCandidate = devCardsCandidate || []; 
let timer = null;

let promoteCandidate = function(){
  devCardsToShow = devCardsCandidate.slice(0);
  devCardsCandidate = [];
};

let registerDevCard = function (devcard){
  if(timer){
    clearTimeout(timer);
  }
  timer = setTimeout(promoteCandidate, 300);
  devCardsCandidate.push(devcard);
};

let DevCardsListing = () => {
    let listStyle = {
            listStyle: "none",
            padding: "0px"
          },
          devcards =  devCardsToShow.map((devcard, index) => {
            return <li key={"devcard-"+index}> 
              {React.createElement(devcard)}
            </li>;
        });
  return <ul style={listStyle}>
    {devcards}
  </ul>
};

export let devCard = function(name = "", documentation = "", component, initialState, devCardsOptions = {}){
  let dc = () => {
    return <DevCard title={name}
                    doc={documentation}
                    props={initialState}>
      {component()}
    </DevCard>
  };
  registerDevCard(dc);
};

const devcardsElementId = "devcards";

let addBaseIfNessecary = function(){
  if(!document.getElementById("devcards")){
    const head = document.getElementsByTagName("head")[0];
    const body = document.getElementsByTagName("body")[0];
    const stuffToAdd = [
      //{type: "style", src: "styles/github.css"},
      {type: "node", id:devcardsElementId}
    ];
    stuffToAdd.forEach(function(stuff){
      if(stuff.type === "script"){
        const elm = document.createElement("script");
        elm.setAttribute("src", stuff.src);
        head.appendChild(elm);
      }else if(stuff.type === "style"){
        const elm = document.createElement("link");
        elm.setAttribute("rel", "stylesheet");
        elm.setAttribute("href", stuff.src);
        head.appendChild(elm);
      }else if(stuff.type === "node"){
        const elm = document.createElement("div");
        elm.setAttribute("id", stuff.id);
        body.appendChild(elm);
      }
    });
  }
};

let render = function(){
  addBaseIfNessecary();
  ReactDOM.render(
    <DevCardsListing/>,
    document.getElementById(devcardsElementId));
};

let loop = function(){
  render();
  requestAnimationFrame(loop);
};

export let startRenderLoop = loop;
