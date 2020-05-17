// 在一个字符串中，找到字符 "a"
function matchString(string) {
    for (let str of string) {
        if (str === 'a')
            return true;
    }
    return false;
}

matchString('I am tiger!')

// 在一个字符串中，找到字符 "ab"
function matchString2(string) {
    let foundA = false;
    for (let str of string) {
        if (str === 'a') {
            foundA = true;
        } else if (foundA && str === 'b') {
            return true;
        } else {
            foundA = foundA;
        }
    }
    return false;
}

matchString2('I am tiger!')        // false
matchString2('I abm tiger!')        // true


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

matchString3('I am tiger abcdefgh')

