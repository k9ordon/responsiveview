console.log('background loaded');

chrome.browserAction.setBadgeText({text : 'ninja'});

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Button Pressed', tab.url);

    chrome.tabs.executeScript({
        code: 'console.log("yo");//document.body.style.backgroundColor="red";'
    });
});

var onRequest = function (request, sender, sendResponse) {
    console.log('onRequest', sender, request);

    if(request.method === 'setBadgeText') {
        chrome.browserAction.setBadgeText({text : request.text});
    }
    if(request.method === 'log') {
        console.log('client: ', request.log);
    } 
    else if(request.method === 'isValidSubframe') {
        sendResponse(isValidSubframe(request, sender));
    }
    
    sendResponse({});
};

var isValidSubframe = function(request, sender) {
    console.log('isValidIframe?', request, sender);
    return true;
}

chrome.extension.onRequest.addListener(onRequest);