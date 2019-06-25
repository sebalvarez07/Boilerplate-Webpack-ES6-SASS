import { about_text_animation } from './about-section';
import { TweenMax, TimelineMax } from 'gsap';
 
export function isElementTopInViewportBottom (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 200
    );
}

// export function isElementTopInViewportTop (el) {
//     var rect = el.getBoundingClientRect();
//     return (
//         rect.top <= 35
//     );
// }

export const onVisibilityChange = (el, callback) => {
    let old_visible = false;
    return function () {
        let visible = isElementTopInViewportBottom(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback(visible);
            }
        }
    }
}

// const about__section = document.querySelector('.about');
// export const scrollUI = onVisibilityChange(about__section, isElementTopInViewportTop, function(isOnTop) {
//     const scrollerUI = document.querySelector('.scroll-UI');
//     if(isOnTop){
//         scrollerUI.classList.add('fixed');
//     }
//     else {
//         scrollerUI.classList.remove('fixed');
//     }
// });