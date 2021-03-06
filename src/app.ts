import Player from "./Player.js";
import InitialisationPartie from "./InitialisationPartie.js";
import VariableGlobal from "./VariableGlobal.js";
import Ballon from "./Ballon.js";
import Game from "./Game.js";
import Dessin from "./Dessin.js";
import { hypothenusBlockMaxSpeed } from "./outilsMath.js";
//players
const Players = [
  new Player(1, "blue"),
  new Player(2, "blue"),
  new Player(3, "blue"),
  new Player(4, "red"),
  new Player(5, "red"),
  new Player(6, "red"),
];
const game = new Game(Players);

// terrain border
const initialisation = new InitialisationPartie();
//position depart
for (let i = 0; i < Players.length; i++) {
  Players[i].setPositionAndPreview(
    initialisation.positionPlayerStart(Players[i].player).x,
    initialisation.positionPlayerStart(Players[i].player).y
  );
}
// pour les test

Players[0].speed = 3;
Players[0].setAngle(Math.PI / 4);
Players[1].speed = 3;
Players[1].setAngle(0);
Players[2].speed = 3;
Players[2].setAngle(-Math.PI / 4);
Players[3].speed = 3;
Players[3].setAngle(Math.PI / 4 + Math.PI / 2);
Players[4].speed = 3;
Players[4].setAngle(Math.PI);
Players[5].speed = 3;
Players[5].setAngle(-Math.PI / 4 - Math.PI / 2);
// ballon
const ballon = new Ballon();
//dessin
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const dessin = new Dessin(canvas, Players);

// button test anim
const buttonTestAnim = document.querySelector("#testAnim") as HTMLButtonElement;
buttonTestAnim.addEventListener("click", () => {
  lancerAnimation();
});
// button joueur
let ecouteurMouseMove: (evenement: MouseEvent) => void;
let ecouteurClickVector: () => void;
const ecouteurClickJoueur = (e: MouseEvent) => {
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  clickCanvas(x, y);
};
canvas.addEventListener("click", ecouteurClickJoueur);

const clickCanvas = (x: number, y: number): void => {
  canvas.removeEventListener("click", ecouteurClickJoueur);
  for (let i = 0; i < Players.length; i++) {
    if (
      x <= Players[i].Position.x + VariableGlobal.player.RAYONPLAYER &&
      x >= Players[i].Position.x - VariableGlobal.player.RAYONPLAYER &&
      y <= Players[i].Position.y + VariableGlobal.player.RAYONPLAYER &&
      y >= Players[i].Position.y - VariableGlobal.player.RAYONPLAYER
    ) {
      ecouteurMouseMove = (e: MouseEvent) => {
        drawVector(e, Players[i]);
      };
      canvas.addEventListener("mousemove", ecouteurMouseMove);
    }
  }
};

const drawVector = (e: MouseEvent, player: Player): void => {
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

const saveAnglePlayerAndSpeed = (
  x: number,
  y: number,
  player: Player
): void => {
  canvas.removeEventListener("mousemove", ecouteurMouseMove);
  canvas.removeEventListener("click", ecouteurClickVector);
  const angle = Math.atan2(y - player.Position.y, x - player.Position.x);
  player.setAngle(angle);
  player.speed = hypothenusBlockMaxSpeed(x, y, player);
  // restart nouveau click
  canvas.addEventListener("click", ecouteurClickJoueur);
};
let interval: number;
const lancerAnimation = (): void => {
  // on rapelle la function
  interval = setInterval(() => {
    goAnimation();
  }, 50);
};

const goAnimation = () => {
  if (!game.isAnimationfinish()) {
    dessin.effacerCanvas();
    game.avancerTousLesJoueurs();
    dessin.refreshCanvas();
  } else {
    clearInterval(interval);
    dessin.effacerCanvas();
    dessin.refreshCanvas();
    game.refrechAngleSpeed();
  }
};
