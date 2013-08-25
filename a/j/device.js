var device = function() {
		this.deviceData;

		this.$el;
		this.$hardware;
		this.$iframe;
		this.$name;

		this.elSize = {
			h: null,
			w: null
		};
		this.hardwareSize = {
			h: null,
			w: null
		};
	},
	p = device.prototype;

p.init = function(deviceData) {
	this.createDevice();
	this.events();

	this.update(deviceData);

	return this;
}

p.createDevice = function() {
	// main el
	this.$el = document.createElement('div');
	this.$el.classList.add('device');

	// hardware
	this.$hardware = document.createElement('div');
	this.$hardware.classList.add('hardware');

	// frame
	this.$iframe = document.createElement('iframe');

	// info
	this.$name = document.createElement('div');
	this.$name.classList.add('name');

	this.$el.appendChild(this.$name);

	this.$hardware.appendChild(this.$iframe);
	this.$el.appendChild(this.$hardware);

	_stage.$el.appendChild(this.$el);
}

p.events = function() {
	//this.$iframe.addEventListener('focus', this.$el);
	//this.$iframe.addEventListener('load', this.sendIframeLoad);
}

p.update = function(data) {
	this.deviceData = data;

	this.$name.innerText = data.w  + 'x' + data.h + ' ' + data.name;
	this.$iframe.height = data.h;
	this.$iframe.width = data.w;

	// remove other types ... lame
    this.$hardware.className = 'hardware';
	this.$hardware.classList.add(data.type);

	this.getHardwareSize();
}

p.getHardwareSize = function() {
	var $dummy = this.$el.cloneNode(true),
		$dummyHardware = $dummy.querySelector('.hardware');
	$dummy.classList.add('dummy');
	$dummy.querySelector('iframe').src = '';
	$dummyHardware.style.width = "auto";
	$dummyHardware.style.height = "auto";
	$dummy.style.width = "auto";
	$dummy.style.height = "auto";
	_stage.$el.appendChild($dummy);

	this.elSize = {
		h: $dummy.offsetHeight,
		w: $dummy.offsetWidth
	};
	this.hardwareSize = {
		h: $dummyHardware.offsetHeight,
		w: $dummyHardware.offsetWidth
	};

	_stage.$el.removeChild($dummy);
}

p.updateHref = function(href) {
	this.$iframe.src = href;
}

// resizes a device based on a scale factor
p.updateScale = function(scale) {
	this.$el.style.width = (this.elSize.w) * scale;
	this.$el.style.height = (this.elSize.h) * scale;

	this.$hardware.style.width = this.hardwareSize.w;
    this.$hardware.style.height = this.hardwareSize.h;

	this.$hardware.style.webkitTransform = "scale(" + scale + ")";
}

p.destroy = function() {
	_stage.$el.removeChild(this.$el);
}