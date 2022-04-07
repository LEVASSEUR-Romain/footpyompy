import Player from "./Player";
import VariableGlobal from "./VariableGlobal.js";
import { playerMaxSpeed, playerMinSpeed } from "./outilsMath.js";

const collision = (Player1: Player, Player2: Player): void => {
  // Collision avec un player static
  if (Player1.speed === 0 || Player2.speed === 0) {
    // 1 cas choc frontal
    if (
      Math.abs(Player1.Position.x - Player2.Position.x) <=
        VariableGlobal.mouvement.ecartX ||
      Math.abs(Player1.Position.y - Player2.Position.y) <=
        VariableGlobal.mouvement.ecartY
    ) {
      const playerMax = playerMaxSpeed(Player1, Player2);
      const playerMin = playerMinSpeed(Player1, Player2);
      playerMin.speed = playerMax.speed;
      playerMin.angle = playerMax.angle;
      playerMax.speed = 0;
    }
    // 2 cas choc latéral
    else {
      const playerMax = playerMaxSpeed(Player1, Player2);
      const playerMin = playerMinSpeed(Player1, Player2);
      playerMin.speed = playerMax.speed / 2;
      playerMax.speed = playerMax.speed / 2;
      // angle entre les 2 joueurs + ou -
      if (playerMin.Position.y > playerMax.Position.y) {
        playerMin.angle = playerMax.angle + Math.PI / 4;
        playerMax.angle = playerMax.angle - Math.PI / 4;
      } else {
        playerMin.angle = playerMax.angle - Math.PI / 4;
        playerMax.angle = playerMax.angle + Math.PI / 4;
      }
    }
  } else {
    // 1 cas choc frontal
    if (
      Math.abs(Player1.Position.x - Player2.Position.x) <=
        VariableGlobal.mouvement.ecartX ||
      Math.abs(Player1.Position.y - Player2.Position.y) <=
        VariableGlobal.mouvement.ecartY
    ) {
      const speedMoyenne = (Player1.speed + Player2.speed) / 2;
      Player1.speed = speedMoyenne;
      Player2.speed = speedMoyenne;
      Player1.angle = Player1.angle + Math.PI;
      Player2.angle = Player2.angle + Math.PI;
      // on ne change pas la speed
    }
    // 2 cas choc latéral
    else {
      console.log("choc latéral");
      // moyenne des speed entre les deux boules
      const speedMoyenne = (Player1.speed + Player2.speed) / 2;
      Player2.speed = speedMoyenne;
      Player1.speed = speedMoyenne;
      // angle entre les 2 joueurs + ou -
      if (Player2.Position.y > Player1.Position.y) {
        Player2.angle = Player1.angle + Math.PI / 4;
        Player1.angle = Player1.angle - Math.PI / 4;
      } else {
        Player2.angle = Player1.angle - Math.PI / 4;
        Player1.angle = Player1.angle + Math.PI / 4;
      }
    }
  }
};

export default collision;
