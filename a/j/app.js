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
    _stage.setHref(hashUrl);
} else {
    //_stage.setHref('hello.html');
    _stage.setHref('http://k94n.com');
}
