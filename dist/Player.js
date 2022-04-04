import VariableGlobal from "./VariableGlobal.js";
export default class Player {
    constructor(numberPlayer) {
        //typage de variable
        this.Position = { x: 0, y: 0 };
        this.RAYONPLAYER = VariableGlobal.player.RAYONPLAYER;
        this.angle = Math.PI / 4;
        this.speed = 0;
        this.player = numberPlayer;
    }
    //getter setter
    getPosition() {
        return this.Position;
    }
    setPosition(x, y) {
        this.Position.x = x;
        this.Position.y = y;
    }
}
