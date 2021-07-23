// @jsx window.createElem
const Draggable = require('draggable');

const programsList = ['tiles', 'hakr', 'reader', 'steel'];
const hasLoaded = {};
programsList.forEach((name) => { hasLoaded[name] = false; });

function loadProgram(name) {
	if (!hasLoaded[name]) {

		loadPage(`os/programs/${name}`, '#programs');
		const programElem = $(`#program-${name}`);
		programElem.classList.add('draggable');
		programElem.prepend(
			<div class="program-topbar">
				<div class="program-title">{name[0].toUpperCase() + name.slice(1)}</div>
				<div class="program-close" data-name={name}>&times;</div>
			</div>
		);
		onClick(`#program-${name} .program-close`, () => closeProgram(name));

		const dragLimit = { x: [0, window.innerWidth - 100], y: [0, window.innerHeight - 30] };
		new Draggable(programElem, { limit: dragLimit });

		programsList.forEach((progName) => {
			if (progName === name) return;
			removeElem(`#program-${progName}`);
			hasLoaded[progName] = false;
		});
		hasLoaded[name] = !hasLoaded[name];
	}
}

function closeProgram(name) {
	console.info(`> Closing os/desktop/${name}`);
	removeElem(`#program-${name}`);
	hasLoaded[name] = false;
}

(function init() {
	$('#desktop').style.backgroundImage = `url('${window.root}/static/desktop-background.png')`;

	programsList.forEach((name) => {

		const icons = { tiles: '📁', hakr: 'λ', reader: '🖻', steel: '🜘' };

		$('#desktop').appendChild(
			<div id={`desktop-icon-${name}`} class="centered desktop-icon">
				<span class="desktop-icon-image">{icons[name]}</span>
				<span class="desktop-icon-name">{name}</span>
			</div>
		);
		onClick(`#desktop-icon-${name} .desktop-icon-image`, () => loadProgram(name));

		$('#taskbar-icons').appendChild(
			<div class="taskbar-icon centered clickable" id={`taskbar-icon-${name}`}>
				{icons[name]}
			</div>
		);
		onClick(`#taskbar-icon-${name}`, () => loadProgram(name));

	});
})();
