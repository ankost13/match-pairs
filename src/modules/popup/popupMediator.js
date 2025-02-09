import {BaseMediator} from "../../utils/mediator";
import {PopupNotification} from "./popupNotification";

export class PopupMediator extends BaseMediator{
    constructor() {
        super();
        this.catchOutNotification();
    }

    catchOutNotification() {
        this.subscribeToNotification(PopupNotification.SHOW_POPUP, (data) => {
           this.view.showPopup();
           this.view.addTextOnPopup("You are win!\nYou are win!");
        })
    }
}