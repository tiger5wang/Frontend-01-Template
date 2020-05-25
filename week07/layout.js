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
	
	let elementChildren = element.children.filter(el => el.type === 'element');  // 将非 element 的子元素过滤掉
	
	// 排序
	elementChildren.sort(function(a, b) {
		return (a.order || 0) - (b.order || 0);  // 疑问： order 是啥
	})
	
	['width', 'height'].forEach(item => {
		if(style[item] === 'auto' || style[item] === '' || style[item] === undefined) {
			style[item] = null;
		}
	});
	
	// 定义初始值
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

	// 一个特例，就是style里面没有给定 mainType的时候，也即autoSize
	let isAutoMainType = false;
	if(!style[mainType]) {     // auto sizing
		style[mainType] = 0;
		for(let i=0; i<elementChildren.length; i++) {
			let item = item[i];
			let itemStyle = getStyle(item);
			if(!!itemStyle[mainType]) {  // mainType的实际值就是它的所有元素的 mainType 值得总和
				style[mainType] += itemStyle[mainType]
			}
		}
		isAutoMainType = true;
	}

	let flexLine = [];    // 主轴行
	let flexLines = [flexLine];   // 主轴所有行

    let leftSpace = style[mainType];   // 定义主轴剩余空间
    let crossSpace = 0;    // 定义交叉轴剩余空间

    for (let i=0; i<elementChildren.length; i++) {
        let item = elementChildren[i];
        let itemStyle = getStyle(item);

        if (itemStyle[mainType] == null) {
            itemStyle[mainType] = 0;
        }

        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap === 'nowrap' && isAutoMainType) {
            leftSpace -= itemStyle[mainType];
            if (!!itemStyle[crossType]) {
                crossSpace = Math.max(crossSpace, itemStyle[crossType])
            }
            flexLine.push(item);
        } else {
            if (itemStyle[mainType] > style[mainType]) {
                itemStyle[mainType] = style[mainType]
            }
            if (leftSpace < itemStyle[mainType]) {
                flexLine.leftSpace = leftSpace;
                flexLine.crossSpace = crossSpace;

                flexLine = [item];   // 新的一行
                flexLines.push(flexLine);  // 添加新的行
                leftSpace = style[mainType];   // 恢复初始值
                crossSpace = 0;  // 恢复初始值
            } else {
                flexLine.push(item);
                if (!!itemStyle[crossType]) {
                    crossSpace = Math.max(crossSpace, itemStyle[crossType])
                }
            }
            // winter 写的位置
            // if (!!itemStyle[crossType]) {
            //     crossSpace = Math.max(crossSpace, itemStyle[crossType])
            // }
            leftSpace -= itemStyle[mainType];
        }
    }
    flexLine.leftSpace = leftSpace;

    if (style.flexWrap === 'nowrap' || isAutoMainType) {
        flexLine.crossSpace = style[mainType] ? style[mainType] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (leftSpace < 0) {
        let scale = style[mainType] / (style[mainType] - leftSpace);
        let currentPosition = mainBase;
        for (let i=0; i<elementChildren.length; i++) {
            let item = elementChildren[i];
            let itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainType] = 0
            }

            itemStyle[mainType] = itemStyle[mainType] * scale;

            itemStyle[mainStart] = currentPosition;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainType];
            currentPosition = itemStyle[mainEnd];
        }
    } else {
        flexLines.forEach(flexLine => {
            let leftSpace = flexLine.leftSpace;
            let flexTotal = 0;

            for (let i=0; i<flexLine.length; i++) {
                let item = flexLine[i];
                let itemStyle = getStyle(item);

                if (itemStyle.flex) {
                    flexTotal += itemStyle.flex
                }
            }

            if (flexTotal > 0) {
                let currentPosition = mainBase;

                for (let i=0; i<flexLine.length; i++) {
                    let item = flexLine[i];
                    let itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSign] = leftSpace / flexTotal;
                    }

                    itemStyle[mainStart] = currentPosition;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainType];
                    currentPosition = itemStyle[mainEnd];
                }
            } else {
                let currentPosition, sp;  // space between 间距
                if (style.flexDirection === 'flex-start') {
                    currentPosition = mainBase;
                    sp = 0
                }
                if (style.flexDirection === 'flex-end') {
                    currentPosition = mainBase + leftSpace * mainSign;
                    sp = 0
                }
                if (style.flexDirection === 'center') {
                    currentPosition = mainBase + leftSpace / 2 * mainSign;
                    sp = 0
                }
                if (style.flexDirection === 'space-between') {
                    currentPosition = mainBase;
                    sp = leftSpace / (flexLine.length - 1) * mainSign
                }
                if (style.flexDirection === 'space-around') {
                    sp = leftSpace / (flexLine.length) * mainSign;
                    currentPosition = mainBase + sp / 2;
                }

                for (let i=0; i<flexLine.length; i++) {
                    let item = flexLine[i];
                    let itemStyle = getStyle(item);

                    itemStyle[mainStart] = currentPosition;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainType];
                    currentPosition = itemStyle[mainEnd] + sp;
                }
            }

        })
    }
    
    // 交叉轴 剩余空间（总体，不是每一行的）
    let crossLeftSpace;
    if(!style[crossType]) {
		crossLeftSpace = 0;
		style[crossType] = 0;
		for(let i=0; i<flexLines.length; i++) {
			style[crossType] += flexLines[i][crossType]
		}
	} else {
		crossLeftSpace = style[crossType];
		for(let flexLine of flexLines) {
			crossLeftSpace -= flexLine[crossType];
		}
	}

	if(style.flexWrap === 'wrap-reverse') {
    	crossBase = style[crossBase]
	} else {
    	crossBase = 0;
	}
	
	let lineSize = style[crossType] / flexLines.length;
    
    let step;
    if(style.alignContent === 'flex-start') {
    	crossBase = 0;
    	step = 0;
	}
	if(style.alignContent === 'flex-end') {
		crossBase += crossSign * crossLeftSpace;
		step = 0;
	}
	if(style.alignContent === 'center') {
		crossBase += crossSign * crossLeftSpace / 2;
		step = 0;
	}
	if(style.alignContent === 'space-between') {
		step = crossLeftSpace / (flexLines.length - 1);
		crossBase += 0;
	}
	if(style.alignContent === 'space-around') {
		step = crossLeftSpace / flexLines.length;
		crossBase += crossSign * step / 2;
	}
	if(style.alignContent === 'stretch') {
		step = 0;
		crossBase = 0;
	}
	
	flexLines.forEach(function (flexLine) {
		let lineCrossType = style.alignContent === 'stretch' ?
			lineSize :
			flexLine.crossSpace;
		
		for(let i=0; i<flexLine.length; i++) {
			let item = flexLine[i];
			let itemStyle= getStyle(item);
			
			let align = itemStyle.alignSelf || style.alignItems;
			
			if(!itemStyle[crossType]) {
				itemStyle[crossType] = align === 'stretch' ? lineCrossType : 0
			}
			
			if(align === 'flex-start') {
				itemStyle[crossStart] = crossBase;
				itemStyle[crossEnd] = crossBase + itemStyle[crossType]
			}
			if(align === 'flex-end') {
				itemStyle[crossEnd] = crossBase + crossSign * lineCrossType;
				itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossType];
			}
			if(align === 'center') {
				itemStyle[crossStart] = crossBase + crossSign * (lineCrossType - itemStyle[crossType]) / 2;
				itemStyle[crossEnd] = itemStyle[crossStart] + itemStyle[crossType];
			}
			if(align === 'stretch') {
				itemStyle[crossStart] = crossBase;
				itemStyle[crossEnd] = crossBase + crossSign * lineCrossType;
				
				itemStyle[crossType] = lineCrossType;  // crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
			}
		}
		
		crossBase += crossSign * (lineCrossType + step)
	})
	
	


}

module.exports = layout;
