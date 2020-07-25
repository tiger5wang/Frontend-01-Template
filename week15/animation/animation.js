export class Timeline {
    constructor() {
        this.animations = [];  // 用于存放所有的动画
        this.requestId= null;  // 动画id
        this.status = 'inited';  // 动画的状态
        this.startTime = Date.now();  // 记录开始时间
    }

    tick() {
        let t = Date.now() - this.startTime;   // 当前时间和动画开始时间的时间差
        // console.log(t)
        // 过滤出没有结束的动画
        let animations = this.animations.filter(animation => !animation.finished);
        // 遍历所有的动画，计算相关值，并赋值到 属性上
        for (let animation of this.animations) {
            // 结构动画组件属性
            let {object, property, start, end, timingFunction, delay, template, duration, addTime} = animation;
            // console.log(addTime, t - delay - addTime)
            // 按照时间比例、运动函数 计算进程
            let progression = timingFunction((t - delay - addTime)/duration);  // 0-1 之间的数
            // 由于(t - delay - addTime)/duration 不会每次都得到1， 导致计算的值小于审定的值，
            // 所有t > duration + delay + addTime 时，要将 progression制成 1，使用完整的值
            if (t > duration + delay + addTime) {
                progression = 1;
                animation.finished = true;  // 状态完成
            }
            // 计算动画的相关属性的值
            // let value = start + progression * (end - start);
            let value = animation.valueFromProgression(progression);
            // 给 元素的 style 添加上 动画属性
            // object[property] = template(timingFunction(start, end)(t - delay));
            object[property] = template(value);
        }
        // 如果动画池中存在动画，就执行动画
        if (animations.length) {
            this.requestId = requestAnimationFrame(() => this.tick())
        }
    }
    // 动画开始方法
    start() {
        // 必须要时 inited 状态时，才会执行开始动画
        if (this.status !== 'inited')
            return;
        this.status = 'playing';   // 开始执行后更改状态
        this.startTime = Date.now();  // 记录开始时间
        this.tick();
    }
    // 重新开始i方法
    restart() {
        // 如果正在执行，则先暂停动画
        if (this.status === 'playing')
            this.pause();
        // this.animations = [];
        this.requestId= null;  // 将动画id清空
        this.status = 'playing';  // 改状态
        this.startTime = Date.now();  // 记录开始时间
        for (let animation of this.animations) {  // 技术标识改为 false
            animation.finished = false;
        }
        this.tick();
    }
    // 暂停方法
    pause() {
        // 动画执行过程中才能只能暂停动作
        if (this.status !== 'playing')
            return;
        this.status = 'pause';
        this.pauseTime = Date.now();  // 记录暂停时的时间，便于继续的时候计算时间差值
        if (this.requestId != null)  // 清楚动画 id
            cancelAnimationFrame(this.requestId)
    }
    // 继续动画方法
    resume() {
        if (this.status !== 'pause')
            return;
        this.status = 'playing';
        this.startTime += Date.now() - this.pauseTime;  // 开始时间要加上暂停的这段时间
        this.tick();
    }
    // 动画池中添加动画， addTime 表示动画开始的时间时的时间要向前加多少
    add(animation, addTime) {
        this.animations.push(animation);
        animation.finished = false;
        if (this.status === 'playing') {
            // console.log('----------------------',addTime, Date.now()-this.startTime)
            animation.addTime = addTime !== undefined ? addTime : Date.now()-this.startTime;
        } else {
            animation.addTime = addTime !== undefined ? addTime : 0
        }
    }
}

export class Animation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.template = template || (v => `rgba(${v.r}, ${v.g},${v.b},${v.a})`);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay =delay || 0;
        this.timingFunction = timingFunction || ((start,  end) => {
            return (t) => start + t / duration * (end - start)
        });
    }
    // 计算进程值
    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start)
    }
}
export class ColorAnimation {
    constructor(object, property, start, end, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.template = template || (v => `rgba(${v.r}, ${v.g},${v.b},${v.a})`);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay =delay || 0;
        this.timingFunction = timingFunction || ((start,  end) => {
            return (t) => start + t / duration * (end - start)
        });
    }
    // 计算 颜色值
    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        };
    }
}

/*
let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
let animation2 = new Animation(object, property, start, end, duration, delay, timingFunction)
------ 1-----
animation.start()
animation2.start()
animation.pause()
animation.resume()
animation.stop()

----- 2 -----
let timeline = new Timeline;
timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()

setTimeout
setInterval
requestAnimationFrame
 */