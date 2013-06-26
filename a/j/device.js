var device = function() {
		this.deviceData;

		this.$el;
		this.$iframe;
		this.$name;
		this.$size;
	},
	p = device.prototype;

p.init = function(deviceData) {
	this.deviceData = deviceData;
	this.createDevice();
	this.events();

	return this;
}

p.createDevice = function() {
	// main el
	this.$el = document.createElement('div');
	this.$el.classList.add('device');

	// frame
	this.$iframe = document.createElement('iframe');

	// info
	this.$name = document.createElement('div');
	this.$name.classList.add('name');

	this.$size = document.createElement('div');	
	this.$size.classList.add('size');

	this.$el.appendChild(this.$name);
	this.$el.appendChild(this.$size);
	this.$el.appendChild(this.$iframe);
	_stage.$el.appendChild(this.$el);
}

p.events = function() {
	this.$el.addEventListener('resize', this.$el);
}