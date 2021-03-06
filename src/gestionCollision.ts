import Player from "./Player";
import VariableGlobal from "./VariableGlobal.js";
import { distanceEntreObjet, playerMaxSpeed } from "./outilsMath.js";
const gestionCollision = (Player1: Player, Player2: Player): void => {
  const distance = distanceEntreObjet(
    Player1.PositionPreview,
    Player2.PositionPreview
  );
  // decallage si trop collision
  if (distance <= VariableGlobal.mouvement.distanceMinimum) {
    Player1.angle = Player1.angle + Math.PI;
  }
  const angle = Math.atan2(
    Player2.PositionPreview.y - Player1.PositionPreview.y,
    Player2.PositionPreview.x - Player1.PositionPreview.x
  ); //dy/dx

  //calcul des vitesses normal et perpendiculaire au choc
  const vPlayer1Norm = Player1.speed * Math.cos(-Player1.angle + angle);
  const vPlayer1Perp = Player1.speed * Math.sin(-Player1.angle + angle);
  const vPlayer2Norm = Player2.speed * Math.cos(-Player2.angle + angle);
  const vPlayer2Perp = Player2.speed * Math.sin(-Player2.angle + angle);

  //conservation energie en function de la masse
  const masseTotal = Player1.masse + Player2.masse;
  const energiePlayer1 =
    ((Player1.masse - Player2.masse) / masseTotal) * vPlayer1Norm +
    ((2 * Player2.masse) / masseTotal) * vPlayer2Norm;
  const energiePlayer2 =
    ((Player2.masse - Player1.masse) / masseTotal) * vPlayer2Norm +
    ((2 * Player1.masse) / masseTotal) * vPlayer1Norm;

  //nouvelle position
  const vPlayer1NewX =
    energiePlayer1 * Math.cos(angle) -
    vPlayer1Perp * Math.cos(angle + Math.PI / 2);
  const vPlayer1NewY =
    energiePlayer1 * Math.sin(angle) -
    vPlayer1Perp * Math.sin(angle + Math.PI / 2);
  const vPlayer2NewX =
    energiePlayer2 * Math.cos(angle) -
    vPlayer2Perp * Math.cos(angle + Math.PI / 2);
  const vPlayer2NewY =
    energiePlayer2 * Math.sin(angle) -
    vPlayer2Perp * Math.sin(angle + Math.PI / 2);

  //recalcul angle et vitesse

  Player1.speed = (vPlayer1NewX ** 2 + vPlayer1NewY ** 2) ** 0.5;
  Player2.speed = (vPlayer2NewX ** 2 + vPlayer2NewY ** 2) ** 0.5;
  Player1.angle = Math.atan2(vPlayer1NewY, vPlayer1NewX);
  Player2.angle = Math.atan2(vPlayer2NewY, vPlayer2NewX);
};

export default gestionCollision;
