const EOF = Symbol('EOF');  // EPF: end of file;

function data(char) {
    if (char === '<')
        return tagOpen;
    else if (char === EOF)
        return ;
    else
        return data;
}

function tagOpen(char) {
    if (char === '/')
        return tagClose;
    else if (char.match(/^[a-zA-Z]$/))
        return tagName(char);
    else
        return data;
}

function tagClose(char) {
    if (char === '>') {
        return data;
    } else if (char === EOF) {
        
    } else {

    }
}

function tagName(char) {

}

function beforeAttributeName(char) {

}

function selfClosureTag(char) {

}

module.exports.parseHTML = function (html) {
    let state = data;
    for (let char of html) {
        state = state(char)
    }
    return state(EOF)
}