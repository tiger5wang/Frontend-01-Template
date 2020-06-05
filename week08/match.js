
let selectorObj = {};
let curSel = {
	val: ''  // 这里要赋初始值 "", 以防下面相加时值不对
};

// 生成新的 selectorObj
function emit() {
	// console.log('333333333333333333', curSel);
	
	switch (curSel.type) {
		case 'descendant': {
			let newSelectorObj = Object.assign({}, selectorObj);
			selectorObj = {
				ancestor: newSelectorObj
			};
			break;
		}
		case 'children': {
			let newSelectorObj = Object.assign({}, selectorObj);
			selectorObj = {
				parentNode: newSelectorObj
			};
			break;
		}
		case 'after': {
			let newSelectorObj = Object.assign({}, selectorObj);
			selectorObj = {
				previousNode: newSelectorObj
			};
			break;
		}
		case 'next': {
			// selectorObj.previousElementSibling = {};
			// selectorObj.previousElementSibling = curSel.val;
			let newSelectorObj = Object.assign({}, selectorObj);
			selectorObj = {
				previousElementSibling: newSelectorObj
			};
			break;
		}
		default: {
			selectorObj[curSel.type] = curSel.val;
		}
	}
}

// 将复杂选择七拆分成简单选择器
function splitSelector(char, isEmit=false) {   // isEmit 表示选择器遍历到最后一个字符，需要结束了，处理最后一部分
	// console.log('22222222222222', char);
	switch (char) {
		case ' ': {  // 后代
			if(!!curSel.type && !!curSel.val) {
				emit();  // 碰到空格，并且当前选择器的type val 都有值了，表示前一个简单选择器结束
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'descendant';
			emit();   // 空格表示后面的选择是后代，这里需要将 selectorObj 外层 加上祖先 ancestor
			delete curSel.type;  // 每次处理完当前选择器后要清空 type 的值
			break;
		}
		case '>': {  // 子代
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'children';
			emit();  // '>' 表示后面的选择器是子代，需要将selectorObj 外层 加上祖先 parentNode
			delete curSel.type;
			break;
		}
		case '~': {   // 兄弟
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'after';
			emit();  // '~' 表示后面的选择器是后继，需要将selectorObj 外层 加上 previousNode
			delete curSel.type;
			break;
		}
		case '+': {  // 相邻兄弟
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'next';
			emit();  // '+' 表示后面的选择器是相邻后继，需要将selectorObj 外层 加上previousElementSibling
			delete curSel.type;
			break;
		}
		case '#': {   // id
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'id';
			break;
		}
		case '.': {   // class
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'className';
			break;
		}
		case ':': {   // 伪类
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'pseudo';
			break;
		}
		case '[': {  // 属性 开始
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'attributes';
			break;
		}
		case ']': {   // 属性结束
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			break;
		}
		default: {  // 标签
			if(curSel.type) {
				curSel.val += char;
			} else {
				curSel.type = 'tagName';
				curSel.val += char;
			}
			
			if(isEmit) emit();  // 如果是最后一个选择器，遍历的最后一个字符最后要生成新的 selectorObj
		}
	}
}

function compare(selectorObj, element, isDescendant = false) {
	if(!element) return false;  // 当向上追加父节点到null 时，表示没有匹配上的，返回false
	
	// 给selectorObj 排序，对象后，字符串前，因为对象表示有父节点活后继节点，要向上遍历；
	// 字符串表示 id, class, attribute 等，先检查，检查不通过直接放回false
	let selectorKeys = [];
	for(let key of Object.keys(selectorObj)) {
		if(typeof selectorObj[key] === 'object') {
			selectorKeys.push(key)
		} else {
			selectorKeys.unshift(key)
		}
	}
	console.log('55555555555555', selectorObj, element);
	let i = 0;  // 正常情况下，最终验证的 selectorObj[key] 是字符串类型的
	// 当selectorObj[key] 是对象时就给 i 加1， 判断i是否 = 0
	for(let key of selectorKeys) {
		if(typeof selectorObj[key] !== 'object') {  // id, class, attributes 等选择器
			if(key === 'tagName') {  // 注意element.tagName 值是大写的，需要跟id, class, attributes等区分一下
				if(element[key] !== selectorObj[key].toUpperCase()) {
					if(isDescendant && element.tagName !== 'HTML') {  // 如果是后代选择器，且当前 element 还没有到 html 标签，则继续向父节点匹配
						return compare(selectorObj, element['parentNode'], true);
					} else {  // 否则匹配失败
						return false;
					}
				}
			} else {
				if(element[key] !== selectorObj[key]) {
					if(isDescendant && element.tagName !== 'HTML') {  // 同上
						return compare(selectorObj, element['parentNode'], true);
					} else {
						return false;
					}
				}
			}
			
		} else {
			i++;
			if(key === 'ancestor') {  // 后代选择器
				return compare(selectorObj[key], element['parentNode'], true)
			} else if(key === 'parentNode') {  // 子选择器
				return compare(selectorObj[key], element['parentNode'])
			} else if(key === 'previousNode') {  // 后继选择器
				let result;
				let el = element;
				
				while(true) {
					el = el.previousElementSibling;  // 需要依次检查前面的元素
					if(!el) break;
					result = compare(selectorObj[key], el);
					if(result !== false) {  // 如果没有返回值就是匹配成功
						result = true;
						break;
					}
				}
				return result;
			} else if(key === 'previousElementSibling') {  // 相邻后继选择器
				return compare(selectorObj[key], element['previousElementSibling'])
			} else {
				return compare(selectorObj[key], element[key])
			}
		}
	}
	
	if(i === 0) {
		return true;
	}
}

function match(selector, element) {
	// console.dir(element);
	// console.log('1111111111', selector);
	
	// 将复杂选择器按照相关规则转换成对象
	for(let i=0; i<selector.length; i++) {
		splitSelector(selector[i], i === selector.length - 1)
	}
	
	console.log('0000000000000000', selectorObj);
	
	// 匹配元素和选择器
	let result = compare(selectorObj, element);
	console.log('result', result)
}

match('body div #id.class', document.getElementById('id'));   // true
// match('body div #id.class', document.getElementById('id2'));   // false
// match('body div>#id.class', document.getElementById('id'));  // true
// match('body div>#id.class', document.getElementById('id3'));  // false
// match('body div #id', document.getElementById('id'));   // true
// match('body div #id', document.getElementById('id3'));   // false
// match('div #id.class', document.getElementById('id'));  // true
// match('div #id.class', document.getElementById('id2'));  // false
// match('body #id.class~.p1', document.getElementById('id2'));   // true
// match('body #id.class~.p1', document.getElementById('id'));   // false
// match('body #id.class+.p1', document.getElementById('id2'));   // true
// match('body #id.class+.p1', document.getElementById('id3'));   // false
// match('body #id.class~.pp', document.getElementById('id3'));   // true
// match('body #id.class+.pp', document.getElementById('id3'));   // false