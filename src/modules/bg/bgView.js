import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";
import {SpineCustom} from "../../utils/spine";

export class BgView extends View {

    constructor(parent) {
        super(parent);
        this.addBg();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
        this.playBgSound();
        this.addTest();
    }

    addBg() {
        this.bg = new Sprite ({
            texture: Assets.get("bg"),
            alpha: 1,
            anchor: 0.5,
            scale: 0.8,
        })
        this.addChild(this.bg);
    }

    addTest() {
        const spine = new SpineCustom({
            spineData: "spineboy",
            scale: 1,
            parent: this,
            position: {
                x: 0,
                y: -400,
            }
        })

        spine.playAnimation(0, "Win", true)
    }

    playBgSound() {
        this.soundsManager.play("backgroundSound", 0.1);
    }

    onResize(size) {
        super.onResize(size);
        this.scale.set(Math.max(size.width / size.height, size.height / size.width) / 2);
    }
}