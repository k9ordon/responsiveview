var rv_host = 'http://rv.duro';

if(window.location.origin != rv_host) {
console.log('===> responsive view client injected at ' + window.location.href + ' orgin:' + window.location.origin);

    var rvwaiter = function() { return this; },
        p = rvwaiter.prototype;
    
    p.init = function() {
        console.log('rv waiter init');
        addEventListener("message", this.onMessage, false);
        top.postMessage({method: 'handshake', h: window.innerHeight, w: window.innerWidth}, rv_host);
    }

    p.onMessage = function(event) {
        console.log('waiter recived message', event.data);
        if(event.data.method == 'handshake' && event.data.hasOwnProperty('deviceIdx')) {
            removeEventListener("message", _rvwaiter.onMessage);
            _rvclient = new rvclient();
            _rvclient.init(event.data.deviceIdx);
        }
    }

    var _rvclient,
        _rvwaiter = new rvwaiter();
    
    _rvwaiter.init();


    // do this in another file:

    var rvclient = function() {
            this.host = rv_host;
            this.deviceIdx = null;
            this.remoteScroll = false;
            this.removeScrollTimeout = null;
            return this;
        },
        p = rvclient.prototype;

    p.init = function(deviceIdx) {
        console.log('rv client init', deviceIdx);
        this.deviceIdx = deviceIdx;
        this.events();

        return this;
    }

    p.events = function() {
        addEventListener("message", this.onMessage, false);
        window.addEventListener("scroll", this.onScroll, false);
    }

    p.onMessage = function() {
        console.log('client recived message', event.origin, event.data);
        switch (event.data.method) {
            case 'scroll' :
                clearTimeout(this.removeScrollTimeout);
                _rvclient.remoteScroll = true;
                window.scrollTo(event.data.left,event.data.top);
                setTimeout(function() {
                    _rvclient.remoteScroll = false;
                },10);
                break;
        }
    }

    p.onScroll = function() {
        if(_rvclient.remoteScroll == false) {
            top.postMessage({ method: 'scroll', idx: _rvclient.deviceIdx, 
                scrollTop: document.body.scrollTop, 
                scrollLeft: document.body.scrollLeft
            }, _rvclient.host);
        } else {
            console.log('!!!!!!!!!!!! is remote scrolled');
        }
    }


}