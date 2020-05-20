const EOF = Symbol('EOF');  // EPF: end of file;
let currentToken = null;
let currentAttribute = null;
let stack = [{type: 'document', children: []}];

function emit(token) {
    if(token.type === 'text') return;
	// console.log(token)
	let top = stack[stack.length - 1];
	
	if(token.type === 'startTag') {
	    let element = {
	        type: 'element',
            children: [],
            attributes: []
        };

	    element.tagName = token.tagName;

	    for (let p in token) {
	        if(p !== 'type' && p !== 'tagName') {
	            element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }

        top.children.push(element);
	    element.parent = top;
	    // console.log(top)
	    if(!token.isSelfClosure) {
	        stack.push(element);
        }

        currentTextNode = null;

    } else if(token.type === 'endTag') {
	    console.log(token.tagName, top.tagName)
	    if(token.tagName !== top.tagName) {
	        throw new Error("tag start end does not match!")
        } else {
	        stack.pop();
        }
        currentTextNode = null;
    }
}


// 元素的内容部分
function data(char) {
    if (char === '<') {  // 数据部分如果 碰到 '<' 表明一个新的标签要开始了，切换到标签开始的状态。
		return statTagOpen;
    } else if (char === EOF) {
		emit({
			type: 'EOF'
		});
		return ;
    } else {  // 内容部分
        emit({
            type: 'text',
            content: char
        });
        return data;
    }
}

// 元素的开始标签
function statTagOpen(char) {
    if(char === '/') {  // statTagOpen 状态如果是 以 / 开头了，那就表明这个标签是结束标签，切换状态
        return endTagOpen;
    } else if(char.match(/^[a-zA-Z]$/)) {  // 如果碰到正常字符 a-zA-Z， 表明开始标签名部分了
    	// 设置currentToken， 并切换到 tagName 状态
        currentToken = {
            type: 'startTag',
            tagName: ''
        };
		return tagName(char);
    } else {
        // emit({
        //     type: 'text',
        //     content: char
        // });
        // return ;
    }
}

// 元素的结束标签
function endTagOpen(char) {
    if(char.match(/^[a-zA-Z]$/)) { // 如果是正常字符 a-zA-Z， 表明开始标签名部分了
		// 设置currentToken， 并切换到 tagName 状态
        currentToken = {
            type: 'endTag',
            tagName: ''
        };
        return tagName(char);
    } else if (char === EOF) {
        
    } else {

    }
}

// 标签名部分
function tagName(char) {
    if(char.match(/^[\t\n\ ]$/)) {  // 统计标签名过程中 碰到空格相关字符，表明 标签名 结束，接下来要进入 属性前的 部分
        return beforeAttributeName;
    } else if(char === '/') {  // 标签名的后面 出现 '/' 字符，表示这是一个自封闭标签
        return selfClosureTag;
    } else if(char === '>') {  // 标签名的后面 出现 '>' 字符，表示 此标签结束
        emit(currentToken);   // 标签结束，提交currentToken
        return data;  // 并切换到 内容部分
    } else {
		currentToken.tagName += char;
        return tagName;
    }
}

// 属性名前的状态，当然也可能没有属性，直接结束
function beforeAttributeName(char) {
    if(char.match(/^[\t\n\f ]$/)) {  // 标签名和属性之间 空格可能有多个
        return beforeAttributeName;
    } else if(char === ">" || char === '/' || char === EOF) {  // 如果碰到结束相关的字符了，则到 afterAttributeName 处理
        return afterAttributeName(char);
    } else if(char === '=') {
    
    } else {  // 去除调上面的特殊字符外，其他的字符属于属性名，创建currentAttribute，并切换状态
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(char);
    }
}

// 处理属性名状态
function attributeName(char) {
	// 处理属性名过程中遇到这些特殊字符表示属性名结束了，到 afterAttributeName 处理状态
    if(char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF) {
        return afterAttributeName(char);
    } else if(char === '=') {  // 遇到 ‘=’ 表示接下来是属性值部分
        return beforeAttributeValue;
    } else if(char === '\u0000') {
    
    } else if(char === '"' || char === "'" || char === '<') {
    
    } else {
        currentAttribute.name += char;
        return attributeName;
    }
}

// 碰到表明属性名结束的标签时的处理状态
function afterAttributeName(char) {
    if(char.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if(char === '/') {  // 自封闭标签
        return selfClosureTag;
    } else if(char === '=') {  // 进入属性值状态
        return beforeAttributeValue;
    } else if(char === '>') {   // 标签结束
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(char === EOF) {
    
    } else {  // 去除掉上面的特殊状态后，表示接下来时一个新的属性
    	// 给 currentToken 增加 当前属性，并将 currentAttribute 回复原始值
		// 切换到属性名状态
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(char);
    }
}

// 开始属性值前的状态
function beforeAttributeValue(char) {
    if(char.match(/^[\t\n\f ]$/) ) {   // || char === '/' || char === '>' || char ===EOF
        return beforeAttributeValue;
    } else if(char === '"') {  // 双引号属性值
        return doubleQuotedAttributeValue;
    } else if(char === "'") {   // 单引号属性值
        return singleQuotedAttributeValue;
    } else if(char === '/' || char === '>' || char ===EOF) {
    
    } else {  // 没有引号的属性值
        return UnquoteAttributeValue(char);
    }
}

// 双引号属性值状态
function doubleQuotedAttributeValue(char) {
    if(char === '"') {  // 碰到末尾的 " 表示 属性值 要结束
        // currentToken[currentAttribute.name] = currentAttribute.value;
        return afterAttributeValue;
    } else if(char === '\u0000') {
    
    } else if(char === EOF) {
    
    } else {
        currentAttribute.value += char;
        return doubleQuotedAttributeValue;
    }
}

// 单引号属性值状态
function singleQuotedAttributeValue(char) {
	if(char === "'") {  // 碰到末尾的 ' 表示 属性值 要结束
		// currentToken[currentAttribute.name] = currentAttribute.value;
		return afterAttributeValue;
	} else if(char === '\u0000') {
	
	} else if(char === EOF) {
	
	} else {
		currentAttribute.value += char;
		return singleQuotedAttributeValue;
	}
}

// 无引号的属性值状态
function UnquoteAttributeValue(char) {
    if(char.match(/^[\t\n\f ]$/) || char === '/' || char === '>') {  // 遇到空格相关字符，表示这个属性结束
    	return afterAttributeValue(char)
    //     currentToken[currentAttribute.name] = currentAttribute.value;
    //     return beforeAttributeName;
    // } else if(char === '/') {
    //     currentToken[currentAttribute.name] = currentAttribute.value;
    //     return selfClosureTag;
    // } else if(char === '>') {
    //     currentToken[currentAttribute.name] = currentAttribute.value;
    //     emit(currentToken);
    //     return data;
    } else if(char === '\u0000') {
    
    } else if(char === '"' || char === "'" || char === '<' || char === '=' || char === '`') {
    
    } else if(char === EOF) {
    
    } else {
        currentAttribute.value += char;
        return UnquoteAttributeValue;
    }
}

// 属性值结束后的相关处理
function afterAttributeValue(char) {
	if(char.match(/^[\t\n\f ]$/)) {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return beforeAttributeName;
	} else if(char === '/') {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return selfClosureTag;
	} else if(char === '>') {
		currentToken[currentAttribute.name] = currentAttribute.value;
		emit(currentToken);
		return data;
	} else if(char === EOF) {
	   
    } else {
	   
    }
}

// 自封闭标签处理状态
function selfClosureTag(char) {
    if(char === '>') {
        currentToken.isSelfClosure = true;
        emit(currentToken);
        return data;
    } else if(char === EOF) {
    
    } else {
    
    }
}

module.exports.parserHTML = function (html) {
    let state = data;
    for (let char of html) {
        state = state(char)
    }
    state = state(EOF);
    console.log('stack', stack[0])
};