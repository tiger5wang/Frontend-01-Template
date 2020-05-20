const css = require('css');


let rules = [];  // 用于存放CSS规则


module.exports.addCSSRules = function (text) {
	var ast = css.parse(text);
	// console.log(JSON.stringify(ast, null, '        '));
	rules.push(...ast.stylesheet.rules);
}


function match(element, selector) {
	if(!selector || !element.attributes) return false;
	
	if(selector.charAt(0) === '#') {
		let attr = element.attributes.filter(attr => attr.name === 'id')[0];
		if(attr && attr.value === selector.replace('#', '')) {
			return true;
		}
	} else if(selector.charAt(0) === '.') {
		let attr = element.attributes.filter(attr => attr.name === 'class')[0];
		if(attr && attr.value === selector.replace('.', '')) {
			return true;
		}
	} else {
		return element.tagName === selector
		// if(element.tagName === selector) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
}

module.exports.computeCSS = function(element, stack) {
	const elements = stack.slice().reverse();
	
	if(!element.computedStyle)
		element.computedStyle = {};
	
	for(let rule of rules) {
		let selectorParts = rule.selectors[0].split(' ').reverse();
		
		if(!match(element, selectorParts[0])) continue;
		
		let matched = false;
		let j = 1;
		
		for(let i=0; i<elements.length; i++) {
			if(match(elements[i], selectorParts[j])) {
				j++;
			}
			if(j >= selectorParts.length) break;
		}
		
		if(j >= selectorParts.length) {
			matched = true;
		}
		
		if(matched) {
			// 生成computed 属性
			// 如果匹配到，我们要加入
			let computedStyle = element.computedStyle;
			for(let declaration of rule.declarations) {
				if(!computedStyle[declaration.property]) {
					computedStyle[declaration.property] = {}  // 预留用作优先级判断
				}
				computedStyle[declaration.property].value = declaration.value
			}
			console.log(computedStyle)
		}
	}
}