import Player from "./Player.js";
import Terrain from "./Terrain.js";
import VariableGlobal from "./VariableGlobal.js";
import Ballon from "./Ballon.js";
//players
const Players = [
  new Player(1),
  new Player(2),
  new Player(3),
  new Player(4),
  new Player(5),
  new Player(6),
];

// terrain border
const terrain = new Terrain();
//position depart
for (let i = 0; i < Players.length; i++) {
  //position player
  Players[i].setPosition(terrain.positionPlayerStart(Players[i].getPlayer()));
}

// ballon
const ballon = new Ballon();
//canvas
const canvasterrain = document.querySelector(".terrain") as HTMLCanvasElement;
const ctx = canvasterrain.getContext("2d") as CanvasRenderingContext2D;
//dessiner le terrain
const drawTerrain = (): void => {
  canvasterrain.width = terrain.getWidth();
  canvasterrain.height = terrain.getHeight();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, terrain.width, terrain.height);
  ctx.fillStyle = "green";
  ctx.fillRect(
    terrain.dimensionBorder().x,
    terrain.dimensionBorder().y,
    terrain.dimensionBorder().w,
    terrain.dimensionBorder().h
  );
  //draw goal
  ctx.fillStyle = "red";
  ctx.fillRect(
    terrain.dimensionGoalPlayer1().x,
    terrain.dimensionGoalPlayer1().y,
    terrain.dimensionGoalPlayer1().w,
    terrain.dimensionGoalPlayer1().h
  );
  ctx.fillRect(
    terrain.dimensionGoalPlayer2().x,
    terrain.dimensionGoalPlayer2().y,
    terrain.dimensionGoalPlayer2().w,
    terrain.dimensionGoalPlayer2().h
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
    terrain.positionStartBallon().x,
    terrain.positionStartBallon().y,
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
      VariableGlobal.player.RAYONPLAYER * Math.cos(Players[0].getAngle()),
    Players[0].getPosition().y +
      VariableGlobal.player.RAYONPLAYER * Math.sin(Players[0].getAngle())
  );
  ctx.stroke();
};
// draw all
drawTerrain();
drawPlayer(1, "blue");
drawAngleJoueur1();
drawPlayer(2, "blue");
drawPlayer(3, "blue");
drawPlayer(4, "yellow");
drawPlayer(5, "yellow");
drawPlayer(6, "yellow");
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
  // on redessine le player 1 en bleu avec un nouvelle avancer
  Players[0].avancer();
  drawPlayer(1, "blue");
};
