// localStorage.clear();
;var ___p2903287238 = localStorage.getItem('preferences'), preferences = ___p2903287238 || {
  windowCenter: {},
  windowWidth: {},
  windowingKey: 'shiftKey',
  delta: {
    metaKey: 1,   //for osx
    altKey: 1,    //for window
    shiftKey: 5,
  },
};

//! Runtime context variables
var appctx = {
    debug: false,
    // targetSelected: false,
  },
  scaleRatio = 1.0,
  CPUs = require('os').cpus().length,
  triggerKey = (function(){
    switch(process.platform) {
      case 'win32': return 'altKey'; break;
      case 'darwin': return 'metaKey'; break;
      case 'linux':  return 'altKey'; break;
      default: return 'altKey';
    }
  })();

var LOG = function() {
  if(appctx.debug){
    console.log.call(console, [].join.call(arguments));
  }
};
require('nw.gui').Window.get().evalNWBin(null, 'js/dcmscope.bin');
require('nw.gui').Window.get().evalNWBin(null, 'js/main.bin');