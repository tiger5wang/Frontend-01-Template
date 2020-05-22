/*element.computedStyle : {
	width:{
		value: 100px;
		specificity: [0,0,0,0]
	}
	color: {
		value: red;
		specificity: [0,0,0,0]
	}
}*/

// 将element.computedStyle 转换为正常的style
function getStyle(computedStyle) {
	let style = {};
	for(let prop in computedStyle) {
		style[prop] = computedStyle[prop].value;
		
		// 这里先只用 px, 先转换成数字，方便后面计算
		if(style[prop].toString().match(/px$/) || style[prop].toString().match(/[^0-9\.]+/)) {
			style[prop] = parseInt(computedStyle[prop].value);
		}
		
	}
	return style;
}


function layout(element) {
	// element.computedStyle  可能为空对象
	if(!element.computedStyle || Object.getOwnPropertyNames(element.computedStyle).length === 0)
		return;
	
	let style = getStyle(element.computedStyle);
	
	if(style.display !== 'flex' && style.display !== 'inline-flex')
		return;
	
	let items = element.children.filter(el => el.type === 'element');  // 将非 element 的内容过滤掉
	
	// 排序
	items.sort(function(a, b) {
		return (a.order || 0) - (b.order || 0);  // 疑问： order 是啥
	})
	
	['width', 'height'].forEach(item => {
		if(style[item] === 'auto' || style[item] === '' || style[item] === undefined) {
			style[item] = null;
		}
	});
	
	
	if(!style.flexDirection || style.flexDirection === 'auto') {
		style.flexDirection = 'row'
	}
	if(!style.flexWrap || style.flexWrap === 'auto') {
		style.flexWrap = 'nowrap'
	}
	if(!style.justifyContent || style.justifyContent === 'auto') {
		style.justifyContent = 'flex-start'
	}
	if(!style.alignItems || style.alignItems === 'auto') {
		style.alignItems = 'stretch'
	}
	if(!style.alignContent || style.alignContent === 'auto') {
		style.alignContent = 'stretch'
	}
	
	let mainType, mainStart, mainEnd, mainSign, mainBase,
		crossType, crossStart, crossEnd, crossSign, crossBase;
	if(style.flexDirection === 'row') {
		mainType = 'width';  // 主轴类型（宽高）
		mainStart = 'left';  // 主轴开始位置
		mainEnd = 'right';   // 主轴结束位置
		mainSign = +1;       // 主轴方向（正反）
		mainBase = 0;        // 主轴起始位置
		
		crossType = 'height';
		crossStart = 'top';
		crossEnd = 'bottom';
	}
	if(style.flexDirection === 'row-reverse') {
		mainType = 'width';  // 主轴类型（宽高）
		mainStart = 'right';  // 主轴开始位置
		mainEnd = 'left';   // 主轴结束位置
		mainSign = -1;       // 主轴方向（正反）
		mainBase = style.width;        // 主轴起始位置
		
		crossType = 'height';
		crossStart = 'top';
		crossEnd = 'bottom';
	}
	if(style.flexDirection === 'column') {
		mainType = 'height';  // 主轴类型（宽高）
		mainStart = 'top';  // 主轴开始位置
		mainEnd = 'bottom';   // 主轴结束位置
		mainSign = +1;       // 主轴方向（正反）
		mainBase = 0;        // 主轴起始位置
		
		crossType = 'width';
		crossStart = 'left';
		crossEnd = 'right';
	}
	if(style.flexDirection === 'column-reverse') {
		mainType = 'height';  // 主轴类型（宽高）
		mainStart = 'bottom';  // 主轴开始位置
		mainEnd = 'top';   // 主轴结束位置
		mainSign = -1;       // 主轴方向（正反）
		mainBase = style.height;        // 主轴起始位置
		
		crossType = 'width';
		crossStart = 'left';
		crossEnd = 'right';
	}
	
	if(style.flexWrap === 'wrap-reverse') {
		let tmp = crossStart;
		crossStart = crossEnd;
		crossEnd = tmp;
		crossSign = -1
	} else {
		crossSign = +1;
		crossBase = 0;
	}
	
	
	
}

module.exports = layout;
