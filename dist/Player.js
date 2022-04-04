import VariableGlobal from "./VariableGlobal.js";
export default class Player {
    constructor(numberPlayer) {
        //typage de variable
        this.Position = { x: 0, y: 0 };
        this.RAYONPLAYER = VariableGlobal.player.RAYONPLAYER;
        this.angle = Math.PI / 3;
        this.speed = 0;
        this.player = numberPlayer;
    }
    // calculer position en function de l'angle
    avancer() {
        console.log(Math.sin(this.angle), "arriver");
        this.Position.x = this.Position.x + this.RAYONPLAYER * Math.cos(this.angle);
        this.Position.y = this.Position.y + this.RAYONPLAYER * Math.sin(this.angle);
        if (this.collisionBordure()) {
            this.angle = this.angle + Math.PI;
            this.collisionBordurePosition();
        }
    }
    //gerer les collisions avec les bordures
    collisionBordure() {
        if (this.Position.x + this.RAYONPLAYER >=
            VariableGlobal.terrain.width - VariableGlobal.terrain.border ||
            this.Position.x - this.RAYONPLAYER <= VariableGlobal.terrain.border ||
            this.Position.y - this.RAYONPLAYER <= VariableGlobal.terrain.border ||
            this.Position.y + this.RAYONPLAYER >=
                VariableGlobal.terrain.height - VariableGlobal.terrain.border) {
            return true;
        }
        return false;
    }
    // calculer position quand collision border
    collisionBordurePosition() {
        if (this.Position.x + this.RAYONPLAYER >=
            VariableGlobal.terrain.width - VariableGlobal.terrain.border) {
            this.Position.x =
                VariableGlobal.terrain.width -
                    VariableGlobal.terrain.border -
                    this.RAYONPLAYER;
        }
        else if (this.Position.x - this.RAYONPLAYER <=
            VariableGlobal.terrain.border) {
            this.Position.x = VariableGlobal.terrain.border + this.RAYONPLAYER;
        }
        else if (this.Position.y - this.RAYONPLAYER <=
            VariableGlobal.terrain.border) {
            this.Position.y = VariableGlobal.terrain.border + this.RAYONPLAYER;
        }
        else if (this.Position.y + this.RAYONPLAYER >=
            VariableGlobal.terrain.height - VariableGlobal.terrain.border) {
            this.Position.y =
                VariableGlobal.terrain.height -
                    VariableGlobal.terrain.border -
                    this.RAYONPLAYER;
        }
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
    getPlayer() {
        return this.player;
    }
    getRayonPlayer() {
        return this.RAYONPLAYER;
    }
}
