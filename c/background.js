//chrome.browserAction.setBadgeText({text : 'ninja'});
var browserActionHandler = function(tab) {
    if(tab.url.indexOf(rv_host) !== 0) {
        chrome.tabs.update(tab.id, {url: rv_host + '#' + tab.url});
    }
};
chrome.browserAction.onClicked.addListener(browserActionHandler);


// modify useragent onBeforeSendHeaders

var frameAgents = {},
    requestFilter = { urls: [ "<all_urls>" ] },
    info = ['requestHeaders','blocking'];
    
var onBeforeSendHeadersHandler = function(details) {
    var headers = details.requestHeaders,
        blockingResponse = {};

    if(details.type !== 'sub_frame') return blockingResponse;
    //console.log('webrequest', details.frameId, details.url);

    // check if url is handshake
    var handshake = details.url.split("http://handshake/#")[1];

    if(handshake) {
        console.log('is handshake request' + handshake);
        frameAgents[details.frameId] = handshake;
        return {cancel: true};
    }

    if(frameAgents.hasOwnProperty(details.frameId)) {
        for( var i = 0, l = headers.length; i < l; ++i ) {
            if( headers[i].name == 'User-Agent' ) {
                headers[i].value = frameAgents[details.frameId];
                break;
            }
        }

        blockingResponse.requestHeaders = headers;
        //blockingResponse.redirectUrl = ""+(details.url.split("#handshake"))[0];
    }

    return blockingResponse;
};

var onHeadersReceivedHandler = function(details) {
    var headers = details.responseHeaders || [],
        blockingResponse = {};

    if(details.type !== 'sub_frame') return blockingResponse;
    //console.log('webrequest end', details);

    for (var i=headers.length-1; i>=0; --i) {
        var header = headers[i].name.toLowerCase();
        if (header == 'x-frame-options' || header == 'frame-options') {
            headers.splice(i, 1); // Remove header
            console.log('removed x-frame', details);
        }
    }

    blockingResponse.requestHeaders = headers;
    return blockingResponse;
};

chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeadersHandler, requestFilter, info);
chrome.webRequest.onHeadersReceived.addListener(onHeadersReceivedHandler, requestFilter);