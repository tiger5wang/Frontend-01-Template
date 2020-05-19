const EOF = Symbol('EOF');  // EPF: end of file;



// 元素的内容部分
function data(char) {
    if (char === '<') {
		console.log(currentToken);
		return statTagOpen;
    } else if (char === EOF)
        return ;
    else
        return data;
}

// 元素的开始标签
function statTagOpen(char) {
    if(char === '/') {  // statTagOpen 状态如果是 / 那就表明这个标签是结束标签，切换状态
        return endTagOpen;
    } else if(char.match(/^[a-zA-Z]$/)) {  // 如果碰到正常字符 a-zA-Z， 表明开始标签名部分了
		return tagName(char);
    } else
        return data;
}
// 元素的结束标签
function endTagOpen(char) {
    if(char.match(/^[a-zA-Z]$/)) {
        return tagName(char);
    }
    if (char === '>') {
        return data;
    } else if (char === EOF) {
        
    } else {

    }
}

function tagName(char) {
    if(char.match(/^[a-zA-Z]$/)) {
        return tagName;
    } else if(char.match(/^[\t\n\ ]&/)) {
        return beforeAttributeName;
    } else if(char === '/') {
        return selfClosureTag;
    } else if(char === '>') {
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(char) {
    if(char.match(/^[\t\n\f ]$/)) {  // 标签名和属性之间 空格可能有多个
        return beforeAttributeName;
    } else if(char === ">") {
        return data;
    } else if(char === '=') {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
    }
}

function selfClosureTag(char) {
    if(char === '>') {
        currentToken.isSelfClosure = true;
        return data;
    } else if(char === 'EOF') {
    
    } else {
    
    }
}

module.exports.parserHTML = function (html) {
    let state = data;
    for (let char of html) {
        state = state(char)
    }
    return state(EOF)
};