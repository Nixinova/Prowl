const fs = require('fs');
const cp = require('child_process');
const glob = require('glob');

function compileJSX() {
	glob('./**/*.jsx', (err, files) => {
		if (err) return console.error(err);
		for (const file of files) {
			const outFile = file.replace('.jsx', '.js');
			try { fs.rmSync(outFile); }
			catch { }
			cp.execSync(`babel ${file} >> ${outFile}`);
		}
	});
}

function compileCSS() {
	cp.execSync(`novasheets -c **/*.nvss`);
}

compileJSX();
compileCSS();
