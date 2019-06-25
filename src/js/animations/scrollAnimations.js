import { TweenMax } from 'gsap';
import { onVisibilityChange } from './scroll-handlers';
import SplitText from '../gsap-bonus/SplitText';

// Returns each line of text
export const mySplitText = new SplitText(".about__txt", {type:"lines"});

// Split text and return all elements containing text lines
export const splitText = () => {

    // Retrieves text lines and places them inside new span
    const childrenSplit = mySplitText.lines.map(txtLine => {
        const textContent = txtLine.textContent;
        const newElement = document.createElement('span');
        newElement.textContent = textContent;
        newElement.style.display = 'inline-block';
        txtLine.textContent = '';
        txtLine.appendChild(newElement);
        return newElement;
    });

    return childrenSplit;
}

class ScrollGroupAnimation {
    constructor(currentGroup, id) {
        this.currentGroup = currentGroup;
        this.id = id;
        this.scrollAnimation = new TimelineMax({
            paused: true,
            onStart: () => {
                this.removeHiddens();
            }
        });

        this.about = this.currentGroup.querySelector('.about__txt');

        this.textIn = this.currentGroup.querySelectorAll('.s-a-in');
        this.textIn = this.textIn ? this.textIn = Array.from(this.textIn) : null;

        this.line = this.currentGroup.querySelectorAll('.line-section');
        this.line = this.line ? this.line = Array.from(this.line) : null;

        this.img = this.currentGroup.querySelectorAll('.project__img');
        this.img = this.img ? this.img = Array.from(this.img) : null;

        this.hasPlayed = false;

        this.createAnimation();
    }

    removeHiddens () {
        this.currentGroup.classList.remove('s-a-v');
    }

    createAnimation () {

        this.scrollAnimation.add('groupAnimation');

        if(this.about) {
            const aboutLines = splitText();
            this.scrollAnimation.add(TweenMax.staggerFrom(aboutLines, 2, {yPercent: 100, ease: Power3.easeOut}, 0.3), 'groupAnimation')
        }

        if(!!this.img) {
            this.scrollAnimation.add(TweenMax.staggerFrom(this.img, 2, {opacity: 0, ease: Power3.easeOut}, 0.3), 'groupAnimation')
        }

        if(!!this.textIn) {
            this.scrollAnimation.add(TweenMax.staggerFrom(this.textIn, 2, {yPercent: 100, ease: Power3.easeOut}, 0.1), 'groupAnimation')
        }

        if(!!this.line) {
            this.scrollAnimation.add(TweenMax.staggerFrom(this.line, 2, {scaleX: 0, ease: Power3.easeOut}, 0.3), 'groupAnimation')
        }
    }
    setToAlreadyPlayed() {
        this.hasPlayed = true;
    }

    playAnimation () {
        this.scrollAnimation.play();
    }
}

const removeEventListener = () => {
    const mainContainer = document.querySelector('.c-main__container');

    if (mainContainer.removeEventListener) {    // all browsers except IE before version 9
        mainContainer.removeEventListener ("scroll", onScrollAnimation, false);
    }
    else if (mainContainer.detachEvent) {        // IE before version 9
        mainContainer.detachEvent ('scroll', onScrollAnimation);
    }
}


const scrollGroups = Array.from(document.querySelectorAll('.s-a-group'));
const scrollGroupObjs = [];

scrollGroups.forEach((scrollGroup, index) => {
    scrollGroupObjs.push(new ScrollGroupAnimation(scrollGroup, index));
});

export const onScrollAnimation = () => {
    scrollGroups.forEach((scrollGroup, index) => {
        onVisibilityChange(scrollGroup, function() {
            const currentGroup = scrollGroupObjs[index];
            if(!currentGroup.hasPlayed) {
                currentGroup.playAnimation();
                currentGroup.setToAlreadyPlayed();
            }
        })();

        if(!(!!scrollGroupObjs.find(scrollGroup => scrollGroup.hasPlayed === false))){
            removeEventListener();
        }
    })
}