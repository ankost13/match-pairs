import {Application, Assets, Container, Sprite} from "pixi.js";
import {manifest} from "../manifest";
import {GamePreloaderMediator} from "../modules/preloader/mediator";
import {PreloaderView} from "../modules/preloader/view";
import {GameMediator} from "./mediator";
import {SoundsManager} from "../utils/soundsManager";
import {BgMediator} from "../modules/bg/bgMediator";
import {BgView} from "../modules/bg/bgView";
import {FieldMediator} from "../modules/field/fieldMediator";
import {FieldView} from "../modules/field/fieldView";
import {GameLogicMediator} from "../modules/gameLogic/gameLogicMediator";
import {PopupMediator} from "../modules/popup/popupMediator";
import {PopupView} from "../modules/popup/popupView";

export class App extends Application {

    constructor(data) {
        super(data)

        this.initGame();
    }

    async initGame() {
        this.registerPreloader();

        await this.initSounds();
        await this.loadAssets();

        this.gameMediator = new GameMediator();
        this.gameMediator.resourcesLoaded();
        this.registerBg();
        this.registerField();
        this.registerGameLogic();
        this.registerPopup();
    }

    async loadAssets() {
        if (!Object.keys(manifest.bundles[0]).length) return;

        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }
    }

    registerPreloader() {
        const mediator = new GamePreloaderMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(PreloaderView, parent);
    }

    registerBg() {
        const mediator = new BgMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(BgView, parent);
    }

    registerField() {
        const mediator = new FieldMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(FieldView, parent);
    }

    registerGameLogic() {
        new GameLogicMediator();
    }

    registerPopup() {
        const mediator = new PopupMediator();
        const parent = new Container();
        this.stage.addChild(parent);
        mediator.initView(PopupView, parent);
    }


    async initSounds() {
        const sounds = [
            {
                name: "backgroundSound",
                src: "assets/sounds/backgroundSound.mp3",
                volume: 0.01,
                loop: true,
            },
            {
                 name: "click",
                 src: "assets/sounds/click.mp3",
                 volume: 0.01,
            },
            {
                name: "rightPair",
                src: "assets/sounds/rightPair.mp3",
                volume: 0.01,
            },
            // {
            //     name: "win",
            //     src: "assets/sounds/win.mp3",
            //     volume: 0.1,
            // },
        ];
        const soundsManager = SoundsManager.getInstance()
        await soundsManager.loadSounds(sounds);
    }
}
