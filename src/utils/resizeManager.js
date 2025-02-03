let instance = null

export class ResizeManager {

    constructor() {
        this.listUI = [];
        this.onResize();
        const resizeEvent = new Event("resize");
        window.dispatchEvent(resizeEvent);
    }

    registerUI(view) {
        this.listUI.push(view);
    }

    static getInstance() {
        if (instance == null) {
            instance = new ResizeManager();
        }

        return instance;
    }

    onResize() {
        window.addEventListener("resize", (e) => {
            setTimeout( ()=> {
                this.resizeData = {
                    width: screen.width,
                    height: screen.height,
                    pixelRatio: Math.min(screen.width / screen.height, screen.height / screen.width)
                }
                this.listUI.forEach(ui => {
                    ui.onResize(this.resizeData);
                });
            }, 0)
        });

    }

    getResizeData() {
        return this.resizeData;
    }
}