var page = require('webpage').create();
page.open('http://k94n.com/', function () {
    console.log(page.render('k94n.png'));
    //phantom.exit();
});