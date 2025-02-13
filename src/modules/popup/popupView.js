import {View} from "../../utils/view";
import {Assets, Sprite, TextStyle, Text, Application, BitmapText} from "pixi.js";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import gsap from "gsap";

export class PopupView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.createPopup();
        this.createTextMassage();
    }

    createPopup() {
        this.popup = new Sprite({
            texture: Assets.get("popup"),
            alpha: 1,
            anchor: {
                x: 0.5,
                y: 0,
            },
            visible: false,
        })
        this.popupHeight = this.popup.height;
        this.popup.scale.set(1, 0);
        this.popup.position.set(this.size.width / 2, 0);
        this.addChild(this.popup);
    }

    async showPopup() {
        this.popup.visible = true;
        this.playInAnimation();
        await setAnimationTimeoutSync(5);
        this.playOutAnimation();
        await setAnimationTimeoutSync(.7);
        this.popup.visible = false;
    }

    addTextOnPopup(text) {
        this.massageText.text = text;
    }

    createTextMassage() {
        this.massageText = new BitmapText({
            text: "",
            style: {
                fontFamily: 'Desyrel',
                fontSize: 55,
                align: 'left',
                _fill: "#123"
            },
            anchor: 0.5,
        });
        this.massageText.position.y = this.popupHeight / 2;
        this.popup.addChild(this.massageText);
    }

    playInAnimation() {
        gsap.timeline()
            .to(this.popup.scale, {
                y: 1.2,
                ease: "expo.in",
                duration: .6,
            })
            .to(this.popup.scale, {
                y: 1,
                ease: "expo.out",
                duration: .5,
            })
    }

    playOutAnimation() {
        gsap.to(this.popup.scale, {
            y: 0,
            ease: "expo.out",
            duration: .6,
        })
    }
}