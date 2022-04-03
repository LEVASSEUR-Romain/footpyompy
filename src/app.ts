import Player from "./Player.js";
import Terrain from "./Terrain.js";
import VariableGlobal from "./VariableGlobal.js";
import Ballon from "./Ballon.js";
//player
const player11 = new Player(1);
const player12 = new Player(2);
const player13 = new Player(3);
const player21 = new Player(4);
const player22 = new Player(5);
const player23 = new Player(6);
// terrain border
const terrain = new Terrain(800, 600, 50);
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
    terrain.positionPlayerStart(numeroPlayer).x,
    terrain.positionPlayerStart(numeroPlayer).y,
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
// draw all
drawTerrain();
drawPlayer(1, "blue");
drawPlayer(2, "blue");
drawPlayer(3, "blue");
drawPlayer(4, "yellow");
drawPlayer(5, "yellow");
drawPlayer(6, "yellow");
drawBallon();
