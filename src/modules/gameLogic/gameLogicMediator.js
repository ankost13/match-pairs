import {BaseMediator} from "../../utils/mediator";
import {GameFieldNotification} from "../field/fieldNotification";

export class GameLogicMediator extends BaseMediator {

    constructor() {
        super();
        this.startGame();
    }

    startGame() {
        this.proxy.shuffleIndexes();
        this.sendNotification(GameFieldNotification.SHUFFLE_INDEXES, this.proxy.indexes);
    }

}

