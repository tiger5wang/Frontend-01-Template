import {createElement, TextNode, Wrapper} from '../../createElement'
import {Carousel} from './Carousel'
import {TabPanel} from './TabPanel'
import {ListView} from './ListView'


/*let component = <Carousel data={[
		"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
		"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
		"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
		"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
	]} />;

component.mountTo(document.body);*/


let panel = <TabPanel>
	<span title='title1'>this is content1111</span>
	<span title='title2'>this is content2222</span>
	<span title='title3'>this is content3333</span>
	<span title='title4'>this is content4444</span>
</TabPanel>;
panel.mountTo(document.body);

window.panel = panel;


/*let data = data=[
	{title: '蓝猫', url:"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg"},
	{title: '橘猫加白', url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg"},
	{title: '狸花加白', url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg"},
	{title: '橘猫', url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"},
]

let list = <ListView data={data}>
	{record => <figure>
		<img src={record.url} alt=""/>
		<figcaption>{record.title}</figcaption>
	</figure>}
</ListView>

list.mountTo(document.body)*/

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