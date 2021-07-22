setTimeout(function () {
	document.querySelectorAll('.change-onload').forEach(elem => elem.classList.toggle('hide'));
}, Math.floor(Math.random() * 2e3));

document.querySelector('#login-button').addEventListener('click', function () {
	window.loadPage('os/desktop');
});
