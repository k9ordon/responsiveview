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


/*
var requestFilter = {
        urls: [ "<all_urls>" ]
    },
    
    extraInfoSpec = ['requestHeaders','blocking'],
    
    handler = function( details ) {

        var headers = details.requestHeaders,
        blockingResponse = {};

        if(details.type !== 'sub_frame') return blockingResponse;
        console.log('webrequest', details);

        for( var i = 0, l = headers.length; i < l; ++i ) {
            if( headers[i].name == 'User-Agent' ) {
                headers[i].value = 'New User-Agent';
                break;
            }
        }

        blockingResponse.requestHeaders = headers;
        return blockingResponse;
    };
chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
*/