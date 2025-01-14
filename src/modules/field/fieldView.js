import {View} from "../../utils/view";
import {Assets, Container, Sprite} from "pixi.js";

export class FieldView extends View {
    constructor(parent) {
        super(parent);
        this.createInteractiveSquare();

    }

    createInteractiveSquare() {
        const parentForSquare = new Container();
        this.addChild(parentForSquare);
        this.collectionSquare = [];
        const startPositionX = 468;
        const startPositionY  = 132;
        const step = 200;

        for (let i = 0; i < 16; i++) {
            const square = new Sprite();
            square.texture = Assets.get("card");
            square.anchor = 0.5;
            square.x = startPositionX + step * parseInt(i / 4 + "");
            square.y = startPositionY + step * (i % 4);
            square.scale = 1;
            parentForSquare.addChild(square);
            square.inUsed = false;
            this.collectionSquare.push(square);
        }
    }
}