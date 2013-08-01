var mainbar = function() {
		this.$el = document.querySelector('#mainbar');
		this.$navigationForm = document.querySelector('form#navigation');
		this.$deviceSetSelect = document.querySelector('select#deviceSetSelect');
		this.$deviceScaleSelect = document.querySelector('select#deviceScaleSelect');	
	},
	p = mainbar.prototype;

p.init = function() {
	console.log(['mainbar init', this.$el]);
	this.createDeviceSelect();
	this.events();

	return this;
}

p.events = function() {
	this.$navigationForm.addEventListener('submit', this.updateHref);
	this.$deviceSetSelect.addEventListener('change', this.updateDeviceSet);
	this.$deviceScaleSelect.addEventListener('change', this.updateDeviceScale);
}

p.createDeviceSelect = function() {
	deviceSets.forEach(function(deviceSet, i) {
		var deviceSelectItem = document.createElement('option');
		deviceSelectItem.innerText = deviceSet.name;
		deviceSelectItem.value = i;
		this.deviceSetSelect.appendChild(deviceSelectItem);
	});
}

p.updateHref = function(e) {
	e.preventDefault();
	console.log(['mainbar load href', this.href.value, e]);
	_stage.updateHref(this.href.value);
}

p.updateDeviceSet = function(e) {
	console.log(['changed device set', this.value, deviceSets[this.value], e]);
	_stage.updateDeviceSet(_mainbar.getDeviceSet());
}

p.getDeviceSet = function() {
	return deviceSets[this.$deviceSetSelect.value];
}

p.updateDeviceScale = function(e) {
	console.log(['changed device scale', this.value, _mainbar.getDeviceScale()]);

	_stage.updateDeviceScale(_mainbar.getDeviceScale());
}

p.getDeviceScale = function() {
	return this.$deviceScaleSelect.value;
}