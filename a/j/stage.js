var stage = function() {
        // stage element
		this.$el = document.querySelector('#stage');
		
        // array of device instances
        this.devices = [];

        // currently displayed website
		this.href = null;

        // currently displayed website origin
        this.origin = null;

        // is stage stage focused (or device)
        this.isFocused = false;

	}, p = stage.prototype;

p.init = function() {
	this.events();
	return this;
}

p.events = function() {
    // get messages from subframe
    window.addEventListener("message", this.onMessage, false);
    
    // scale on scroll
    // document.addEventListener("scroll", this.onScroll, false);

    // mouseover stage
    //document.addEventListener("mouseover", this.onFocus, false);
    //document.addEventListener("focus", this.onFocus, false);
    //document.addEventListener("blur", this)
}

p.onScroll = function(event) {
    // round (scrollTop / (page size / 100) / 10) / 10
    var percent = Math.round(
        (document.body.scrollTop / ((document.body.offsetHeight - window.innerHeight) / 100)) / 10
    ) / 10;

    // min 0.1
    percent = percent ? percent : 0.1;

    // update scale on mainbar
    _mainbar.$deviceScaleSelect.value = percent;

    // update devices
    _stage.updateDeviceScale(percent);
}

p.onFocus = function() {
    _stage.isFocused = true;
    console.log('stage focused');
}

// get messages from subframe
p.onMessage = function(event){
    switch (event.data.method) {
        // subframe handshake
        case 'handshake' :
            _stage.deviceHandshake(event);
            break;

        // subframe scrolls
        case 'scroll' :
            _stage.updateScroll(event.data.scrollTop, event.data.scrollLeft, event.data.idx);
            break;
    }
};

// register a subframe handshake as device
p.deviceHandshake = function(event) {
    var request = event.data;
    console.log('stage.registered handshake', request.l, request.r, this.href, this.origin);

    if(this.href == null // initial handshake
        || this.href == request.l // new frame handshake
        || this.href == request.r) // page change in subframe
        {

        for(var i = 0; i < this.devices.length; i++) {
            // sussess if device size match
            if(this.devices[i].deviceData.w == request.w && this.devices[i].deviceData.h == request.h) {
                console.log('handshake ok!', request.l);

                // send handshake back to subframe
                this.origin = event.origin;
                this.devices[i].$iframe.contentWindow.postMessage({method: 'handshake', deviceIdx : i}, event.origin);

                // update stage href if valid handshake from another location
                if(this.href != request.l) {
                    this.setHref(request.l);
                    this.updateStageHref(request.l)
                }
            }
        }
    }
}

// update current stage href 
p.updateStageHref = function(href) {
    this.href = href;
    window.location.hash = href;
}

// setter for stage href
p.setHref = function(href) {
    this.href = null;

	if(this.devices.length == 0) {
		this.updateDeviceSet(_mainbar.getDeviceSet());
	}
    // update all subframes
	for(var i = 0; i < this.devices.length; i++) {
		this.devices[i].updateHref(href);
	}
    _mainbar.$navigationForm.href.value = href;
}

// update scroll for all subframes (except idx)
p.updateScroll = function(top, left, srcIdx) {
    for(var i = 0; i < this.devices.length; i++) {
        if(i != srcIdx) {
            this.devices[i].$iframe.contentWindow.postMessage({method: 'scroll',
                top : top, left: left}, this.origin);
        }
    }
}

// update device set in stage
p.updateDeviceSet = function(deviceSet) {
	var devices = deviceSet.devices,
		currentCount = this.devices.length,
		newCount = devices.length,
		iterations = newCount >= currentCount ? newCount : currentCount,
		newDevices = [];

	for(var i = 1; i <= iterations; i++) {
        // create device
		if(i <= newCount && i > currentCount) {
			var newDevice = new device().init(devices[i-1]);
			newDevices.push(newDevice);
			newDevice.updateHref(this.href);
		}
		else if(i <= currentCount && i > newCount) {
			// remove device
			this.devices[i-1].destroy();
		}
		else {
			newDevices.push(this.devices[i-1]);
			this.devices[i-1].update(devices[i-1]);
		}
	}

	this.devices = newDevices;
	this.updateDeviceScale(_mainbar.getDeviceScale());
}

p.updateDeviceScale = function(scale) {
	for(var i = 0; i < this.devices.length; i++) {
		this.devices[i].updateScale(scale);
	}
}

p.focusDevice = function($iframe) {
	this.unfocusAllDevices();
	for(var i = 0; i < this.devices.length; i++) {
		console.log(['focusDevice Loop', $iframe, this.devices[i].$iframe]);
		if(this.devices[i].$iframe == $iframe) {
			this.devices[i].$el.classList.add('focus');
		}
	}
}

p.unfocusAllDevices = function() {
	for(var i = 0; i < this.devices.length; i++) {
		this.devices[i].$el.classList.remove('focus');
	}
}