// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	window.loadPage = require('./load');
	window.loadPage('os/login');
});
