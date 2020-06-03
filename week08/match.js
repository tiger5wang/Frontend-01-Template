


function match(selector, element) {
	let selectors = [];
	let len = selector.length;
	let start = 0;
	let combinators = [' ', '>', '~', '+'];  // 连接符
	let sels = ['#', '.', '['];
	
	for(let i=0; i<len; i++) {
		let currentChar = selector[i];
		
		if(combinators.includes(currentChar) || sels.includes(currentChar)) {
			selectors.push(selector.substring(start, i));
			start = i;
		} else if(currentChar === ']') {
			selectors.push(selector.substring(start, i+1));
			start = i+1;
		}
		
		if(i === len -1) {
			selectors.push(selector.substring(start));
		}
	}
	
	let currentNode = element;
	let currentNodes;
	
	for(let i=0; i<selectors.length; i++) {
		if(selectors[i] === '') continue;
		if([' ', '>'].includes(selectors[i])) {
			currentNodes = currentNode.children;
			continue;
		}
		
		let currentSelector = selectors[i];
		
		if(currentNodes.length > 0) {
			for(let i=0; i<currentNodes.length; i++) {
				currentNode = currentNodes[i];
				
			}
		}
		
		if([' ', '>'].includes(currentSelector.charAt(0))) {
			currentNode = currentNode.children;
			currentSelector = currentSelector.substr(1)
			
		} else if(['~', '+'].includes(currentSelector.charAt(0))) {
			currentSelector = currentSelector.substr(1)
		} else if(sels.includes(currentSelector.charAt(0))) {
		
		}
		
	}
	
	return selectors;
	
	
	// return true;
}


match("div #id.class", document.getElementById("id"));