const css = require('css');

module.exports = function (source, map) {
	// console.log(css.parse(source))
	
	// 解析css
	let stylesheet = css.parse(source);
	// 每个 css 文件中 的每一个 css 选择器都添加一个 对应文件名的 class 选择器名
	// console.log(this.resourcePath)
	let name = this.resourcePath.match(/([^\\]+).css$/)[1]  // window
	// let name = this.resourcePath.match(/([^/]+).css$/)[1]   // mac
	// console.log(name)
	
	for (let rule of stylesheet.stylesheet.rules) {
		console.log(rule)
		rule.selectors = rule.selectors.map(selector =>
			selector.match(new RegExp(`.${name}`)) ? selector :
				`${name} ${selector}`
		)
	}
	return `
	let style = document.createElement('style');
style.innerHTML = ${JSON.stringify(css.stringify(stylesheet))}
document.documentElement.appendChild(style)`

}