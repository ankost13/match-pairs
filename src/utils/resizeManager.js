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
            this.resizeData = {
                width: e.currentTarget.innerWidth,
                height: e.currentTarget.innerHeight,
                pixelRatio: e.currentTarget.innerWidth / e.currentTarget.innerHeight
            }
            this.listUI.forEach(ui => {
                ui.onResize(this.resizeData);
            });
        });

    }

    getResizeData() {
        return this.resizeData;
    }
}