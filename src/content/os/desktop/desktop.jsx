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
		const programTopbar = (
			<div class="program-topbar">
				<div class="program-topbar">
					<div class="program-title">{name[0].toUpperCase() + name.slice(1)}</div>
					<div class="program-close" data-name={name}>&times;</div>
				</div>
			</div>
		)
		programElem.prepend(programTopbar);

		const dragOpts = {
			limit: {
				x: [0, window.innerWidth - 100],
				y: [0, window.innerHeight - 30],
			},
		};
		new Draggable(programElem, dragOpts);
		programsList.forEach((progName) => {
			if (progName === name) return;
			removeElem(`#program-${progName}`);
			hasLoaded[progName] = false;
		});

		$(`#program-${name} .program-close`).addEventListener('click', () => closeProgram(name));

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
		['desktop', 'taskbar'].forEach((part) => {
			$(`#${part}-icon-${name}`).addEventListener('click', () => loadProgram(name))
		})
	});
})();
