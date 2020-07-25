export function createElement(comp, attributes, ...children) {
	// console.log(arguments);
	// // debugger;
	let ele;
	if (typeof comp === 'string') {
		ele = new Wrapper(comp);
	} else {
		ele = new comp({
			initData: {}
		});
	}
	
	for(let name in attributes) {
		// ele[name] = attributes[name];   // attribute 和 property 是同一个
		ele.setAttribute(name, attributes[name])
	}
	
	let visit = children => {
		for (let child of children) {
			if (typeof child === 'object' && child instanceof Array) {
				visit(child);
				continue;
			}
			if (typeof child === 'string') {
				child = new TextNode(child);
			}
			ele.appendChild(child);  // 添加 children 的方法一
			// ele.children.push(child)  // 方法二
		}
	};
	
	visit(children);
	
	return ele;
}

export class Wrapper {
	constructor(type) {
		this.children = [];
		this.root = document.createElement(type)
	}
	
	setAttribute(name, value) {   // attribute
		// console.log('MyComponent::setAttribute', name, value);
		this.root.setAttribute(name, value)
	}
	
	appendChild(child) {   // 添加children 的方法一
		this.children.push(child)
	}
	
	addEventListener() {
		this.root.addEventListener(...arguments)
	}
	
	get style() {
		return this.root.style;
	}
	
	mountTo(parent) {
		parent.appendChild(this.root);
		
		for (let child of this.children) {
			child.mountTo(this.root)
		}
	}
}

export class TextNode {
	constructor(text) {
		this.root = document.createTextNode(text)
	}
	
	mountTo(parent) {
		parent.appendChild(this.root)
	}
}