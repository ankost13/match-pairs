import {BaseMediator} from "../../utils/mediator";
import {PopupNotification} from "./popupNotification";

export class PopupMediator extends BaseMediator{
    constructor() {
        super();
        this.catchOutNotification();
    }

    catchOutNotification() {
        this.subscribeToNotification(PopupNotification.SHOW_POPUP, (numberSteps) => {
           this.view.showPopup();
           this.view.addTextOnPopup("You are win!\nYour score: " + numberSteps + "\nBest score: " + localStorage.bestResult);
        })
    }
}