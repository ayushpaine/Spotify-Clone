const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar2');
    const navLinks = document.querySelectorAll('.navbar2 li')
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease-in-out forwards ${0.35*index / 7 -  0.2}s`;
            }

        });
    });

}
navSlide();
const track = document.querySelector('.track');
let initialPosition = null;
let moving = false;
let transform = 0;

const gestureStart = (e) => {
    initialPosition = e.pageX;
    moving = true;
    const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
        transform = parseInt(transformMatrix.split(',')[4].trim());
    }
}

const gestureMove = (e) => {
    if (moving) {
        const currentPosition = e.pageX;
        const diff = currentPosition - initialPosition;
        track.style.transform = `translateX(${transform + diff}px)`;
    }
};

const gestureEnd = (e) => {
    moving = false;
}

if (window.PointerEvent) {
    window.addEventListener('pointerdown', gestureStart);

    window.addEventListener('pointermove', gestureMove);

    window.addEventListener('pointerup', gestureEnd);
} else {
    window.addEventListener('touchdown', gestureStart);

    window.addEventListener('touchmove', gestureMove);

    window.addEventListener('touchup', gestureEnd);

    window.addEventListener('mousedown', gestureStart);

    window.addEventListener('mousemove', gestureMove);

    window.addEventListener('mouseup', gestureEnd);
}