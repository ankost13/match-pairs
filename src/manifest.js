export const manifest = {
    bundles: [
        {
            name: "gameAssets",
            assetsImg: {
                icon: { src: "assets/img/icon.jpg"},
                bg: { src: "assets/img/background.jpg"},
                card: { src:"assets/img/card.jpg"},
                c1: { src:"assets/img/01.jpg"},
                c2: { src:"assets/img/02.jpg"},
                c3: { src:"assets/img/03.jpg"},
                c4: { src:"assets/img/04.jpg"},
                c5: { src:"assets/img/05.jpg"},
                c6: { src:"assets/img/06.jpg"},
                c7: { src:"assets/img/07.jpg"},
                c8: { src:"assets/img/08.jpg"},
                popup: { src:"assets/img/popup.png"},
                bitMapFont: { src:"https://pixijs.com/assets/bitmap-font/desyrel.xml"},
            },

            spineAssets: {
                spineboy: {
                    type: "spine",
                    json: "./assets/spine/test_task.json"
                },
            }
        }
    ]
}