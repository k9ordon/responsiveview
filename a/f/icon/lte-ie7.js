/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-clock' : '&#xe000;',
			'icon-star' : '&#xe001;',
			'icon-refresh' : '&#xe002;',
			'icon-views' : '&#xe003;',
			'icon-magnifier' : '&#xe004;',
			'icon-stack' : '&#xe005;',
			'icon-rotate' : '&#xe006;',
			'icon-heart' : '&#xe007;',
			'icon-heart-2' : '&#xe008;',
			'icon-bookmark' : '&#xe009;',
			'icon-calendar' : '&#xe00a;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};