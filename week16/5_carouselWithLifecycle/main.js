import {createElement, TextNode, Wrapper} from '../../createElement'
import {Carousel} from './Carousel'


let component = <Carousel data={[
		"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
		"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
		"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
		"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
	]} />;

component.mountTo(document.body);


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