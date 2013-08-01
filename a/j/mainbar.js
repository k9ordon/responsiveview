var mainbar = function() {
		this.$el = document.querySelector('#mainbar');
		this.$navigationForm = document.querySelector('form#navigation');
		this.$deviceSetSelect = document.querySelector('select#deviceSetSelect');
		this.$deviceScaleSelect = document.querySelector('select#deviceScaleSelect');	
		this.$focusState = document.querySelector('#focusState');	
	},
	p = mainbar.prototype;

p.init = function() {
	//console.log(['mainbar init', this.$el]);
	this.createDeviceSelect();
	this.events();

	return this;
}

p.events = function() {
	this.$navigationForm.addEventListener('submit', this.updateHref);
	this.$deviceSetSelect.addEventListener('change', this.updateDeviceSet);
	this.$deviceScaleSelect.addEventListener('change', this.updateDeviceScale);

	window.addEventListener('focus', this.updateFocus);
	window.addEventListener('blur', this.updateFocus);

	document.addEventListener('keyup', this.keyupHandler);
}

p.keyupHandler = function(e) {
	console.log(['keydown', e.keyCode]);

	// 1-9 for set scale
	if(e.keyCode >= 49 && e.keyCode <= 57) {
		var idx = e.keyCode - 49;
		if(idx < _mainbar.$deviceScaleSelect.length) {
			_mainbar.$deviceScaleSelect.value = _mainbar.$deviceScaleSelect.querySelectorAll('option')[idx].value;
			_mainbar.updateDeviceSet();
			console.log(['device set change', idx]);
		}
	}

	// q toggle 100% || scaled
	if(e.keyCode == 81) {
		_mainbar.$deviceSetSelect.value
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
	//console.log(['mainbar load href', this.href.value, e]);
	_stage.updateHref(this.href.value);
}

p.updateDeviceSet = function(e) {
	//console.debug(['changed device set', this.value, deviceSets[this.value], e]);
	_stage.updateDeviceSet(_mainbar.getDeviceSet());
}

p.getDeviceSet = function() {
	return deviceSets[this.$deviceSetSelect.value];
}

p.updateDeviceScale = function(e) {
	//console.debug(['changed device scale', this.value, _mainbar.getDeviceScale()]);
	_stage.updateDeviceScale(_mainbar.getDeviceScale());
}

p.getDeviceScale = function() {
	return this.$deviceScaleSelect.value;
}

p.updateFocus = function(e) {
	console.log(['focus changed', document.activeElement]);
	if(document.activeElement == window.document.body) {
		_mainbar.$focusState.innerText = 'on';
		_stage.unfocusAllDevices();
	}
	else {
		_mainbar.$focusState.innerText = 'off';
		_stage.focusDevice(document.activeElement);
	}
}