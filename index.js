var comp = function(comp_proto){
  if(typeof comp_proto === "function"){
    return React.createClass({render:comp_proto});
  }else if (typeof comp_proto == "object"){
    return React.createClass(comp_proto)
  }
}
  
var DevCardTitle = DevCardTitle || comp(function(){
  const titleStyle = {
    backgroundColor: "rgb(239, 237, 237)",
    color: "#666",
    padding: "8px 15px"
  },
  title = this.props.value || "";

  if (!title) { return null; }
  
  return <div style={titleStyle}>
    {title}
  </div>;
});

var DevCardDoc = DevCardDoc || comp(function(){
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
  const mdDoc = this.props.value || "",
        doc = {__html: markdownToHtml(markdownHanlder(), mdDoc)};
  if (!doc) { return null; }
  return <div dangerouslySetInnerHTML={doc}/>
});

var DevCardsPropsDisplay = DevCardsPropsDisplay || comp(function(){
  if(!this.props.props){ return null; }
  const json = JSON.stringify(this.props.props); 
  return <pre><code className="hljs json">{json}</code></pre>
});
var DevCardBody = DevCardBody || comp(function(){
  const bodyStyle = {
    margin: "5px"
  };
  return <div style={bodyStyle}>
    <DevCardDoc value={this.props.doc}/>
    {this.props.children}
    <DevCardsPropsDisplay props={this.props.props}/> 
  </div>;
});

var DevCard = DevCard || comp(function(){
  const cardStyle = {
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
});

let devCardsToShow = devCardsToShow || [];
let registerDevCards = registerDevCards || function(card){
  devCardsToShow.push(card);
};

var DevCardsListing = DevCardsListing || comp(function(){
  const listStyle = {
         listStyle: "none"
        },
        devcards = devCardsToShow.map(
          (devcard, index) => {
            return <li key={"devcard-"+index}> {devcard} </li>
          });
  return <ul style={listStyle}>
    {devcards}
  </ul>
});


var MyComponent = MyComponent || comp(function(){
  return <div>"MY ELM" {this.props.str}</div>
});

var MyDevCard = MyDevCard || comp(function(){
  const cmpParam = {
    str: "hello"
  }
  return  <DevCard doc="This is an important card"
                   title="MyPersonal dev cards">
            <MyComponent {...cmpParam}/>
          </DevCard>
});
//registerDevCards(<MyDevCard/>);
  
var My2DevCard = My2DevCard || comp(function(){
  const doc = "## abx\n \
  ### def\n\
  What if i make a multi \n\
  line markdown \n\
  \n\
  \n\
  Here is some *weird* String! Don\'t You thinK Paulie?\
  "
  return  <DevCard doc={doc}
                   title="A card with makrdown">
            <MyComponent str="eco"/>
          </DevCard>
});
registerDevCards(<My2DevCard/>);

var InteractiveCard = InteractiveCard || comp(function(){
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

var My3DevCard = My3DevCard || comp(function(){
  return  <DevCard title="My interactive card">
            <InteractiveCard/>
          </DevCard>
});
//registerDevCards(<My3DevCard/>);

var InteractiveCardV2 = InteractiveCardV2 || comp({
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
let props = {
  cmpt: 1,
  inc: function(){
    props.cmpt = props.cmpt + 1;
}};

var My3DevCardV2 = My3DevCardV2 || comp(function(){
  return <DevCard title="My interactive card v2 just"
                  props={props}>
    <InteractiveCardV2 {...props}/>
  </DevCard>;
});
registerDevCards(<My3DevCardV2/>);

let render = render || function(){
  React.render(
    <DevCardsListing/>,
    document.getElementById('example'));
};

setInterval(
  function(){
    requestAnimationFrame(render);
  }
, 10);

