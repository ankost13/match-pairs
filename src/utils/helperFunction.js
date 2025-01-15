import gsap from 'gsap';

export function setAnimationTimeoutSync(timeout) {
    return new Promise(resolve => {
        gsap.to({x: 0}, {
            duration: timeout,
            x: 1,
            onComplete: resolve
        })
    });
}

export function randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export function setPivotForContainer(container, pivotX, pivotY) {
    if (!container || typeof container.addChild !== 'function') {
        throw new Error('Provided argument is not a valid PIXI.Container');
    }

    const bounds = container.getLocalBounds();
    container.pivot.set(bounds.x + bounds.width * pivotX, bounds.y + bounds.height * pivotY);
}