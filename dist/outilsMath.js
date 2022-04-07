import VariableGlobal from "./VariableGlobal.js";
export const distanceEntreObjet = (obj1, obj2) => {
    const x = obj2.x - obj1.x;
    const y = obj2.y - obj1.y;
    return Math.pow((x * x + y * y), 0.5);
};
export const angleEntreObjet = (obj1, obj2) => {
    return Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
};
export const playerMaxSpeed = (player, player2) => {
    if (player.speed > player2.speed) {
        return player;
    }
    return player2;
};
export const playerMinSpeed = (player, player2) => {
    if (player.speed < player2.speed) {
        return player;
    }
    return player2;
};
export const hypothenusBlockMaxSpeed = (x, y, player) => {
    const hypo = Math.pow((Math.pow((x - player.Position.x), 2) + Math.pow((y - player.Position.y), 2)), 0.5);
    if (hypo >= VariableGlobal.player.maxSpeed) {
        return VariableGlobal.player.maxSpeed;
    }
    return hypo;
};
