import {View} from "../../utils/view";
import {Assets, Container, Text, Point, Sprite} from "pixi.js";
import {setAnimationTimeoutSync, setPivotForContainer} from "../../utils/helperFunction";
import gsap from "gsap";
import {GameFieldNotification} from "./fieldNotification";

export class FieldView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);
        this.collectionSquare = [];
        this.numberOpenSquare = 0;
        this.numberOpenPairs = 0;
        this.numberSteps = 0;
        this.createScoreboard();
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
                this.numberSteps = ++this.numberSteps;
                this.updateMomentDataOnScoreboard();
                this.numberOpenSquare = ++this.numberOpenSquare;
                if (this.numberOpenSquare === 1) {
                    previousSquare = square;
                }
                this.checkPairs({square: square, previousSquare: previousSquare});
                this.soundsManager.play("click", 0.02);
            });
        });
    }

    addAnimationScaleToElement(data) {
        gsap.timeline()
            .to(data.element.scale, {
                x: data.goTo1,
                duration: .3,
                onComplete: () => {
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
                this.numberOpenPairs = ++this.numberOpenPairs;
                if (this.numberOpenPairs === 8) {
                    this.notifyToMediator(GameFieldNotification.GET_DATA_SCORE, this.numberSteps);
                    this.notifyToMediator(GameFieldNotification.RESTART_GAME, this.numberSteps)
                }
                this.soundsManager.play("rightPair", 0.02);
            } else {
                await setAnimationTimeoutSync(0.7)
                this.addAnimationScaleToElement({element: data.square, goTo1: 0, goTo2: 1, textureName: "card"});
                this.addAnimationScaleToElement({
                    element: data.previousSquare,
                    goTo1: 0,
                    goTo2: 1,
                    textureName: "card"
                });
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

    createScoreboard() {
        this.scoreboard = new Sprite({})
        this.scoreboard.position.set(this.size.width * 0.86, this.size.height * 0.08);
        this.createTextScoreboard("SCOREBOARD", 0, 0);
        this.bestResult = this.createTextScoreboard("BestResult: " + localStorage.getItem("bestResult"), 0, -30);
        this.momentNumberSteps = this.createTextScoreboard("Steps: " + this.numberSteps, 0, -60);
        this.addChild(this.scoreboard);
    }

    updateMomentDataOnScoreboard() {
        if (this.momentNumberSteps.text !== "Steps: " + this.numberSteps) {
            this.momentNumberSteps.text = "Steps: " + this.numberSteps;
            this.animationTextOnScoreboard(this.momentNumberSteps);
        }
    }

    updateStatisticOnScoreboard() {
        if (this.bestResult.text !== "BestResult: " + localStorage.getItem("bestResult") || 0) {
            this.bestResult.text = "BestResult: " + localStorage.getItem("bestResult");
            this.animationTextOnScoreboard(this.bestResult);
        }
    }

    createTextScoreboard(text, posX = 0, posY = 200) {
        const massageText = new Text(text, {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: '#112558',
        });
        massageText.position.x = -posX;
        massageText.position.y = -posY;
        massageText.anchor = 0.5;
        this.scoreboard.addChild(massageText);
        return massageText;
    }

    animationTextOnScoreboard (partOfText) {
        gsap.to(partOfText.scale, {
            duration: .5,
            x: 1.4,
            y: 1.4,

            onComplete: ()=> {
                gsap.to(partOfText.scale, {
                    duration: .5,
                    x: 1,
                    y: 1,
                })
            }
        })
    }

    onResize(size) {
        super.onResize(size);
        const sof = this.isMobile() ? 1.05 : 1.4
        if (this.size.pixelRatio < 1) {
            this.parentForSquare.scale = this.size.pixelRatio / sof;
        } else if (this.size.pixelRatio > 1) {
            this.parentForSquare.scale = 1 / (this.size.pixelRatio / sof);
        }
        this.setPositionParentForSquare();
    }

    restartGame(indexes) {
        indexes.forEach((item, i) => {
            const square = this.collectionSquare[i];
            square.id = item;
            square.texture = Assets.get("card");
            square.inUsed = false;
            square.interactive = true;
        })
        this.numberOpenPairs = 0;
        this.numberSteps = 0;
        this.updateStatisticOnScoreboard();
        this.updateMomentDataOnScoreboard();
    }

}
