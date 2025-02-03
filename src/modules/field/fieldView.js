import {View} from "../../utils/view";
import {Assets, Container, Point, Sprite} from "pixi.js";
import {setAnimationTimeoutSync, setPivotForContainer} from "../../utils/helperFunction";
import gsap from "gsap";

export class FieldView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.collectionSquare = [];
        this.numberOpenSquare = 0;
    }

    createInteractiveSquare(indexes) {
        this.parentForSquare = new Container();
        this.addChild(this.parentForSquare);
        const startPositionX = 0;
        const startPositionY = 0;
        const step = 200;
        indexes.forEach((item, i) => {
            const square = new Sprite();
            square.id = item;
            square.texture = Assets.get("card");
            square.anchor = 0.5;
            square.x = startPositionX + step * parseInt(i / 4 + "");
            square.y = startPositionY + step * (i % 4);
            this.parentForSquare.addChild(square);
            square.inUsed = false;
            this.collectionSquare.push(square);
        })
        setPivotForContainer(this.parentForSquare, .5, .5);
        this.setPositionParentForSquare();
        this.setInteractiveSquare(true);
    }

    setInteractiveSquare(on) {
        this.collectionSquare.forEach((square) => {
            square.interactive = !square.inUsed && on;
            square.cursor = "pointer";
        });
    }

    changeSquareTextureOnClick() {
        let previousSquare = null;
        this.collectionSquare.forEach((square, index) => {
            square.on("pointerup", () => {
                if (square.inUsed) return;
                square.inUsed = true;
                square.interactive = false;
                this.addAnimationScaleToElement({element: square, goTo1: 0, goTo2: 1, textureName: "c" + square.id});
                square.alpha = 1;
                this.numberOpenSquare = ++this.numberOpenSquare;
                if (this.numberOpenSquare === 1) {
                    previousSquare = square;
                }
                this.checkPairs({square: square, previousSquare: previousSquare});

            });
        });
    }

    addAnimationScaleToElement(data) {
        gsap.timeline()
            .to(data.element.scale, {
                x: data.goTo1,
                duration: .3,
                onComplete: ()=> {
                    data.element.texture = Assets.get(data.textureName);
                }
            })
            .to(data.element.scale, {
                x: data.goTo2,
                duration: .3,
            })
    }

    addAnimationAngelToElement(element) {
        gsap.timeline()
            .to(element, {
                rotation: -.1,
                duration: .2,
            })
            .to(element, {
                rotation: .1,
                duration: .2,
            })
            .to(element, {
                rotation: 0,
                duration: .2,
            })
    }



    async checkPairs(data) {
        if (this.numberOpenSquare === 2) {
            this.setInteractiveSquare(false);
            if (data.previousSquare.id === data.square.id) {
                await setAnimationTimeoutSync(0.7);
                this.numberOpenSquare = 0;
                this.addAnimationAngelToElement(data.square);
                this.addAnimationAngelToElement(data.previousSquare);
                this.setInteractiveSquare(true);
            } else {
                await setAnimationTimeoutSync(0.7)
                this.addAnimationScaleToElement({element: data.square, goTo1: 0, goTo2: 1, textureName: "card"});
                this.addAnimationScaleToElement({element: data.previousSquare, goTo1: 0, goTo2: 1, textureName: "card"});
                data.square.interactive = true;
                data.previousSquare.interactive = true;
                data.square.inUsed = false;
                data.previousSquare.inUsed = false;
                this.setInteractiveSquare(true);
                this.numberOpenSquare = 0;
            }
        }
    }


    setPositionParentForSquare() {
        const glPos = this.toGlobal(new Point(this.size.width / 2, this.size.height / 2));
        const localPos = this.toLocal(glPos);
        this.parentForSquare.position.set(localPos.x, localPos.y);
    }


    onResize(size) {
        super.onResize(size);
        if (this.size.pixelRatio < 1) {
            this.parentForSquare.scale = this.size.pixelRatio
        } else if (this.size.pixelRatio > 1) {
            this.parentForSquare.scale = 1 // TODO придумати
        }
        this.setPositionParentForSquare();
    }
}