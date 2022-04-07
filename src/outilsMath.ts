import { Position } from "./interface";
import Player from "./Player.js";
import VariableGlobal from "./VariableGlobal.js";

export const distanceEntreObjet = (obj1: Position, obj2: Position): number => {
  const x: number = obj2.x - obj1.x;
  const y: number = obj2.y - obj1.y;
  return (x * x + y * y) ** 0.5;
};

export const angleEntreObjet = (obj1: Position, obj2: Position): number => {
  return Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
};

export const playerMaxSpeed = (player: Player, player2: Player): Player => {
  if (player.speed > player2.speed) {
    return player;
  }
  return player2;
};

export const playerMinSpeed = (player: Player, player2: Player): Player => {
  if (player.speed < player2.speed) {
    return player;
  }
  return player2;
};

export const hypothenusBlockMaxSpeed = (
  x: number,
  y: number,
  player: Player
): number => {
  const hypo =
    ((x - player.Position.x) ** 2 + (y - player.Position.y) ** 2) ** 0.5;
  if (hypo >= VariableGlobal.player.maxSpeed) {
    return VariableGlobal.player.maxSpeed;
  }
  return hypo;
};
