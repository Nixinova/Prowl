// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	window.$ = (sel) => document.querySelector(sel);
	window.removeElem = (sel) => $(sel)?.parentElement.removeChild($(sel));
	window.createElem = (name, { id, classes, data }) => {
		const elem = document.createElement(name);
		if (id) elem.id = id;
		if (classes) elem.setAttribute('class', classes);
		if (data) Object.assign(elem.dataset, data);
		return elem;
	};
	window.root = __dirname.replace(/\\/g, '/');
	window.loadPage = require('./load');
	window.loadPage('os/login');
});
