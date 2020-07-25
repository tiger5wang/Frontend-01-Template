

function createElement(comp, attributes, ...children) {
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
	
	for (let child of children) {
		if (typeof child === 'string') {
			child = new TextNode(child);
		}
		ele.appendChild(child);  // 添加 children 的方法一
		// ele.children.push(child)  // 方法二
	}
	
	return ele;
}

class MyComponent {
	constructor(config) {
		// console.log('config', config);
		this.children = [];
		this.root = document.createElement('div');
	}
	set id(v) {  // property
		console.log('MyComponent::id', v)
	}
	
	setAttribute(name, value) {   // attribute
		// console.log('MyComponent::setAttribute', name, value);
		this.root.setAttribute(name, value)
	}
	
	appendChild(child) {   // 添加children 的方法一
		this.children.push(child)
	}
	
	render() {
		return(
			<article>
				<header>I am a header</header>
				{this.slot}
				<footer>I am a footer</footer>
			</article>
		)
	}
	
	mountTo(parent) {
		// parent.appendChild(this.root);
		//
		// for (let child of this.children) {
		// 	child.mountTo(this.root)
		// }
		
		this.slot = <div></div>
		
		for (let child of this.children) {
			this.slot.appendChild(child)
		}
		
		this.render().mountTo(parent)
		
		
	}
}

class Wrapper {
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
	
	mountTo(parent) {
		parent.appendChild(this.root);
		
		for (let child of this.children) {
			child.mountTo(this.root)
		}
	}
}

class TextNode {
	constructor(text) {
		this.root = document.createTextNode(text)
	}
	
	mountTo(parent) {
		parent.appendChild(this.root)
	}
}



class Child {
	constructor(config) {
		console.log('config', config);
		this.children = [];
		this.root = document.createElement('div');
	}
	set id(v) {  // property
		console.log('MyComponent::id', v)
	}
	
	setAttribute(name, value) {   // attribute
		console.log('MyComponent::setAttribute', name, value)
	}
	
	appendChild(child) {
		this.children.push(child)
	}
	
	mountTo(parent) {
		parent.appendChild(this.root);
		
		for (let child of this.children) {
			child.mountTo(this.root)
		}
	}
}

class Grandson {

}

let component = <MyComponent id='a' class='b' style="width: 100px; height: 100px; background-color: lightgreen">
		<div>111</div>
		{/*<MyComponent>*/}
			{/*{new Wrapper('span')}*/}
			{/*/!*<Grandson></Grandson>*!/*/}
		{/*</MyComponent>*/}
		{/*<MyComponent></MyComponent>*/}
	</MyComponent>
	;

// component.id = 'c'
// console.log(component)
// component.setAttribute('attr', 'haha')

component.mountTo(document.body)


// jsx 的写法转义成 js 语法
// var component = createElement(
// 	MyComponent,
// 	{
// 		id: "a",
// 		"class": "b"
// 	},
// 	createElement(Child, null),
// 	createElement(Child, null),
// 	createElement(Child, null)
// );