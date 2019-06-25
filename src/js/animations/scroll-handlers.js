export function isElementTopInViewportBottom (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - 200
    );
}

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