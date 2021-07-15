const fs = require('fs');
const path = require('path');

function loadFile(name) {
	const filepath = path.join(__dirname, 'content', name, name.split('/').slice(-1)[0]);
	const htmlData = fs.readFileSync(filepath + '.html', { encoding: 'utf8' });
	document.querySelector('#dump-html').innerHTML = htmlData;
	document.querySelector('#page-css').href = filepath + '.css';
	require(filepath + '.js');
}

module.exports = loadFile;
