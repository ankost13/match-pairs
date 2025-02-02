import {BaseMediator} from "../../utils/mediator";
import {GameFieldNotification} from "./fieldNotification";

export class FieldMediator extends BaseMediator {
    constructor() {
        super();
        this.catchOutNotification();
    }

    catchOutNotification() {
        this.subscribeToNotification(GameFieldNotification.SHUFFLE_INDEXES, (data) => {
            this.view.createInteractiveSquare(data);
            this.view.changeSquareTextureOnClick();
        })
    }
}