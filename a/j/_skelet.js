var skelet = function() {
		this.$el = document.querySelector('#');
	},
	p = skelet.prototype;

p.init = function() {
	this.events();
	return this;
}

p.events = function() {
	this.$el.addEventListener('click', );
}