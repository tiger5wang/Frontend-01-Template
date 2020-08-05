
import {createElement, TextNode, Wrapper} from '../../createElement'



export class TabPanel {
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
		this.childViews = this.children.map(child => <div style='min-height:400px;width: 300px'>{child}</div>);
		this.titleViews = this.children.map((child, i) =>
			<span
				onClick={() => this.select(i)}
				style='min-height:400px;width:300px;padding: 0 20px;'>
					{child.getAttribute('title')}
			</span>);
		
		setTimeout(() => this.select(0), 16);
		
		return <div class="panel" style='border:1px solid lightgreen;width: 400px'>
			<h2 style='background-color: lightgreen;width:400px;margin: 0'>{this.titleViews}</h2>
			<div>
				{this.childViews}
			</div>
		</div>;
	}
	
	mountTo(parent) {
		this.render().mountTo(parent)
	}
}
