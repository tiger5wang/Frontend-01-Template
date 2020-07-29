

function enableGesture(body) {
    let contexts = Object.create(null);
    let MOUSE_SYMBOL = Symbol('mouse');

// document.ontouchstart  移动端为 null， PC 端为 undefined
    if (document.ontouchstart !== null) {  // 去掉移动端的 mouse 事件
        body.addEventListener('mousedown', () => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL]);

            let mousemove = (event) => {
                move(event, contexts[MOUSE_SYMBOL])
                // console.log(event.clientX, event.clientY)
            };
            let mouseup = (event) => {
                end(event, contexts[MOUSE_SYMBOL]);
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseup);
            };
            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseup);
        });
    }


    body.addEventListener('touchstart', event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
    });

    body.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    });

    body.addEventListener('touchend', event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier]
        }
    });

    body.addEventListener('touchcancel', event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    });

    let start = (point, context) => {
        // 派发事件
        let dispatch = new CustomEvent('start', );
        Object.assign(dispatch, {
            startX: point.clientX,
            startY: point.clientY,
            pointX: point.clientX,
            pointY: point.clientY
        });
        document.dispatchEvent(dispatch);

        context.startX = point.clientX; context.startY = point.clientY;
        context.moves = [];
        context.isTap = true;  // 点击
        context.isPan = false;  // 移动
        context.isPress = false;  // 长按
        // 点按 500ms 后触发 press
        context.timeoutHandler = setTimeout(() => {
            if (context.isPan)  // pan 过程中不触发 press
                return;
            // 触发 press ，更改状态
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            // 派发事件
            let dispatch = new CustomEvent('press-start', );
            Object.assign(dispatch, {
                startX: point.clientX,
                startY: point.clientY,
                pointX: point.clientX,
                pointY: point.clientY
            });
            document.dispatchEvent(dispatch);
        }, 500)

    };

    let move = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;
        // 移动距离 大于 10px 触发 pan ，修改状态
        if (dx **2 + dy ** 2 > 100 && !context.isPan) {
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            // 派发事件
            let dispatch = new CustomEvent('pan-start', );
            Object.assign(dispatch, {
                startX: context.startX,
                startY: context.startY,
                pointX: point.clientX,
                pointY: point.clientY
            });
            document.dispatchEvent(dispatch)
        }
        if (context.isPan) {
            context.moves.push({
                dx,  dy, t: Date.now()
            });
            // 过滤出最后 300ms 的move 事项
            context.moves = context.moves.filter(move => Date.now() - move.t < 300);
            // 派发事件
            let dispatch = new CustomEvent('pan-move', );
            Object.assign(dispatch, {
                startX: context.startX,
                startY: context.startY,
                pointX: point.clientX,
                pointY: point.clientY
            });
            document.dispatchEvent(dispatch)
        }
    }

    let end = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;

        // 结束时打印对应的最后状态
        if (context.isPan) {
            // 派发事件

            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);

            let isFlick = speed > 2.5;  // 速度大于 2.5 触发 flick
            if (isFlick) {
                // 派发事件
                let dispatch = new CustomEvent('flick', );
                Object.assign(dispatch, {
                    startX: context.startX,
                    startY: context.startY,
                    pointX: point.clientX,
                    pointY: point.clientY,
                    speed
                });
                document.dispatchEvent(dispatch)
            }

            // 派发事件
            let dispatch = new CustomEvent('pan-end', );
            Object.assign(dispatch, {
                startX: context.startX,
                startY: context.startY,
                pointX: point.clientX,
                pointY: point.clientY,
                speed,
                isFlick
            });
            document.dispatchEvent(dispatch)
        }

        if (context.isTap) {
            // 派发事件
            document.dispatchEvent(new CustomEvent('tap', {}))
        }

        if (context.isPress) {
            // 派发事件
            let dispatch = new CustomEvent('press-end', );
            Object.assign(dispatch, {
                startX: context.startX,
                startY: context.startY,
                pointX: point.clientX,
                pointY: point.clientY
            });
            document.dispatchEvent(dispatch)
        }
        // 清除定时器
        clearTimeout(context.timeoutHandler)
    };

    let cancel = (point, context) => {
        console.log('cancel')
        // 清除定时器
        clearTimeout(context.timeoutHandler)
    }
}

