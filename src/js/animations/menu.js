import { TweenMax } from 'gsap';

export class MenuAnimation {
    constructor() {
        this.menuTimeline = new TimelineMax({
            paused: true,
            onStart: () => {
                this.removeHiddens();
                this.playElasticLines();
            },
            onReverseComplete: () => {
                this.addHiddens();
                this.resetElasticLines();
            }
        });

        this.allHidden = document.querySelectorAll('.v-hidden-burger');
        this.burgerTimeline = new TimelineMax({paused: true,});

        this.createMenuAnimation();
        this.createBurgerAnimation();

        this.isMobile = false;
        this.currentContainerTween = null;
    }

    init () {
        if(window.innerWidth > 1025) {
            this.set_containerTween_lg();
        } else {
            this.set_containerTween_sm();
            this.isMobile = true;
        }
    }

    removeHiddens () {
        this.allHidden.forEach(hidden => {
            hidden.classList.remove('v-hidden-burger');
        });
    }

    addHiddens () {
        this.allHidden.forEach(hidden => {
            hidden.classList.add('v-hidden-burger');
        });
    }

    createMenuAnimation () {
        this.menuTimeline
            .add('onOpen')
            .staggerFrom('.about-line__svg', 1, {opacity: 0,  ease: Power2.easeInOut, delay: .2}, 'onOpen')
            .staggerFrom('.skills-reel__container', 1, {opacity: 0}, 'onOpen')
            .to('.c-m__content-op-b', 1, {opacity: 0, ease: Power2.easeOut}, 'onOpen')
            .to('.under-date', 1.5, {x: 100, ease: Power3.easeInOut}, 'onOpen')
            .from('.contact-under-active', 2, {opacity: 0, ease: Power3.easeInOut, delay: 1}, 'onOpen')
            .staggerFrom('.burger-in', 2, {yPercent: 100, ease: Power3.easeInOut, delay: 1}, 0.2, 'onOpen')
            .to('.profile-img__curtain', 1.5, {scaleY: 0, ease: Power3.easeInOut, delay: 1}, 'onOpen')
            .add('endOpen')
            ;
    }

    createBurgerAnimation () {
        this.burgerTimeline
            .add('burgero')
            .to('.b-line-1', 1, {rotation: 45, y: -4.5, ease: Power2.easeInOut}, 'burgero')
            .to('.b-line-2', 1, {rotation: -45, y: 5, ease: Power2.easeInOut}, 'burgero');
    }

    playElasticLines () {
        TweenMax.staggerFrom('.about-line__svg path', 3.5, {attr:{d:'M0,25 Q200,115 700,25'}, ease: Elastic.easeOut.config(1, 0.2)}, 0.1);
    }

    resetElasticLines () {
        TweenMax.set('.about-line__svg path', {attr:{d:'M0,25 Q200,25 700,25'}});
    }

    set_containerTween_sm () {
        this.currentContainerTween = new TweenMax.fromTo('.c-main__container', 2, {width: '100vw'}, {width: '0', ease: Power2.easeInOut});
        this.addTween(this.currentContainerTween, 'onOpen');
    }

    set_containerTween_lg () {
        this.currentContainerTween = new TweenMax.fromTo('.c-main__container', 2, {width: '91.14883vw'}, {width: '50vw', ease: Power2.easeInOut});
        this.addTween(this.currentContainerTween, 'onOpen');
    }

    removeTween (tween) {
        this.menuTimeline.remove(tween);
    }

    addTween (tween, label) {
        this.menuTimeline.add(tween, label);
    }

    containerTransitionTween (_width) {
        TweenMax.to('.c-main__container', 1, {width: _width, ease: Power2.easeInOut})
    }

    swapTween (from_lg_to_sm, isMenuOpen) {
        this.removeTween(this.currentContainerTween);
        if(isMenuOpen) {
            from_lg_to_sm ? this.containerTransitionTween('0') : this.containerTransitionTween('50vw')
        }
        from_lg_to_sm ? this.set_containerTween_sm() : this.set_containerTween_lg();
        this.isMobile = from_lg_to_sm;
    }

    playAnimation (timeScale = 1) {
        this.menuTimeline.play().timeScale(timeScale);
        this.burgerTimeline.play().timeScale(timeScale);
    }

    reverseAnimation (timeScale = 1) {
        this.menuTimeline.reverse().timeScale(timeScale);
        this.burgerTimeline.reverse().timeScale(timeScale);
    }
};