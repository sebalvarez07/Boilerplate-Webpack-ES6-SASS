import { TweenMax } from 'gsap';
import '../gsap-bonus/MorphSVGPlugin';

export class IntroAnimation {
    constructor() {
        this.mainIntro = new TimelineMax({
            paused: true,
            onStart: this.removeMainIntroHiddens
        });

        this.locomotiveIntro = new TimelineMax({
            paused: true,  
            onStart: this.removeLocoIntroHiddens
        });

        this.createLocoIntroAnimation();
        this.createMainIntroAnimation();
        
        window.innerWidth > 1025 ? this.mainIntro.add(this.containerTweenLg, 'width-and-under') : null;
        
    };

    removeLocoIntroHiddens () {
        document.querySelectorAll('.v-hidden-loco').forEach(hidden => {
            hidden.classList.remove('v-hidden-loco');
        });
        document.body.style.overflow = 'hidden';
    };

    removeMainIntroHiddens () {
        document.querySelectorAll('.v-hidden-intro').forEach(hidden => {
            hidden.classList.remove('v-hidden-intro');
        });
        document.body.style.overflow = 'visible';
    };

    containerTweenLg () {
        return new TweenMax.to('.c-main__container', 2, {width: '91.1488vw', ease: Power2.easeOut});
    };

    createLocoIntroAnimation () {

        const updateLoadNum = (tween) => {
            const loadNumEl = document.querySelector('.num');
            loadNumEl.textContent = tween.target.num.toFixed(0);
        }

        this.locomotiveIntro
            .add('load-in')
            .staggerFrom('.loco-in', 1, {ease: Power3.easeOut, yPercent: 100}, 0.2, 'load-in')
            .to('.loader-line', 1, {ease: Power2.easeOut, scaleX: 1}, 'load-in')
            .add('load-blue')
            .staggerTo('.load-blue', 3, {ease: Power2.easeOut, scaleX: 1}, 'load-blue')
            .to({num: 0}, 3, {ease: Power2.easeOut, num: 100, onUpdate: updateLoadNum, onUpdateParams:["{self}"]}, 'load-blue')
            .add('load-out')
            .staggerTo('.loco-out', 1, {ease: Power2.easeOut, yPercent: -120}, 0.2, 'load-out')
            .to('.loader-line', 1, {ease: Power2.easeOut, scaleX: 0}, 'load-out');
    };

    createMainIntroAnimation () {
        this.mainIntro
            .add('width-and-under')
            .staggerFrom('.burger-line', 2, {x: 200, scaleX: '10', ease: Power3.easeOut}, 0.5, 'width-and-under')
            .from('.under-date', 2, {opacity: 0, xPercent: '-100', ease: Power3.easeOut}, 'width-and-under')
            .add('line-and-txt', '-=1.2')
            .from('#curve__intro path', 1, {yPercent: 100, ease: Power3.easeOut}, 'line-and-txt')
            .from('#curve__intro path', 4.5, {attr:{d:'M0,50 Q450,155 900,50'}, ease: Elastic.easeOut.config(1, 0.2)}, 'line-and-txt')
            .staggerFrom('.msg-txt-in', 2, {ease: Power3.easeOut, y: '110%'}, 0.1, 'line-and-txt')
            .staggerFrom('.header--mobile .header-txt-in', 2, {ease: Power3.easeOut, y: '110%', delay: 1}, 0.2, 'line-and-txt')
            .staggerFrom('.header--dsk .header-txt-in', 2, {ease: Power3.easeOut, y: '110%', delay: 1}, 0.2, 'line-and-txt')
            .from('.intro-img', 1, {opacity: 0, x: -10, ease: Power3.easeOut, delay: 1}, 'line-and-txt')
            .from('.city-under', 2, {opacity: 0, ease: Power3.easeOut, delay: 1}, 'line-and-txt');
            
    };

    playLocoIntroAnimation(timeScale = 1) {
        this.locomotiveIntro.play().timeScale(timeScale);
    };

    playMainIntroAnimation(timeScale = 1) {
        this.mainIntro.play().timeScale(timeScale);
    };

    async playDoubleIntro () {
        return new Promise(resolve => {
            this.playLocoIntroAnimation();
            this.locomotiveIntro.eventCallback("onComplete", () => {

                // Remove loco intro from HTML
                const introLoco = document.querySelector('.intro-locomotive');
                introLoco.parentNode.removeChild(introLoco);

                this.playMainIntroAnimation(1);
                this.mainIntro.eventCallback("onComplete", () => {
                    // Let app know when it has finished
                    resolve(true);
                });
            });
        });
    }
}