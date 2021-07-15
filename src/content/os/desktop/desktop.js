const Draggable = require('draggable');

$('#desktop').style.backgroundImage = `url('${window.root}/static/desktop-background.png')`;

const programsList = ['tiles', 'hakr', 'reader', 'steel'];

const hasLoaded = {};
programsList.forEach((name) => { hasLoaded[name] = false; });

function updateTaskbar() {
	const taskbarIcons = $('#taskbar-icons');
	taskbarIcons.innerHTML = '';
	Object.entries(hasLoaded).forEach(([name, hasLoaded]) => {
		if (hasLoaded) taskbarIcons.innerHTML += `
			<div class="taskbar-icon" id="taskbar-${name}">${name[0].toUpperCase() + name.slice(1)}</div>
		`;
	});
	document.querySelectorAll('.program-topbar .program-close').forEach(elem => {
		elem.addEventListener('click', () => closeProgram(elem.dataset.name));
	});
}

function loadProgram(name) {
	if (!hasLoaded[name]) {

		loadPage(`os/programs/${name}`, '#programs');
		const programElem = $(`#program-${name}`);
		programElem.classList.add('draggable');
		programElem.innerHTML = `
			<div class="program-topbar">
				<div class="program-title">${name[0].toUpperCase() + name.slice(1)}</div>
				<div class="program-close" data-name="${name}">&times;</div>
			</div>
		`+ programElem.innerHTML;

		const dragOpts = {
			limit: {
				x: [0, window.innerWidth - 100],
				y: [0, window.innerHeight - 30],
			},
		};
		new Draggable(programElem, dragOpts);
		programsList.forEach((name) => {
			const programElem = $(`#program-${name}`);
			if (programElem) new Draggable(programElem, dragOpts);
		});

	}
	hasLoaded[name] = !hasLoaded[name];
	updateTaskbar();
}

function closeProgram(name) {
	console.info(`> Closing os/desktop/${name}`);
	const programElem = $(`#program-${name}`);
	programElem?.parentElement.removeChild(programElem);
	hasLoaded[name] = false;
	updateTaskbar();
}

programsList.forEach((name) => {
	$(`#desktop-icon-${name}`).addEventListener('click', () => loadProgram(name));
});
