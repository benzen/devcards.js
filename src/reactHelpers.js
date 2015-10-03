const comp = function(comp_proto){
  if(typeof comp_proto === "function"){
    return React.createClass({render:comp_proto});
  }else if (typeof comp_proto == "object"){
    return React.createClass(comp_proto)
  }
}

