const fs = require('fs');
const path = require('path');

function loadFile(name, appendId) {
	console.info(`> Loading ${name}`);
	const folderName = name.split('/').slice(-1)[0];
	const filepath = path.join(__dirname, 'content', name, folderName);
	let htmlData = '';
	try {
		htmlData = fs.readFileSync(filepath + '.html', { encoding: 'utf8' });
	}
	catch (err) { console.error(err.message); }
	if (appendId) {
		document.querySelector(appendId).innerHTML += htmlData;
		let cssData = '';
		try {
			cssData = fs.readFileSync(filepath + '.css', { encoding: 'utf8' });
		}
		catch (err) { console.error(err.message); }
		document.querySelector('#dump-css').innerText += cssData;
	}
	else {
		document.querySelector('#dump-html').innerHTML = htmlData;
		document.querySelector('#page-css').href = filepath + '.css';
	}
	try {
		require(filepath + '.js');
	}
	catch (err) { console.error(err.message); }
}

module.exports = loadFile;
