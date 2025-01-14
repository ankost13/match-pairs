let instance = null;

export class Proxy { //для даних

    constructor() {

    }

    setDefaultIndexes() {
        this.indexes = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
    }

    static getInstance() {
        if (instance == null) {
            instance = new Proxy();
        }

        return instance;
    }

    shuffle(array) {
        const newArray = [...array]
        const length = newArray.length

        for (let start = 0; start < length; start++) {
            const randomPosition = Math.floor((newArray.length - start) * Math.random())
            const randomItem = newArray.splice(randomPosition, 1)

            newArray.push(...randomItem)
        }

        return newArray
    }
}

