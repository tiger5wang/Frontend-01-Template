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

function specificity(selector) {
    let p = [0,0,0,0];
    let selectors = selector.split(' ');
    for (let sel of selectors) {
        if (sel.charAt(0) === '#') {
            p[1] += 1;
        } else if (sel.charAt(0) === '.') {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0])
        return sp1[0] - sp2[0];
    if (sp1[1] - sp2[1])
        return sp1[1] - sp2[1];
    if (sp1[2] - sp2[2])
        return sp1[2] - sp2[2];
    return sp1[3] - sp2[3];
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
            let sp = specificity(rule.selectors[0]);
			let computedStyle = element.computedStyle;
			for(let declaration of rule.declarations) {
				if(!computedStyle[declaration.property]) {
					computedStyle[declaration.property] = {}  // 预留用作优先级判断
				}

                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp;
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
			}
		}
	}
}