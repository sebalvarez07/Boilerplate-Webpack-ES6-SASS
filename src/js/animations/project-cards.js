import { onVisibilityChange, isElementTopInViewportBottom } from './scroll-handlers';

// This class allows us to control each card's animation individually
// Also allows us to use this.alreadyPlayed in order to remove the scroll listener
class CardProjectAnimation {
    constructor(cardProject, id) {
        this.cardProject = cardProject;
        this.alreadyPlayed = false;
        this.id = id;
    };

    setToAlreadyPlayed() { this.alreadyPlayed = true }

    getId() { return this.id };

    timeliner() {
        
        const tl = new TimelineMax({
            onStart: () => {
                this.cardProject.classList.remove('v-hidden-projects');
            }
        });

        const p_line = Array.from(this.cardProject.querySelectorAll('.project__line'));
        const p_img = this.cardProject.querySelector('.project__img');
        const projectIn = Array.from(this.cardProject.querySelectorAll('.project-in'));

        tl.add('card-tl__1')
            .staggerFrom(p_line, 2, {scaleX: 0, ease: Power2.easeOut}, 0.3, 'card-tl__1')
            .from(p_img, 2, {y: 20, opacity: 0, ease: Power2.easeOut}, 'card-tl__1')
            .staggerFrom(projectIn, 1.5, {yPercent: 100, ease: Power3.easeOut}, 0.5, 'card-tl__1')
            ;

        return tl;
    }
}

const cardProjects = Array.from(document.querySelectorAll('.card-project'));
const cardProjectAnimationAll = [];

// Instatiate and store all of the cards to be animated
cardProjects.forEach(cardProject => {
    cardProjectAnimationAll.push(new CardProjectAnimation(cardProject, cardProject.id));
});

const removeEventListener = () => {
    const mainContainer = document.querySelector('.c-main__container');

    if (mainContainer.removeEventListener) {    // all browsers except IE before version 9
        mainContainer.removeEventListener ("scroll", onScroll_animate_projectCards, false);
    }
    else if (mainContainer.detachEvent) {        // IE before version 9
        mainContainer.detachEvent ('scroll', onScroll_animate_projectCards);
    }
}

export const onScroll_animate_projectCards = () => {
    cardProjects.forEach((cardProject, index) => 
        {
            onVisibilityChange(cardProject, isElementTopInViewportBottom, function() {
                const currentCard = cardProjectAnimationAll[index];
                if(!currentCard.alreadyPlayed) {
                    currentCard.timeliner();
                    currentCard.setToAlreadyPlayed();
                }
            })();   // We need the () since onVisibilityChange returns a function

            if(!(!!cardProjectAnimationAll.find(card => card.alreadyPlayed === false))){
                removeEventListener();
            }
        }
    )
};