const EOF = Symbol('EOF');  // EPF: end of file;
let currentToken = null;
let currentAttribute = null;
let stack = [{type: 'document', children: []}];

function emit(token) {
    if(token.type === 'text') return;
	
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
    if (char === '<') {
		// console.log('currentToken', currentToken);
		return statTagOpen;
    } else if (char === EOF) {
		emit({
			type: 'EOF'
		});
		return ;
    } else {
        emit({
            type: 'text',
            content: char
        });
        return data;
    }
}

// 元素的开始标签
function statTagOpen(char) {
    if(char === '/') {  // statTagOpen 状态如果是 / 那就表明这个标签是结束标签，切换状态
        return endTagOpen;
    } else if(char.match(/^[a-zA-Z]$/)) {  // 如果碰到正常字符 a-zA-Z， 表明开始标签名部分了
        currentToken = {
            type: 'startTag',
            tagName: ''
        };
		return tagName(char);
    } else {
        emit({
            type: 'text',
            content: char
        });
        return ;
    }
}
// 元素的结束标签
function endTagOpen(char) {
    if(char.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        };
        return tagName(char);
    }
    if (char === '>') {
        return data;
    } else if (char === EOF) {
        
    } else {

    }
}

function tagName(char) {
    if(char.match(/^[\t\n\ ]$/)) {
        return beforeAttributeName;
    } else if(char === '/') {
        return selfClosureTag;
    } else if(char === '>') {
        emit(currentToken);
        return data;
    } else {
		currentToken.tagName += char;
        return tagName;
    }
}

function beforeAttributeName(char) {
    if(char.match(/^[\t\n\f ]$/)) {  // 标签名和属性之间 空格可能有多个
        return beforeAttributeName;
    } else if(char === ">" || char === '/' || char === EOF) {
        // return afterAttributeName(char);
		emit(currentToken);
		return data;
    } else if(char === '=') {
    
    } else {
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(char);
    }
}

function attributeName(char) {
    if(char.match(/^[\t\n\f ]$/) ) {  // || char === '/' || char === '>' || char === EOF
        return afterAttributeName(char);
    } else if(char === '=') {
        return beforeAttributeValue;
    } else if(char === '\u0000') {
    
    } else if(char === '"' || char === "'" || char === '<') {
    
    } else {
        currentAttribute.name += char;
        return attributeName;
    }
}

function afterAttributeName(char) {
    if(char.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if(char === '/') {
        return selfClosureTag;
    } else if(char === '=') {
        return beforeAttributeValue;
    } else if(char === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(char === EOF) {
    
    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(char);
    }
}

function beforeAttributeValue(char) {
    if(char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char ===EOF) {
        return beforeAttributeValue;
    } else if(char === '"') {
        return doubleQuotedAttributeValue;
    } else if(char === "'") {
        return singleQuotedAttributeValue;
    } else if(char === '>') {
    
    } else {
        return UnquoteAttributeValue(char);
    }
}

function doubleQuotedAttributeValue(char) {
    if(char === '"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterAttributeValue;
    } else if(char === '\u0000') {
    
    } else if(char === EOF) {
    
    } else {
        currentAttribute.value += char;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(char) {
	if(char === "'") {
		currentToken[currentAttribute.name] = currentAttribute.value;
		return afterAttributeValue;
	} else if(char === '\u0000') {
	
	} else if(char === EOF) {
	
	} else {
		currentAttribute.value += char;
		return singleQuotedAttributeValue;
	}
}

function UnquoteAttributeValue(char) {
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
    } else if(char === '\u0000') {
    
    } else if(char === '"' || char === "'" || char === '<' || char === '=' || char === '`') {
    
    } else if(char === EOF) {
    
    } else {
        currentAttribute.value += char;
        return UnquoteAttributeValue;
    }
}

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
    console.log(stack[0])
};