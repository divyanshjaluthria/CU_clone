

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

imagesLoaded(scrollContainer, { background: true }, function () {
    scroll.update();});