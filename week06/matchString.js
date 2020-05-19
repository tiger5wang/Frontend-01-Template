// 在一个字符串中，找到字符 "a"
function matchString(string) {
    for (let str of string) {
        if (str === 'a')
            return true;
    }
    return false;
}
matchString('I am tiger!');


// 在一个字符串中，找到字符 "ab"
function matchString2(string) {
    let foundA = false;
    for (let str of string) {
        if (str === 'a') {
            foundA = true;
        } else if (foundA && str === 'b') {
            return true;
        } else {
            foundA = false;
        }
    }
    return false;
}

matchString2('I am tiger!');    // false
matchString2('I abm tiger!');       // true


// 在一个字符串中，找到字符 "abcdef"
function matchString3(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for (let char of string) {
        if (char === 'a') {
            foundA = true;
        } else if (foundA && char === 'b') {
            foundB = true;
        } else if (foundB && char === 'c') {
            foundC = true;
        } else if (foundC && char === 'd') {
            foundD = true;
        } else if (foundD && char === 'e') {
            foundE = true;
        } else if (foundE) {
            return true;
        }
        else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false;
}
matchString3('I am tiger abcdefgh');


// 使用状态机方法 实现上例
/*function matchString4(string) {
    let state = start;
    for (let char of string) {
        state = state(char);
        if(state === end) break;  // 如果找到了相应的字符串，则停止字符串的遍历，提高性能。
    }
    return state === end;
}

function start(char) {
    if(char === 'a') {
        return foundA;
    } else
        return start;
}

function foundA(char) {
    if(char === 'b')
        return foundB;
    else
        return start(char);
}

function foundB(char) {
	if(char === 'c')
		return foundC;
	else
		return start(char);
}

function foundC(char) {
	if(char === 'd')
		return foundD;
	else
		return start(char);
}

function foundD(char) {
	if(char === 'e')
		return foundE;
	else
		return start(char);
}

function foundE(char) {
	if(char === 'f')
		return end;
	else
		return start(char);
}

function end(char) {
    return end;
}
result = matchString4('I am tiger aabcdefgh');
console.log(result);*/
/*
注意这个里面 每一个 found 函数 else 部分都是 return start(char) ,而不是return start，
是因为要要优化 出现 aa这种情况的字符串，
*/


// 使用状态机处理诸如 'abcabx' 这样的字符串
/*function matchString5(string) {
	let state = start;
	for(let char of string) {
		state = state(char);
		if(state === end) break;   // 如果找到了相应的字符串，则停止字符串的遍历，提高性能。
	}
	return state === end;
}

function start(char) {
	if(char === 'a')
		return foundA;
	else
		return start;
}

function foundA(char) {
	if(char === 'b')
		return foundB;
	else
		return start(char);
}

function foundB(char) {
	if(char === 'c')
		return foundC;
	else
		return start(char);
}

function foundC(char) {
	if(char === 'a')
		return foundA2;
	else
		return start(char);
}

function foundA2(char) {
	if(char === 'b')
		return foundB2;
	else
		return start(char);
}

function foundB2(char) {
	if(char === 'x')
		return end;
	else
		return foundB(char);  // 注意这里用的是foundB 而不是 start，因为string 可能包含连续两个或多个 abc，所以从第二个ab 后面的字符如果不是 x, 那么先要判断是不是 c, 不是c的情况下再start从头a开始判断，而不是直接到头判断。
}

function end(char) {
	return end;
}
let result = matchString5('abcabcabx');
console.log(result);*/


// 作业：
// 使用状态机完成 "abababx" 的处理
function matchString6(string) {
	let state = start;
	for(let char of string) {
		state = state(char);
		if(state === end) break;   // 如果找到了相应的字符串，则停止字符串的遍历，提高性能。
	}
	return state === end;
}

function start(char) {
	if(char === 'a')
		return foundA;
	else
		return start;
}

function foundA(char) {
	if(char === 'b')
		return foundB;
	else
		return start(char);
}

function foundB(char) {
	if(char === 'a')
		return foundA2;
	else
		return start(char);
}

function foundA2(char) {
	if(char === 'b')
		return foundB2;
	else
		return start(char);
}

function foundB2(char) {
	if(char === 'a')
		return foundA3;
	else
		return start(char);
}

function foundA3(char) {
	if(char === 'b')
		return foundB3;
	else
		return start(char);
}

function foundB3(char) {
	if(char === 'x')
		return end;
	else
		return foundB2(char);  //注意这里return 的值跟其他地方不同，同样是以防 ab 重复的多
}

function end(char) {
	return end;
}

matchString6('asdababababxasdfg');