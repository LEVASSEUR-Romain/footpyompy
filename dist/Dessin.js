import InitialisationPartie from "./InitialisationPartie.js";
import VariableGlobal from "./VariableGlobal.js";
export default class Dessin {
    constructor(canvasElement, players) {
        this.Players = [];
        this.drawTerrain = () => {
            this.canvas.width = this.InitialisationPartie.width;
            this.canvas.height = this.InitialisationPartie.height;
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.InitialisationPartie.width, this.InitialisationPartie.height);
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(this.InitialisationPartie.dimensionBorder().x, this.InitialisationPartie.dimensionBorder().y, this.InitialisationPartie.dimensionBorder().w, this.InitialisationPartie.dimensionBorder().h);
            //draw goal
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.InitialisationPartie.dimensionGoalPlayer1().x, this.InitialisationPartie.dimensionGoalPlayer1().y, this.InitialisationPartie.dimensionGoalPlayer1().w, this.InitialisationPartie.dimensionGoalPlayer1().h);
            this.ctx.fillRect(this.InitialisationPartie.dimensionGoalPlayer2().x, this.InitialisationPartie.dimensionGoalPlayer2().y, this.InitialisationPartie.dimensionGoalPlayer2().w, this.InitialisationPartie.dimensionGoalPlayer2().h);
        };
        this.drawPlayer = () => {
            for (let i = 0; i < this.Players.length; i++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.Players[i].color;
                this.ctx.arc(this.Players[i].getPosition().x, this.Players[i].getPosition().y, VariableGlobal.player.RAYONPLAYER, 0, Math.PI * 2);
                this.ctx.fill();
            }
        };
        this.drawBallon = () => {
            this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.arc(this.InitialisationPartie.positionStartBallon().x, this.InitialisationPartie.positionStartBallon().y, VariableGlobal.ballon.RAYONBALLON, 0, 2 * Math.PI);
            this.ctx.fill();
        };
        this.drawAngleJoueur = (x, y, player) => {
            if (player.speed !== 0) {
                player.speed = 0;
                player.angle = 0;
            }
            else {
                this.ctx.beginPath();
                this.ctx.fillStyle = "black";
                this.ctx.moveTo(player.Position.x, player.Position.y);
                const hypothenus = Math.pow((Math.pow((x - player.Position.x), 2) + Math.pow((y - player.Position.y), 2)), 0.5);
                if (hypothenus <= VariableGlobal.player.maxSpeed) {
                    this.ctx.lineTo(x, y);
                    this.ctx.stroke();
                }
                else {
                    this.ctx.lineTo(player.Position.x +
                        ((x - player.Position.x) * VariableGlobal.player.maxSpeed) /
                            hypothenus, player.Position.y +
                        ((y - player.Position.y) * VariableGlobal.player.maxSpeed) /
                            hypothenus);
                    this.ctx.stroke();
                }
            }
        };
        this.drawAllVector = () => {
            for (let i = 0; i < this.Players.length; i++) {
                if (this.Players[i].speed != 0) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "black";
                    this.ctx.moveTo(this.Players[i].Position.x, this.Players[i].Position.y);
                    this.ctx.lineTo(this.Players[i].Position.x +
                        this.Players[i].speed * Math.cos(this.Players[i].angle), this.Players[i].Position.y +
                        this.Players[i].speed * Math.sin(this.Players[i].angle));
                    this.ctx.stroke();
                }
            }
        };
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.InitialisationPartie = new InitialisationPartie();
        this.Players = players;
        this.drawTerrain();
        this.drawPlayer();
        this.drawBallon();
    }
    effacerCanvas() {
        this.ctx.clearRect(0, 0, this.InitialisationPartie.width, this.InitialisationPartie.height);
    }
    refreshCanvas() {
        this.drawTerrain();
        this.drawPlayer();
        this.drawBallon();
        this.drawAllVector();
    }
}
