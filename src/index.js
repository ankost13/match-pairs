import {App} from "./app/app";

const app = new App
await app.init({
    background: '#123',
    width: window.innerWidth,
    height: window.innerHeight,
});
window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
})
document.body.appendChild(app.canvas);
globalThis.__PIXI_APP__ = app;
