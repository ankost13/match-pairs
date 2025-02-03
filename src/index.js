import {App} from "./app/app";

const app = new App
await app.init({
    background: '#123',
    width: window.innerWidth,
    height: window.innerHeight,
    autoResize: true,
    resizeTo: window,
    resolution: 1,
    autoDensity: true,
});

document.body.appendChild(app.canvas);
globalThis.__PIXI_APP__ = app;