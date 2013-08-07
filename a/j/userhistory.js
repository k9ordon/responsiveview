var userhistory = function() {
		var ls = localStorage.getItem('userhistory');
		this.$el = document.querySelector('#userhistory');
		this.$ul = this.$el.querySelector('ul');
		this.history = JSON.parse(ls?ls:'{}');
	},
	p = userhistory.prototype;

p.init = function() {
	console.log(['userhistory init', this.$el, this.history]);
	this.createList();
	this.events();
	return this;
}

p.events = function() {
}

p.createList = function() {
	console.log(['createList', this.history.length, this.history]);
	for(var idx = Object.keys(this.history).length-1; idx >= 0; idx--) {
		var historyItem = this.history[Object.keys(this.history)[idx]];
		console.log(['historyItem', idx, historyItem]);

		$item = document.createElement('div');
		$item.classList.add('item');

		$link = document.createElement('a');
		$link.href = historyItem.href;
		$link.innerText = historyItem.href;

		$item.appendChild($link);

		this.$ul.appendChild($item);
	}	
}

p.toggle = function() {
	if(_userhistory.$el.classList.contains('visible'))
		_userhistory.hide();
	else
		_userhistory.show();
}

p.show = function() {
	_userhistory.$el.classList.add('visible');
	_mainbar.$userhistoryTrigger.classList.add('visible');
	_stage.$el.classList.add('teaser');
}

p.hide = function() {
	_userhistory.$el.classList.remove('visible');
	_mainbar.$userhistoryTrigger.classList.remove('visible');
	_stage.$el.classList.remove('teaser');
}

p.add = function(href) {
	this.history[new Date().getTime()] = { 'date': new Date().getTime(), 'href': href };
	localStorage.setItem('userhistory', JSON.stringify(this.history));
}