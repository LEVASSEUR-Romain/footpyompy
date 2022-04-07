import Player from "./Player.js";
import InitialisationPartie from "./InitialisationPartie.js";
import VariableGlobal from "./VariableGlobal.js";
import Ballon from "./Ballon.js";
import Game from "./Game.js";
import Dessin from "./Dessin.js";
import { hypothenusBlockMaxSpeed } from "./outilsMath.js";
//players
const Players = [new Player(1, "blue"), new Player(4, "red")];
const game = new Game(Players);
// terrain border
const initialisation = new InitialisationPartie();
//position depart
for (let i = 0; i < Players.length; i++) {
    Players[i].setPosition(initialisation.positionPlayerStart(Players[i].player).x, initialisation.positionPlayerStart(Players[i].player).y);
}
// Pour les test
Players[1].Position.x = 300;
// ballon
const ballon = new Ballon();
//dessin
const canvas = document.getElementById("canvas");
const dessin = new Dessin(canvas, Players);
// button test anim
const buttonTestAnim = document.querySelector("#testAnim");
buttonTestAnim.addEventListener("click", () => {
    lancerAnimation();
});
// button joueur
let ecouteurMouseMove;
let ecouteurClickVector;
const ecouteurClickJoueur = (e) => {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    clickCanvas(x, y);
};
canvas.addEventListener("click", ecouteurClickJoueur);
const clickCanvas = (x, y) => {
    canvas.removeEventListener("click", ecouteurClickJoueur);
    for (let i = 0; i < Players.length; i++) {
        if (x <= Players[i].Position.x + VariableGlobal.player.RAYONPLAYER &&
            x >= Players[i].Position.x - VariableGlobal.player.RAYONPLAYER &&
            y <= Players[i].Position.y + VariableGlobal.player.RAYONPLAYER &&
            y >= Players[i].Position.y - VariableGlobal.player.RAYONPLAYER) {
            ecouteurMouseMove = (e) => {
                drawVector(e, Players[i]);
            };
            canvas.addEventListener("mousemove", ecouteurMouseMove);
        }
    }
};
const drawVector = (e, player) => {
    dessin.effacerCanvas();
    dessin.refreshCanvas();
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    dessin.drawAngleJoueur(x, y, player);
    ecouteurClickVector = () => {
        saveAnglePlayerAndSpeed(x, y, player);
    };
    canvas.addEventListener("click", ecouteurClickVector);
};
const saveAnglePlayerAndSpeed = (x, y, player) => {
    canvas.removeEventListener("mousemove", ecouteurMouseMove);
    canvas.removeEventListener("click", ecouteurClickVector);
    const angle = Math.atan2(y - player.Position.y, x - player.Position.x);
    player.setAngle(angle);
    player.speed = hypothenusBlockMaxSpeed(x, y, player);
    // restart nouveau click
    canvas.addEventListener("click", ecouteurClickJoueur);
};
const lancerAnimation = () => {
    dessin.effacerCanvas();
    game.avancerTousLesJoueurs();
    dessin.refreshCanvas();
};
