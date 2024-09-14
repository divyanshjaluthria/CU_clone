

// Initialize LocomotiveScroll for smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Function to animate elements on the first page
function firstPageAnimation() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: '0',
        duration: 2,
        ease: Expo.easeInOut,
        stagger: 0.2,
        delay: -0.5
    })
    .from("#herofooter", {
        y: '-10',
        opacity: 0,
        duration: 0.5,
        ease: Expo.easeInOut,
        delay: -0.1
    });
}

// Function to handle circle skew effect on mouse move
function circleSkew() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    var timeout;

    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout);

        // Calculate scale based on mouse movement
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;

        // Update circle position and scale
        circleMouseFollower(dets.clientX, dets.clientY, xscale, yscale);

        // Reset circle to original scale after 100ms
        timeout = setTimeout(function() {
            document.querySelector("#circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

// Function to update circle position and scale
function circleMouseFollower(x, y, xscale, yscale) {
    document.querySelector("#circle").style.transform = `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;
}

// Initialize animations and event listeners
firstPageAnimation();
circleSkew();

// Function to handle image rotation on mouse move within elements
document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var diff = 0;

    elem.addEventListener("mousemove", function(dets) {
        diff = dets.clientX - rotate;
        rotate = dets.clientX;

        const img = elem.querySelector("img");
        img.style.display = 'block';
        img.style.opacity = 1;

        const rect = elem.getBoundingClientRect();
        const x = dets.clientX - rect.left;
        const y = dets.clientY - rect.top;

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = `rotate(${gsap.utils.clamp(-20, 20, diff)}deg)`;
    });

    elem.addEventListener("mouseleave", function() {
        const img = elem.querySelector("img");
        img.style.display = 'none';
        img.style.opacity = 0.5;
        img.style.left = '0px';
        img.style.top = '0px';
    });
});
