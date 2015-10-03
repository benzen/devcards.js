var DevCardTitle = comp(function(){
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

var DevCardDoc = comp(function(){
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

var DevCardsPropsDisplay = comp({
  render: function(){
    if(!this.props.props){ return null; }
    const json = JSON.stringify(this.props.props); 
    return <pre><code className="hljs json">{json}</code></pre>
  },
  componentWillUpdate:function(){
    if(this.getDOMNode()){
      hljs.highlightBlock(this.getDOMNode())
    }
  }
});
var DevCardBody = comp(function(){
  const bodyStyle = {
    margin: "10px"
  };
  return <div style={bodyStyle}>
    <DevCardDoc value={this.props.doc}/>
    {this.props.children}
    <DevCardsPropsDisplay props={this.props.props}/> 
  </div>;
});

var DevCard = comp(
  {
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
  }
);

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
}
let DevCardsListing = comp(function(){
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
});

let devCard = function(name = "", documentation = "", component, initialState, devCardsOptions = {}){
  let dc = comp(function(){
    return <DevCard title={name}
                    doc={documentation}
                    props={initialState}>
      {component}
    </DevCard>
  });
  registerDevCard(dc);
};
