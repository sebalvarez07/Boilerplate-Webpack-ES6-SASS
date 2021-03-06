import '../styles/main.scss';
import './gsap-bonus/MorphSVGPlugin';
import { IntroAnimation } from './animations/intro-animations';
import { onScrollAnimation } from './animations/scrollAnimations';
import { MenuAnimation } from './animations/menu';

const scrollContainer = document.querySelector('.c-main__container');
const wrapper = document.querySelector('.wrapper');
const menuAnimation = new MenuAnimation();
const introAnimation = new IntroAnimation();

const menuListener = () => {
    const allBurgers = Array.from(document.querySelectorAll('.burger'));

    allBurgers.forEach(burger => {
        burger.addEventListener('click', () => {
            wrapper.classList.toggle('active-under');
            if(wrapper.classList.contains('active-under')) {
                menuAnimation.playAnimation();
            } else {
                menuAnimation.reverseAnimation(1.5);
            }    
        });
    });
}

async function onLoad () {
    window.scrollTo(0, 0);
    introAnimation.playDoubleIntro().then(res => {
        menuAnimation.init();
        menuListener();
    })
}

const resetMenuAnimation = () => {

    const isMenuOpen = wrapper.classList.contains('active-under');
    const from_lg_to_sm = window.innerWidth < 1025;

    if(isMenuOpen) {
        if(!menuAnimation.isMobile && from_lg_to_sm){
            menuAnimation.swapTween(from_lg_to_sm, isMenuOpen);
        }
        else if(menuAnimation.isMobile && !from_lg_to_sm){
            menuAnimation.swapTween(from_lg_to_sm, isMenuOpen);
        }
    }
    else {
        if(from_lg_to_sm){
            menuAnimation.swapTween(from_lg_to_sm, isMenuOpen);
        }
        else if(!from_lg_to_sm){
            menuAnimation.swapTween(from_lg_to_sm, isMenuOpen);
        }
    }
}

if (window.addEventListener) {
    addEventListener('DOMContentLoaded', onLoad, false); 
    scrollContainer.addEventListener('scroll', onScrollAnimation, false);
    addEventListener('resize', resetMenuAnimation, false);
} else if (window.attachEvent)  {
    attachEvent('onDOMContentLoaded', onLoad);
    scrollContainer.attachEvent('onscroll', onScrollAnimation);
    attachEvent('onresize', resetMenuAnimation);
}