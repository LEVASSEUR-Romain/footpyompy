import VariableGlobal from "./VariableGlobal.js";
export default class Player {
    constructor(numberPlayer, color) {
        //typage de variable
        this.Position = { x: 0, y: 0 };
        this.PositionPreview = { x: 0, y: 0 };
        this.RAYONPLAYER = VariableGlobal.player.RAYONPLAYER;
        this.angle = 0;
        this.speed = 0;
        this.player = numberPlayer;
        this.masse = VariableGlobal.player.masse;
        this.color = color;
        this.collision = false;
        // pas modifier partout
        this.rayon = VariableGlobal.player.RAYONPLAYER;
    }
    getVectorSpeed() {
        return {
            x: this.speed * Math.cos(this.angle),
            y: this.speed * Math.sin(this.angle),
        };
    }
    setVectorSpeed(vector) {
        this.speed = Math.pow((Math.pow(vector.x, 2) + Math.pow(vector.y, 2)), 0.5);
        this.angle = Math.atan2(vector.y, vector.x);
    }
    //getter setter
    getPosition() {
        return this.Position;
    }
    setPositionAndPreview(x, y) {
        this.Position.x = x;
        this.Position.y = y;
        this.PositionPreview.x = x;
        this.PositionPreview.y = y;
    }
    setAngle(angle) {
        this.angle = angle;
    }
}
