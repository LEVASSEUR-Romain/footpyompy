import VariableGlobal from "./VariableGlobal.js";
export default class Player {
    constructor(numberPlayer) {
        //typage de variable
        this.Position = { x: 0, y: 0 };
        this.RAYONPLAYER = VariableGlobal.player.RAYONPLAYER;
        this.angle = 0;
        this.speed = 0;
        this.player = numberPlayer;
    }
    cerclePlayer() {
        return {
            x: this.Position.x,
            y: this.Position.y,
            r: this.RAYONPLAYER,
            ai: 0,
            af: Math.PI * 2,
        };
    }
    //getter setter
    getPosition() {
        return this.Position;
    }
    setPosition(Position) {
        this.Position = Position;
    }
    getAngle() {
        return this.angle;
    }
    setAngle(angle) {
        this.angle = angle;
    }
    getSpeed() {
        return this.speed;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
}
