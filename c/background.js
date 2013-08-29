//chrome.browserAction.setBadgeText({text : 'ninja'});
chrome.browserAction.onClicked.addListener(function(tab) {
    if(tab.url.indexOf(rv_host) !== 0) {
        chrome.tabs.update(tab.id, {url: rv_host + '#' + tab.url});
    }
});

var onRequest = function (request, sender, sendResponse) {
    console.log('onRequest', sender, request);
    sendResponse({});
};
chrome.extension.onRequest.addListener(onRequest);


/*

// modify useragent onBeforeSendHeaders

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

// modify xframe header

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        var headers = info.responseHeaders;
        for (var i=headers.length-1; i>=0; --i) {
            var header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options') {
                headers.splice(i, 1); // Remove header
                console.log('removed x-frame', info);
            }
        }
        return {responseHeaders: headers};
    },
    {
        urls: [ '*://*/*' ], // Pattern to match all http(s) pages
        types: [ 'sub_frame' ]
    },
    ['blocking', 'responseHeaders']
);