var stage = function() {
		this.$el = document.querySelector('#stage');
		this.devices = [];
		this.href = null;
	},
	p = stage.prototype;

p.init = function() {
	//console.log(['stage init', this.$el]);
	this.events();
	this.updateHref('hello.html');

	return this;
}

p.events = function() {}

p.updateHref = function(href) {
	this.href = href;

	//console.log(['stage loaded', href, this, _stage.$el]);
	if(this.devices.length == 0) {
		this.updateDeviceSet(_mainbar.getDeviceSet());
	}

	for(var i = 0; i < this.devices.length; i++) {
		//console.log(['stage update device href', i, href]);
		this.devices[i].updateHref(href);
	}
}

p.updateDeviceSet = function(deviceSet) {
	//console.log(['stage change device set', this.devices.length, deviceSet.devices.length]);

	// 1 = 4 - 3 // -2 = 1 - 3
	var devices = deviceSet.devices,
		currentCount = this.devices.length,
		newCount = devices.length,
		iterations = newCount >= currentCount ? newCount : currentCount,
		newDevices = [];

	for(var i = 1; i <= iterations; i++) {
		//console.log(['stage update device', iterations, i, newCount, currentCount, devices[i]]);

		if(i <= newCount && i > currentCount) {
			// create device
			//console.log('new');
			var newDevice = new device().init(devices[i-1]);
			newDevices.push(newDevice);
			newDevice.updateHref(this.href);
		}
		//		4	4				4	3
		else if(i <= currentCount && i > newCount) {
			// remove device
			//console.log('remove');
			this.devices[i-1].destroy();
		}
		else {
			// update device
			//console.log('update');
			newDevices.push(this.devices[i-1]);
			this.devices[i-1].update(devices[i-1]);
		}
	}

	this.devices = newDevices;
	this.updateDeviceScale(_mainbar.getDeviceScale());
	//console.log(['device deploy done.', newDevices]);
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