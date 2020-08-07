const fsevents = require('fsevents');

const {exec}  = require('child_process');

exec('http-server');


const stop = fsevents.watch(__dirname, (path, flags, id) => {
	const info = fsevents.getInfo(path, flags, id);
	console.log(info)
	
	exec('webpack')
	// stop(); // To end observation
}); // To start observation
