var device = function() {
		this.deviceData;

		this.$el;
		this.$iframe;
		this.$name;
		this.$size;
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

p.update = function(data) {
	this.deviceData = data;

	this.$name.innerText = data.name;
	this.$size.innerText = data.h  + 'x' + data.w;
	this.$iframe.height = data.h;
	this.$iframe.width = data.w;
}

p.updateHref = function(href) {
	this.$iframe.src = href;
}

p.updateScale = function(scale) {
	this.$el.style.width = this.deviceData.w * scale;
	this.$el.style.minHeight = this.deviceData.h * scale;
	this.$iframe.style.webkitTransform = "scale(" + scale + ")";
}

p.destroy = function() {
	this.$el.remove();
}