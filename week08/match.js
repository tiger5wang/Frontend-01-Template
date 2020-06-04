
let selectorObj = {};
let curSel = {
	val: ''  // 这里要赋初始值 "", 以防下面相加时值不对
};

// 生成新的 selectorObj
function emit() {
	console.log('333333333333333333', curSel);
	
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
			selectorObj.before = {};
			selectorObj.before[curSel.type] = curSel.val;
			break;
		}
		case 'next': {
			// selectorObj.previousElementSibling = {};
			selectorObj.previousElementSibling = curSel.val;
			break;
		}
		default: {
			selectorObj[curSel.type] = curSel.val;
		}
	}
}

// 将复杂选择七拆分成简单选择器
function splitSelector(char, isEmit=false) {   // isEmit 表示选择器遍历到最后一个字符，需要结束了，处理最后一部分
	console.log('22222222222222', char);
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
			emit();  // '>' 表示后面的选择器是自带，需要将selectorObj 外层 加上祖先 parentNode
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
			break;
		}
		case '+': {  // 相邻兄弟
			if(!!curSel.type && !!curSel.val) {
				emit();
				delete curSel.type;
			}
			curSel.val = '';
			curSel.type = 'next';
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

function compare(selectorObj, element) {
	if(!element) return false;
	
	for(let key of Object.keys(selectorObj)) {
		if(typeof selectorObj[key] === 'object') {
			if(key === 'ancestor' || key === 'parentNode') {
				compare(selectorObj[key], element['parentNode'])
			}
			if(key === 'before') {
			
			}
		} else {
		
		}
	}
}

function match(selector, element) {
	console.dir(element);
	console.log('1111111111', selector);
	
	for(let i=0; i<selector.length; i++) {
		splitSelector(selector[i], i === selector.length - 1)
	}
	
	console.log('0000000000000000', selectorObj);
	
	compare(selectorObj, element);
}

match('body div>#id.class~p', document.getElementById('id'));