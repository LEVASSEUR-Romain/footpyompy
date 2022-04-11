import { Position } from "./interface";
import Player from "./Player.js";
import VariableGlobal from "./VariableGlobal.js";

export const distanceEntreObjet = (obj1: Position, obj2: Position): number => {
  const x: number = obj2.x - obj1.x;
  const y: number = obj2.y - obj1.y;
  return (x ** 2 + y ** 2) ** 0.5;
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
  let hypo =
    ((x - player.Position.x) ** 2 + (y - player.Position.y) ** 2) ** 0.5;
  hypo = hypo / VariableGlobal.player.RAYONPLAYER;
  if (hypo >= VariableGlobal.player.maxSpeed) {
    return VariableGlobal.player.maxSpeed;
  }
  return hypo;
};

export const isDroiteIntesection = (
  player1: Player,
  player2: Player
): boolean => {
  const a1 =
    (player1.Position.y * Math.sin(player1.angle) - player1.Position.y) /
    (player1.Position.x * Math.cos(player1.angle) - player1.Position.x);
  const a2 =
    (player2.Position.y * Math.sin(player2.angle) - player2.Position.y) /
    (player2.Position.x * Math.cos(player2.angle) - player2.Position.x);
  const b1 = (player1.Position.y / a1) * player1.Position.x;
  const b2 = (player2.Position.y / a2) * player2.Position.x;
  if (a1 - a2 !== 0 && b2 - b1 !== 0 && a1 !== 0 && a2 !== 0) {
    return true;
  }
  return false;
};
