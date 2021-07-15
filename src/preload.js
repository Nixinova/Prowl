// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	window.$ = (sel) => document.querySelector(sel);
	window.root = __dirname.replace(/\\/g, '/');
	window.loadPage = require('./load');
	window.loadPage('os/login');
});
