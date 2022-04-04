import VariableGlobal from "./VariableGlobal.js";
export default class InitialisationPartie {
    constructor() {
        this.POURCENTAGEGLOBALGOAL = VariableGlobal.terrain.POURCENTAGEGLOBALGOAL;
        this.width = VariableGlobal.terrain.width;
        this.height = VariableGlobal.terrain.height;
        this.border = VariableGlobal.terrain.border;
    }
    dimensionGoalPlayer1() {
        return {
            x: this.border / 2,
            y: this.height / 2 - (this.width * (this.POURCENTAGEGLOBALGOAL / 100)) / 2,
            w: this.border / 2,
            h: this.width * (this.POURCENTAGEGLOBALGOAL / 100),
        };
    }
    dimensionGoalPlayer2() {
        return {
            x: this.width - this.border,
            y: this.height / 2 - (this.width * (this.POURCENTAGEGLOBALGOAL / 100)) / 2,
            w: this.border / 2,
            h: this.width * (this.POURCENTAGEGLOBALGOAL / 100),
        };
    }
    dimensionBorder() {
        return {
            x: this.border,
            y: this.border,
            w: this.width - this.border * 2,
            h: this.height - this.border * 2,
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
}
