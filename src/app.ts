import Player from "./Player.js";
import InitialisationPartie from "./InitialisationPartie.js";
import VariableGlobal from "./VariableGlobal.js";
import Ballon from "./Ballon.js";
import Game from "./Game.js";
//players
const Players = [new Player(1), new Player(4)];
const game = new Game(Players);
// terrain border
const initialisation = new InitialisationPartie();
//position depart
for (let i = 0; i < Players.length; i++) {
  Players[i].setPosition(
    initialisation.positionPlayerStart(Players[i].player).x,
    initialisation.positionPlayerStart(Players[i].player).y
  );
}

// ballon
const ballon = new Ballon();
//canvas
const canvasterrain = document.querySelector(".terrain") as HTMLCanvasElement;
const ctx = canvasterrain.getContext("2d") as CanvasRenderingContext2D;
//dessiner le terrain
const drawTerrain = (): void => {
  canvasterrain.width = initialisation.width;
  canvasterrain.height = initialisation.height;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, initialisation.width, initialisation.height);
  ctx.fillStyle = "green";
  ctx.fillRect(
    initialisation.dimensionBorder().x,
    initialisation.dimensionBorder().y,
    initialisation.dimensionBorder().w,
    initialisation.dimensionBorder().h
  );
  //draw goal
  ctx.fillStyle = "red";
  ctx.fillRect(
    initialisation.dimensionGoalPlayer1().x,
    initialisation.dimensionGoalPlayer1().y,
    initialisation.dimensionGoalPlayer1().w,
    initialisation.dimensionGoalPlayer1().h
  );
  ctx.fillRect(
    initialisation.dimensionGoalPlayer2().x,
    initialisation.dimensionGoalPlayer2().y,
    initialisation.dimensionGoalPlayer2().w,
    initialisation.dimensionGoalPlayer2().h
  );
};

const drawPlayer = (numeroPlayer: number, color: string): void => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(
    Players[numeroPlayer - 1].getPosition().x,
    Players[numeroPlayer - 1].getPosition().y,
    VariableGlobal.player.RAYONPLAYER,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

const drawBallon = (): void => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(
    initialisation.positionStartBallon().x,
    initialisation.positionStartBallon().y,
    VariableGlobal.ballon.RAYONBALLON,
    0,
    2 * Math.PI
  );
  ctx.fill();
};
// représentation des angles
const drawAngleJoueur1 = (): void => {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(Players[0].getPosition().x, Players[0].getPosition().y);
  // Calculer avec l'angle
  ctx.lineTo(
    Players[0].getPosition().x +
      VariableGlobal.player.RAYONPLAYER * Math.cos(Players[0].angle),
    Players[0].getPosition().y +
      VariableGlobal.player.RAYONPLAYER * Math.sin(Players[0].angle)
  );
  ctx.stroke();
};
// draw all
drawTerrain();
drawPlayer(1, "blue");
drawAngleJoueur1();
//drawPlayer(2, "blue");
//drawPlayer(3, "blue");
drawPlayer(2, "yellow");
//drawPlayer(5, "yellow");
//drawPlayer(6, "yellow");
drawBallon();

// button test anim
const buttonTestAnim = document.querySelector("#testAnim") as HTMLButtonElement;
buttonTestAnim.addEventListener("click", () => {
  lancerAnimation();
});

const lancerAnimation = (): void => {
  // on clear le player 1 du canvas
  ctx.clearRect(
    Players[0].getPosition().x - VariableGlobal.player.RAYONPLAYER,
    Players[0].getPosition().y - VariableGlobal.player.RAYONPLAYER,
    VariableGlobal.player.RAYONPLAYER * 2,
    VariableGlobal.player.RAYONPLAYER * 2
  );
  // on redessine le fond en vert
  ctx.fillStyle = "green";
  ctx.fillRect(
    Players[0].getPosition().x - VariableGlobal.player.RAYONPLAYER,
    Players[0].getPosition().y - VariableGlobal.player.RAYONPLAYER,
    VariableGlobal.player.RAYONPLAYER * 2,
    VariableGlobal.player.RAYONPLAYER * 2
  );
  ctx.clearRect(
    Players[1].getPosition().x - VariableGlobal.player.RAYONPLAYER,
    Players[1].getPosition().y - VariableGlobal.player.RAYONPLAYER,
    VariableGlobal.player.RAYONPLAYER * 2,
    VariableGlobal.player.RAYONPLAYER * 2
  );
  // on redessine le fond en vert
  ctx.fillStyle = "green";
  ctx.fillRect(
    Players[1].getPosition().x - VariableGlobal.player.RAYONPLAYER,
    Players[1].getPosition().y - VariableGlobal.player.RAYONPLAYER,
    VariableGlobal.player.RAYONPLAYER * 2,
    VariableGlobal.player.RAYONPLAYER * 2
  );
  // on redessine le player 1 en bleu avec un nouvelle avancer
  game.avancerTousLesJoueurs();
  drawPlayer(1, "blue");
  drawPlayer(2, "yellow");
  game.IscollisionEntreJouer();
};
