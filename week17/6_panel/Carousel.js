import {createElement, TextNode, Wrapper} from '../../createElement'
import {Timeline, Animation} from "./animation";
import {ease} from './cubicBezier';

import css from './carousel.css'
console.log(css)




export class Carousel {
    constructor() {
        this.children = [];
    }

    setAttribute(name, value) {   // attribute
        // console.log('MyComponent::setAttribute', name, value);
        this[name] = value;
    }

    appendChild(child) {   // 添加children 的方法一
        this.children.push(child)
    }

    render() {
        let position = 0;
        let timeline = new Timeline();
        timeline.start();

        let timer = null;
        let offset = 0;

        let children = this.data.map((url, currentPosition) => {
            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;

            let offset = 0;

            let onStart = () =>{
                timeline.pause();
                timer && clearTimeout(timer);

                let current = children[currentPosition];
                let currentTransformValue = Number(current.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            };

            let onPanmove = (event) =>{
                let last = children[lastPosition];
                let current = children[currentPosition];
                let next = children[nextPosition];

                let lastTransformValue = -500 -500 * lastPosition + offset;
                let currentTransformValue = - 500 * currentPosition + offset;
                let nextTransformValue =  500 -500 * nextPosition + offset;

                let dx = event.pointX - event.startX;

                last.style.transform = `translateX(${lastTransformValue + dx}px)`;
                current.style.transform = `translateX(${currentTransformValue + dx}px)`;
                next.style.transform = `translateX(${nextTransformValue + dx}px)`;
                // console.log(lastTransformValue, currentTransformValue, nextTransformValue)
            }

            let onPanend = event =>{
                let direction = 0;
                let dx = event.pointX - event.startX;

                if (dx + offset > 250) {
                    direction = 1
                }
                if (dx + offset < -250) {
                    direction = -1
                }

                timeline.reset();
                timeline.start();

                let last = children[lastPosition];
                let current = children[currentPosition];
                let next = children[nextPosition];

                let lastAnimation = new Animation(last.style, 'transform',-500 - 500 * lastPosition + offset + dx, -500 - 500 * lastPosition + direction * 500, 1000, 0, ease, v => `translateX(${v}px)`);
                let currentAnimation = new Animation(current.style, 'transform',- 500 * currentPosition + offset + dx, - 500 * currentPosition + direction * 500, 1000, 0, ease, v => `translateX(${v}px)`);
                let nextAnimation = new Animation(next.style, 'transform',500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 1000, 0, ease, v => `translateX(${v}px)`);

                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                position = (position - direction + this.data.length) % this.data.length;

                timer = setTimeout(nextPic, 3000)

            }

            let element = <img src={url} alt={'轮播图'} enableGesture={true} onStart={onStart} onPanmove={onPanmove} onPanend={onPanend}/>;
            element.style.transform = 'translateX(0px)';
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });
        let root = <div class="carousel">
            {children}
        </div>;

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            // timeline = new Timeline();

            window.xtimeline = timeline;
            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform',-100 * position, -100 - 100 * position, 1000, 1000, ease, v => `translateX(${5*v}px)`);
            let nextAnimation = new Animation(next.style, 'transform',100-100 * nextPosition, -100 * nextPosition, 1000, 1000, ease, v => `translateX(${5*v}px)`);

            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            console.log('+++++++++++++++++++++++++++')
            position = nextPosition;

            window.timeout = timer = setTimeout(nextPic, 3000)
        };

        timer = setTimeout(nextPic, 3000);  // 记录刚开始的定时器ID，以便销毁，防止在刚进入页面时在函数执行之前 鼠标滑动图片，导致又开启一个 定时器

        return root;
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }
}
