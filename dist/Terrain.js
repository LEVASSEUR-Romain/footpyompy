import VariableGlobal from "./VariableGlobal.js";
export default class Terrain {
    constructor() {
        this.POURCENTAGEGLOBALGOAL = VariableGlobal.terrain.POURCENTAGEGLOBALGOAL;
        this.width = VariableGlobal.terrain.width;
        this.height = VariableGlobal.terrain.height;
        this.border = VariableGlobal.terrain.border;
    }
    dimensionGoalPlayer1() {
        return {
            x: this.getBorder() / 2,
            y: this.height / 2 - (this.width * (this.POURCENTAGEGLOBALGOAL / 100)) / 2,
            w: this.getBorder() / 2,
            h: this.width * (this.POURCENTAGEGLOBALGOAL / 100),
        };
    }
    dimensionGoalPlayer2() {
        return {
            x: this.width - this.getBorder(),
            y: this.height / 2 - (this.width * (this.POURCENTAGEGLOBALGOAL / 100)) / 2,
            w: this.getBorder() / 2,
            h: this.width * (this.POURCENTAGEGLOBALGOAL / 100),
        };
    }
    dimensionBorder() {
        return {
            x: this.getBorder(),
            y: this.getBorder(),
            w: this.getWidth() - this.getBorder() * 2,
            h: this.getHeight() - this.getBorder() * 2,
        };
    }
    positionPlayerStart(numeroPlayer) {
        const diametrePlayer = VariableGlobal.player.RAYONPLAYER * 2;
        switch (numeroPlayer) {
            case 1:
                return {
                    x: this.width / 4,
                    y: this.height / 2 -
                        diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
                };
            case 2:
                return {
                    x: this.width / 4,
                    y: this.height / 2,
                };
            case 3:
                return {
                    x: this.width / 4,
                    y: this.height / 2 +
                        diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
                };
            case 4:
                return {
                    x: (this.width * 3) / 4,
                    y: this.height / 2 -
                        diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
                };
            case 5:
                return {
                    x: (this.width * 3) / 4,
                    y: this.height / 2,
                };
            case 6:
                return {
                    x: (this.width * 3) / 4,
                    y: this.height / 2 +
                        diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
                };
            default:
                return {
                    x: this.width / 4,
                    y: this.height / 4,
                };
        }
    }
    positionStartBallon() {
        return {
            x: this.width / 2,
            y: this.height / 2,
        };
    }
    //getter setter
    getWidth() {
        return this.width;
    }
    setWidth(whitdh) {
        this.width = whitdh;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
    getBorder() {
        return this.border;
    }
    setBorder(border) {
        this.border = border;
    }
}
