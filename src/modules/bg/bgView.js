import {View} from "../../utils/view";
import {Assets, Sprite} from "pixi.js";
import {Spine} from "@pixi-spine/runtime-3.7";

export class BgView extends View {
    constructor(parent) {
        super(parent);
        this.addBg();
        this.position.set(window.innerWidth / 2, window.innerHeight / 2);
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
}