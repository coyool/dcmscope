global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var nwGui = require('nw.gui');

// append default actions to menu for OSX
var initMenu = function () {
  try {
    var nwGui = require('nw.gui');
    var nativeMenuBar = new nwGui.Menu({type: "menubar"});
    if (process.platform == "darwin") {
      nativeMenuBar.createMacBuiltin && nativeMenuBar.createMacBuiltin("DCMScope");
    }
    nwGui.Window.get().menu = nativeMenuBar;
  } catch (error) {
    console.error(error);
    setTimeout(function () { throw error }, 1);
  }
};

var App = {
  about: function () {
    var params = {toolbar: false, resizable: false, show: true, height: 120, width: 350};
    var aboutWindow = nwGui.Window.open('splash.html', params);
    aboutWindow.on('document-end', function() {
      aboutWindow.focus();
      // open link in default browser
      $(aboutWindow.window.document).find('a').bind('click', function (e) {
        e.preventDefault();
        nwGui.Shell.openExternal(this.href);
      });
    });
  },

  // change folder for sidebar links
  cd: function (anchor) {
    anchor = $(anchor);

    $('#sidebar li').removeClass('active');
    $('#sidebar i').removeClass('icon-white');

    anchor.closest('li').addClass('active');
    anchor.find('i').addClass('icon-white');
    this.setPath(anchor.attr('nw-path'));
  },

  // set path for file explorer
  setPath: function (path) {
    if (path.indexOf('~') == 0) {
      path = path.replace('~', process.env['HOME']);
    }
    this.folder.open(path);
    this.addressbar.set(path);
    localStorage.setItem('dcmscope-latest-working-folder', path);
  }
};

var init_explorer = function() {
  initMenu();

  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  var last_working_dir = localStorage.getItem('dcmscope-latest-working-folder') || (
      process.env[(process.platform == "win32" ? 'USERPROFILE' : 'HOME')])

  global.dcmscope = dcmscope;       //! @dcmscope.html or main.js
  try {
    folder.open( last_working_dir );  //! folder.open()에서 dcmscope.studify()를 호출한다
  } catch(e) {
    folder.open(process.env[(process.platform == "win32" ? 'USERPROFILE' : 'HOME')]);
  }
  addressbar.set(last_working_dir );

  App.folder = folder;
  App.addressbar = addressbar;

  folder.on('navigate', function(dir, mime) {
    if (mime.type == 'folder') {
      addressbar.enter(mime);
    } else {
      //!파일리스트에서, 하나의 파일을 싱글클릭하면 호출된다
      dcmscope.viewDCM( mime.path /* processor를 지정하지않으면 default로 dcmscope.view()가 호출된다 */ );
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });

  // sidebar favorites
  $('[nw-path]').bind('click', function (event) {
    event.preventDefault();
    App.cd(this);
  });
};
