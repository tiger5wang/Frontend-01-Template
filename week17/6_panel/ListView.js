
import {createElement, TextNode, Wrapper} from '../../createElement'



export class ListView {
	constructor() {
		this.children = [];
		this.sttributes = new Map();
		this.properties = new Map();
		this.state = Object.create(null);
	}
	
	setAttribute(name, value) {   // attribute
		// console.log('MyComponent::setAttribute', name, value);
		this[name] = value;
	}
	
	getAttribute(name) {
		return this[name]
	}
	
	appendChild(child) {   // 添加children 的方法一
		this.children.push(child)
	}
	
	select(i) {
		for (let child of this.childViews) {
			child.style.display = 'none'
		}
		this.childViews[i].style.display = '';   // 表示使用默认值
		
		for (let child of this.titleViews) {
			child.classList.remove('selected')
		}
		this.titleViews[i].classList.add('selected');   // 表示使用默认值
		
		// this.titleView.innerText = this.childViews[i].title
	}
	
	render() {
		let data = this.getAttribute('data')
		return <div class="list-view" style='width: 300px'>
			{data.map(this.children[0])}
		</div>;
	}
	
	mountTo(parent) {
		this.render().mountTo(parent)
	}
}
