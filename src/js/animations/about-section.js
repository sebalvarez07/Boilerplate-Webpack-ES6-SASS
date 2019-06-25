import { TweenMax } from 'gsap';
import SplitText from '../gsap-bonus/SplitText';
import { onVisibilityChange } from './scroll-handlers';

// // Returns each line of text
// export const mySplitText = new SplitText(".about__txt", {type:"lines"});

// // Split text and return all elements containing text lines
// export const splitText = () => {

//     // Retrieves text lines and places them inside new span
//     const childrenSplit = mySplitText.lines.map(txtLine => {
//         const textContent = txtLine.textContent;
//         const newElement = document.createElement('span');
//         newElement.textContent = textContent;
//         newElement.style.display = 'inline-block';
//         txtLine.textContent = '';
//         txtLine.appendChild(newElement);
//         return newElement;
//     });

//     return childrenSplit;
// }

// const removeEventListener = () => {
//     const mainContainer = document.querySelector('.c-main__container');

//     if (mainContainer.removeEventListener) {    // all browsers except IE before version 9
//         mainContainer.removeEventListener ("scroll", onScroll_animate_aboutSection, false);
//     }
//     else if (mainContainer.detachEvent) {        // IE before version 9
//         mainContainer.detachEvent ('scroll', onScroll_animate_aboutSection);
//     }
// }

// const removeVHiddens = () => {
//     document.querySelectorAll('.v-hidden-about').forEach(hidden => {
//         hidden.classList.remove('v-hidden-about');
//     });
// }

// const about_text_animation = () => {
    
//     const aboutText = splitText();
//     const tl = new TimelineMax({
//         onStart: () => {
//             removeEventListener();
//             removeVHiddens();
//         }
//     });

//     tl.add('aboutSectionAnimation')
//         .staggerFrom('.a-t--in', 2, {ease: Power3.easeOut, y: 100}, 0.2, 'aboutSectionAnimation')
//         .from('.about-line', 2.5, {ease: Power2.easeOut, scaleY: 0}, 'aboutSectionAnimation')
//         .from('.about-in', 2, {ease: Power3.easeOut, yPercent: 100, delay: 1}, 'aboutSectionAnimation');

//     return tl;
// }

// let didAboutTextAnimate = false;
// const about__txt = document.querySelector('.about__txt');

// export const onScroll_animate_aboutSection = () => {
//     onVisibilityChange(about__txt, function() {
//         if(!didAboutTextAnimate){
//             didAboutTextAnimate = true;
//             about_text_animation().play();
//         }
//     })();
// }

// export class AboutSectionAnimation {
//     constructor () {
//         this.splitText = new SplitText(".about__txt", {type:"lines"});

//         this.aboutAnimation = new TimelineMax({
//             paused: true,
//             onStart: () => {
//                 this.removeEventListener();
//                 this.removeVHiddens();
//             }
//         });

//         this.animationTriggered = false;
//         this.createAboutAnimation();
//     }

//     breakDownSplitTxt () {
//         const childrenSplit = this.splitText.lines.map(txtLine => {
//             const textContent = txtLine.textContent;
//             const newElement = document.createElement('span');
//             newElement.textContent = textContent;
//             newElement.style.display = 'inline-block';
//             txtLine.textContent = '';
//             txtLine.appendChild(newElement);
//             return newElement;
//         });
//         return childrenSplit;
//     }

//     removeEventListener () {
//         const mainContainer = document.querySelector('.c-main__container');
    
//         if (mainContainer.removeEventListener) {    // all browsers except IE before version 9
//             mainContainer.removeEventListener ("scroll", onScroll_animate_aboutSection, false);
//         }
//         else if (mainContainer.detachEvent) {        // IE before version 9
//             mainContainer.detachEvent ('scroll', onScroll_animate_aboutSection);
//         }
//     }

//     removeVHiddens() {
//         document.querySelectorAll('.v-hidden-about').forEach(hidden => {
//             hidden.classList.remove('v-hidden-about');
//         });
//     }

//     playAnimation() {
//         this.aboutAnimation.play();
//     }

//     createAboutAnimation(){
//         const aboutText = this.breakDownSplitTxt();
    
//         this.aboutAnimation
//             .add('aboutSectionAnimation')
//             .staggerFrom(aboutText, 2, {ease: Power3.easeOut, y: 100}, 0.2, 'aboutSectionAnimation')
//             .from('.line-section', 2.5, {ease: Power2.easeOut, scaleX: 0}, 'aboutSectionAnimation')
//             .from('.about-in', 2, {ease: Power3.easeOut, yPercent: 100, delay: 1}, 'aboutSectionAnimation');
//     }
// }

// const aboutAnimation = new AboutSectionAnimation();

// const about__txt = document.querySelector('.about__txt');
// export const onScroll_animate_aboutSection = () => {
    
//     onVisibilityChange(about__txt, function() {
//         if(!aboutAnimation.animationTriggered){
//             aboutAnimation.animationTriggered = true;
//             aboutAnimation.playAnimation();
//         }
//     })();
// }