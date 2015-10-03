var Reloader = Reloader || {};

Reloader.reloadFile = (path) => {
  var x = document.createElement("script");
  x.setAttribute("src",path + "?rel=" + (new Date().getTime()));
  document.body.appendChild(x);
  setTimeout(function(){ 
    document.body.removeChild(x);
  }, 1000);
}

Reloader.startReloading = (files) => {
  setTimeout(function() {
    console.log("--- reloading --- " + new Date());
    files.map(Reloader.reloadFile);
  }, 500);
}

Reloader.startReloading(["build/reloader.js", "build/reactHelpers.js", "build/core.js", "build/index.js"])

