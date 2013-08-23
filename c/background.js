//chrome.browserAction.setBadgeText({text : 'ninja'});
chrome.browserAction.onClicked.addListener(function(tab) {
    if(tab.url.indexOf(rv_host) !== 0) {
        chrome.tabs.update(tab.id, {url: rv_host + '#' + tab.url});
    } else {
        console.log('already on rv', tab.url);
    }
});

var onRequest = function (request, sender, sendResponse) {
    console.log('onRequest', sender, request);
    sendResponse({});
};
chrome.extension.onRequest.addListener(onRequest);