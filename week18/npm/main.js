const npm = require('npm');

let config = {
	"name": "frontend-01-template",
	"version": "1.0.0",
	"description": "## 讲师课件下载地址",
	"main": "main.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"repository": {
		"type": "git",
		"url": "git+https://github.com/tiger5wang/Frontend-01-Template.git"
	},
	"author": "",
	"license": "ISC",
	"bugs": {
		"url": "https://github.com/tiger5wang/Frontend-01-Template/issues"
	},
	"homepage": "https://github.com/tiger5wang/Frontend-01-Template#readme",
	"dependencies": {
		"npm": "^6.14.7"
	}

};


npm.load(config, err => {
	npm.install('webpack', err => {
		console.log(err)
	})
});


