/* css.parse(text) 生成的 ast 树
{
"type": "stylesheet",
"stylesheet": {
	"rules": [
		{
			"type": "rule",
			"selectors": [
				"body div #myid"
			],
			"declarations": [
				{
					"type": "declaration",
					"property": "width",
					"value": "100px",
					"position": {
						"start": {
							"line": 3,
							"column": 5
						},
						"end": {
							"line": 3,
							"column": 16
						}
					}
				},
				{
					"type": "declaration",
					"property": "background-color",
					"value": "#ff5000",
					"position": {
						"start": {
							"line": 4,
							"column": 5
						},
						"end": {
							"line": 4,
							"column": 30
						}
					}
				}
			],
			"position": {
				"start": {
					"line": 2,
					"column": 1
				},
				"end": {
					"line": 5,
					"column": 2
				}
			}
		},
		{
			"type": "rule",
			"selectors": [
				"body div img"
			],
			"declarations": [
				{
					"type": "declaration",
					"property": "width",
					"value": "30px",
					"position": {
						"start": {
							"line": 7,
							"column": 5
						},
						"end": {
							"line": 7,
							"column": 15
						}
					}
				},
				{
					"type": "declaration",
					"property": "background-color",
					"value": "#ff1111",
					"position": {
						"start": {
							"line": 8,
							"column": 5
						},
						"end": {
							"line": 8,
							"column": 30
						}
					}
				}
			],
			"position": {
				"start": {
					"line": 6,
					"column": 1
				},
				"end": {
					"line": 9,
					"column": 2
				}
			}
		}
	],
	"parsingErrors": []
}
}*/

const css = require('css');


let rules = [];  // 用于存放CSS规则

// 收集CSS规则, style 标签 POP 的时候
module.exports.addCSSRules = function (text) {
	var ast = css.parse(text);
	// console.log(JSON.stringify(ast, null, '        '));
	rules.push(...ast.stylesheet.rules);
};

// 匹配元素和选择器
function match(element, selector) {
	if(!selector || !element.attributes) return false;
	
	if(selector.charAt(0) === '#') {  // 选择器是 ID选择器
		let attr = element.attributes.filter(attr => attr.name === 'id')[0];  // 取出元素的 id 属性
		if(attr && attr.value === selector.replace('#', '')) {
			return true;
		}
	} else if(selector.charAt(0) === '.') {  // 选择器是 class 选择器
		let attr = element.attributes.filter(attr => attr.name === 'class')[0]; // 取出元素的 class 属性
		if(attr && attr.value === selector.replace('.', '')) {
			return true;
		}
	} else {  // 标签选择器
		return element.tagName === selector
		// if(element.tagName === selector) {
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
}

// 获取选择器的优先级
function specificity(selector) {
    let p = [0,0,0,0];  // 数组每一项分别表示：行内样式值，id, class, tag
    let selectors = selector.split(' ');  // 将选择器拆分成数组
    for (let sel of selectors) {
        if (sel.charAt(0) === '#') {  // id选择器
            p[1] += 1;
        } else if (sel.charAt(0) === '.') {   // class 选择器
            p[2] += 1;
        } else {  // 标签选择器
            p[3] += 1;
        }
    }
    return p;
}

// 比较选择器的优先级
function compare(sp1, sp2) {
    if (sp1[0] - sp2[0])
        return sp1[0] - sp2[0];
    if (sp1[1] - sp2[1])
        return sp1[1] - sp2[1];
    if (sp1[2] - sp2[2])
        return sp1[2] - sp2[2];
    return sp1[3] - sp2[3];
}

// CSS 计算
module.exports.computeCSS = function(element, stack) {
	const elements = stack.slice().reverse();
	// 给元素添加 computedStyle 属性
	if(!element.computedStyle)
		element.computedStyle = {};
	
	// 遍历style标签内的 CSS 规则
	for(let rule of rules) {
		// 当前选择器拆分成数组
		let selectorParts = rule.selectors[0].split(' ').reverse();
		// 当前元素和选择器的最后一项匹配，如果不能匹配说明这个规则不是当前元素的规则，则退出这次遍历，进行下一个规则匹配
		if(!match(element, selectorParts[0])) continue;
		// 定义是否匹配的变量
		let matched = false;
		let j = 1;  // 用于记录匹配到选择器数组的哪一个
		// 选择器数组最后一项匹配通过后，依次匹配前面几项
		// 注意这个匹配过程是两层遍历：通过遍历 stack 内元素，匹配元素与当前选择器
		// 选择器数组每匹配到一个需要向前匹配一个
		for(let i=0; i<elements.length; i++) {
			if(match(elements[i], selectorParts[j])) {
				j++;  // 只有匹配成功了，选择器才会向前走一步
			}
			if(j >= selectorParts.length) break;  // 选择器匹配完了之后，说明已经全部匹配成功，停止遍历
		}
		// 选择器数组的每一项都匹配成功，才说明当前规则匹配成功
		if(j >= selectorParts.length) {
			matched = true;
		}
		
		if(matched) {
			// 生成computed 属性
			// 如果匹配到，我们要将 规则的 css属性 加到当前元素element上
            let sp = specificity(rule.selectors[0]);  // 计算当前规则的 优先级specificity
			let computedStyle = element.computedStyle;
			
			for(let declaration of rule.declarations) {
				if(!computedStyle[declaration.property]) {  //declaration.property 为CSS 属性名，width, color等
					computedStyle[declaration.property] = {}  // 预留用作优先级判断
				}

                if (!computedStyle[declaration.property].specificity) {  // 表示还没有对此CSS属性名重复声明的规则，直接数用这条规则的相关数据
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {  // 已经有过对此属性名的规则了，则需要计算两个规则的优先级，
					// 如果之前规则的优先级小于当前规则的优先级，则将当前规则的相关数据赋值给此属性
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
			}
		}
		
		for(let attr of element.attributes) {
			if(attr.name === 'style') {
			
			}
		}
	}
};