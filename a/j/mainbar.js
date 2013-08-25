var mainbar = function() {
		this.$el = document.querySelector('#mainbar');
		this.$userhistoryTrigger = document.querySelector('#userhistoryTrigger');
		this.$navigationForm = document.querySelector('form#navigation');
		this.$deviceSetSelect = document.querySelector('select#deviceSetSelect');
		this.$deviceScaleSelect = document.querySelector('select#deviceScaleSelect');	
	},
	p = mainbar.prototype;

p.init = function() {
	this.createDeviceSelect();
	this.events();
	return this;
}

p.events = function() {
	this.$userhistoryTrigger.addEventListener('click', _userhistory.toggle);
	this.$navigationForm.addEventListener('submit', this.updateHref);
	this.$deviceSetSelect.addEventListener('change', this.updateDeviceSet);
	this.$deviceScaleSelect.addEventListener('change', this.updateDeviceScale);

	document.addEventListener('keyup', this.keyupHandler);
}

p.keyupHandler = function(e) {
	//console.log(['keydown', e.keyCode]);
    if(document.activeElement.tagName === 'INPUT') return;

	// 1-9 for set scale
	if(e.keyCode >= 48 && e.keyCode <= 57) {
		var idx = e.keyCode - 48;
		if(idx < _mainbar.$deviceScaleSelect.length) {
			_mainbar.$deviceScaleSelect.value = _mainbar.$deviceScaleSelect.querySelectorAll('option')[idx].value;
			_mainbar.updateDeviceSet();
			console.log(['device scale change', idx]);
		}
	}
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
	_stage.setHref(this.href.value);
}

p.updateDeviceSet = function(e) {
	_stage.updateDeviceSet(_mainbar.getDeviceSet());
}

p.getDeviceSet = function() {
	return deviceSets[this.$deviceSetSelect.value];
}

p.updateDeviceScale = function(e) {
	_stage.updateDeviceScale(_mainbar.getDeviceScale());
}

p.getDeviceScale = function() {
	return this.$deviceScaleSelect.value;
}