import {View} from "../../utils/view";
import {Assets, Container, Point, Sprite} from "pixi.js";
import {setPivotForContainer} from "../../utils/helperFunction";

export class FieldView extends View {
    constructor(parent, resizeData) {
        super(parent, resizeData);

        this.createInteractiveSquare();
    }

    createInteractiveSquare() {
        this.parentForSquare = new Container();
        this.addChild(this.parentForSquare);
        this.collectionSquare = [];
        const startPositionX = 0;
        const startPositionY  = 0;
        const step = 200;

        for (let i = 0; i < 16; i++) {
            const square = new Sprite();
            square.texture = Assets.get("card");
            square.anchor = 0.5;
            square.x = startPositionX + step * parseInt(i / 4 + "");
            square.y = startPositionY + step * (i % 4);
            this.parentForSquare.addChild(square);
            square.inUsed = false;
            this.collectionSquare.push(square);
        }
        setPivotForContainer(this.parentForSquare, .5, .5);
        console.error(this.size);
       this.setPositionParentForSquare();
        console.error(this.parentForSquare.getLocalBounds())
    }

    onResize(size) {
        super.onResize(size);
        console.error(size.pixelRatio)
        if (this.size.pixelRatio < 0.75) {
            this.parentForSquare.scale = this.size.pixelRatio
        } else {
            this.parentForSquare.scale = 1
        }
        this.setPositionParentForSquare();
        console.error(size.pixelRatio)
    }

    setPositionParentForSquare() {
        const glPos = this.toGlobal(new Point(this.size.width / 2,this.size.height / 2));
        const localPos = this.toLocal(glPos);
        this.parentForSquare.position.set(localPos.x, localPos.y);
    }
}