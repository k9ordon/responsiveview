var stage = function() {
		this.$el = document.querySelector('#stage');
		this.devices = [];
	},
	p = stage.prototype;

p.init = function() {
	console.log(['stage init', this.$el]);
	this.events();

	return this;
}

p.events = function() {}

p.loadHref = function(href) {
	console.log(['stage loaded', href, this, _stage.$el]);
	
	new device().init();
}