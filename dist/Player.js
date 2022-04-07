import VariableGlobal from "./VariableGlobal.js";
export default class Player {
    constructor(numberPlayer, color) {
        //typage de variable
        this.Position = { x: 0, y: 0 };
        this.RAYONPLAYER = VariableGlobal.player.RAYONPLAYER;
        this.angle = 0;
        this.speed = 0;
        this.player = numberPlayer;
        this.masse = VariableGlobal.player.masse;
        this.color = color;
    }
    //getter setter
    getPosition() {
        return this.Position;
    }
    setPosition(x, y) {
        this.Position.x = x;
        this.Position.y = y;
    }
    setAngle(angle) {
        this.angle = angle;
    }
}
