import {BaseMediator} from "../../utils/mediator";
import {GameFieldNotification} from "./fieldNotification";
import {setAnimationTimeoutSync} from "../../utils/helperFunction";
import {PopupNotification} from "../popup/popupNotification";

export class FieldMediator extends BaseMediator {
    constructor() {
        super();
        this.catchOutNotification();
        this.catchInNotification()
    }

    catchOutNotification() {
        this.subscribeToNotification(GameFieldNotification.SHUFFLE_INDEXES, (data) => {
            this.view.createInteractiveSquare(data);
            this.view.changeSquareTextureOnClick();
        })
    }

    catchInNotification() {
        this.subscribeToNotification(GameFieldNotification.RESTART_GAME, async() => {
            await setAnimationTimeoutSync(1);
            this.sendNotification(PopupNotification.SHOW_POPUP);
            await setAnimationTimeoutSync(3);
            this.proxy.shuffleIndexes();
            this.view.restartGame(this.proxy.indexes);
        })
    }
}