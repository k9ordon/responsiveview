var mainbar = function() {
		this.$el = document.querySelector('#mainbar');
		this.$navigationForm = document.querySelector('form#navigation');
		this.$deviceSelect = document.querySelector('select#deviceSelect');
	},
	p = mainbar.prototype;

p.init = function() {
	console.log(['mainbar init', this.$el]);
	this.createDeviceSelect();
	this.events();
	
	return this;
}

p.events = function() {
	this.$navigationForm.addEventListener('submit', this.loadHref);
}

p.createDeviceSelect = function() {
	deviceSets.forEach(function(deviceSet, i) {
		var deviceSelectItem = document.createElement('option');
		deviceSelectItem.innerText = deviceSet.name;
		deviceSelectItem.value = i;
		this.deviceSelect.appendChild(deviceSelectItem);
	});
}

p.loadHref = function(e) {
	e.preventDefault();
	console.log(['mainbar load href', this.href.value, e]);

	_stage.loadHref(this.href.value);
}