if(!!window.webkitURL == false) {
    alert('Built for webkit browsers!');
}

var _userhistory = new userhistory();
_userhistory.init();

var _mainbar = new mainbar();
_mainbar.init();

var _stage = new stage();
_stage.init();

if(window.location.hash) {
    var hashUrl = window.location.hash.substring(1);
    setTimeout(function() { _stage.setHref(hashUrl) }, 100);
} else {
    //_stage.setHref('hello.html');
    _stage.setHref('http://k94n.com');
}
