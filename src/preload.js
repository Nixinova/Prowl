// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	window.$ = (sel) => document.querySelector(sel);
	window.removeElem = (sel) => $(sel)?.parentElement.removeChild($(sel));
	window.createElem = (name, attributes, ...content) => {
		const elem = document.createElement(name);
		for (const [key, val] of Object.entries(attributes)) {
			elem.setAttribute(key, val);
		}
		elem.innerHTML = '';
		for (const item of content) {
			if (typeof item === 'string') elem.innerHTML += item;
			else elem.innerHTML += item.outerHTML;
		}
		return elem;
	};
	window.onClick = (elem, func) => $(elem).addEventListener('click', func);
	window.random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
	window.root = __dirname.replace(/\\/g, '/');
	window.loadPage = require('./load');
	window.loadPage('os/login');
});
