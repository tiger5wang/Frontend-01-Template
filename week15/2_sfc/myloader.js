var parser = require('./parser');

// source 参数表示接收的要编译的代码内容
module.exports = function(source) {
    // console.log(source)
    // 解析source 为 JS 树
    let tree = parser.parseHTML(source);
    // console.log(tree.children[1].children[0].content);  // script 部分代码

    let template = null;
    let script = null;

    // 对 解析好的 JS 树 遍历，获取它的 template 部分 和script 部分的代码
    for (let node of tree.children) {
        if (node.tagName === 'template') {  // template
            template = node.children.filter(event => event.type !== 'text')[0];
        }
        if (node.tagName === 'script') {   // script
            script = node.children[0].content;   // script 中 js代码
        }
    }

    // console.log(template)
    let visit = (node) => {
        if (node.type === 'text') {   // 文本节点
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for (attribute of node.attributes) {  // attribute 属性
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node => visit(node));
        return `createElement('${node.tagName}', ${JSON.stringify(attrs)}, ${children})`
    };


    let r = `
import {createElement, TextNode, Wrapper} from '../../createElement'    
export class Carousel {
    render() {
        return ${visit(template)};
    }
    setAttribute(name, value) {   // attribute
        this[name] = value;
    }
    mountTo(parent) {
        this.render().mountTo(parent)
    }
}`;

    return r;
};


// step 1
// source 参数表示接收的要编译的代码内容
// module.exports = function (source) {
        // console.log(source)
        // this.resourcePath 表示当前文件的路径
//     console.log('myloader is running!!!!!!!!!!!!!!!!!!!\n', this.resourcePath);
        // 解析source 为 JS 树
//     let tree = parser.parseHTML(source);
//     console.log(tree.children[1].children[0].content)
//     return ""
// }