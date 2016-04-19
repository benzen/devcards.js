import React from "react"
import ReactDOM from 'react-dom'

import {DevCardsApp, DevCard} from './components'

let devCardsToShow = [];
let devCardsCandidate = []; 
let timer = null;
let activeComponent = ""
const onSelectComponent = (component) => {
  activeComponent = component;
  render()
}

const promoteCandidate = function(){
  devCardsToShow = devCardsCandidate.slice(0);
  devCardsCandidate = [];
  render()
};

const registerDevCard = function (devcard){
  if(timer){
    clearTimeout(timer);
  }
  timer = setTimeout(promoteCandidate, 100);
  devCardsCandidate.push(devcard);
};



export const devCard = (title, component, props, documentation = "", devCardsOptions = {}) => {
  const dc = _ => <DevCard title={title}
                    doc={documentation}
                    props={props}
                    component={component}/>
  registerDevCard({componentName:component.name, cardTitle: title, devcard:dc});
}

const devcardsElementId = "devcards";

const addBaseIfNessecary = function(){
  if(!document.getElementById("devcards")){
    const head = document.getElementsByTagName("head")[0];
    const body = document.getElementsByTagName("body")[0];
    const stuffToAdd = [
      {type: "style", src: "styles/github.css"},
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

const render = function(){
  addBaseIfNessecary();
  ReactDOM.render(
    <DevCardsApp devcards={devCardsToShow} activeComponent={activeComponent} onSelectComponent={onSelectComponent}/>,
    document.getElementById(devcardsElementId));
};

export const startRenderLoop = render;
