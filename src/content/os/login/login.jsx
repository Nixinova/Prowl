setTimeout(function () {
	document.querySelectorAll('.change-onload').forEach(elem => elem.classList.toggle('hide'));
}, random(0, 1e3));

document.querySelector('#login-button').addEventListener('click', function () {
	window.loadPage('os/desktop');
});
