import VariableGlobal from "./VariableGlobal.js";
import collision from "./collision.js";
import { distanceEntreObjet } from "./outilsMath.js";
export default class Game {
    constructor(tableauDeJoueur) {
        this.tableauJoueur = [];
        this.rayonPlayer = VariableGlobal.player.RAYONPLAYER;
        this.tableauJoueur = tableauDeJoueur;
    }
    // AVANCER LES JOUEURS
    avancer(player) {
        // A coriggé le 2
        player.Position.x = player.Position.x + 2 * Math.cos(player.angle);
        player.Position.y = player.Position.y + 2 * Math.sin(player.angle);
        if (this.iScollisionBordure(player)) {
            this.changementAngle(player);
            this.collisionBordurePosition(player);
        }
        this.collisionEntreJouer();
    }
    avancerTousLesJoueurs() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            if (this.tableauJoueur[i].speed !== 0) {
                this.avancer(this.tableauJoueur[i]);
            }
        }
    }
    //colision avec le border
    iScollisionBordure(player) {
        if (player.Position.x + this.rayonPlayer >=
            VariableGlobal.terrain.width - VariableGlobal.terrain.border ||
            player.Position.x - this.rayonPlayer <= VariableGlobal.terrain.border ||
            player.Position.y - this.rayonPlayer <= VariableGlobal.terrain.border ||
            player.Position.y + this.rayonPlayer >=
                VariableGlobal.terrain.height - VariableGlobal.terrain.border) {
            return true;
        }
        return false;
    }
    changementAngle(player) {
        if (player.Position.x + this.rayonPlayer >=
            VariableGlobal.terrain.width - VariableGlobal.terrain.border) {
            player.angle = Math.PI - player.angle;
        }
        else if (player.Position.x - this.rayonPlayer <=
            VariableGlobal.terrain.border) {
            player.angle = Math.PI - player.angle;
        }
        else if (player.Position.y - this.rayonPlayer <=
            VariableGlobal.terrain.border) {
            player.angle = -player.angle;
        }
        else if (player.Position.y + this.rayonPlayer >=
            VariableGlobal.terrain.height - VariableGlobal.terrain.border) {
            player.angle = -player.angle;
        }
    }
    collisionBordurePosition(player) {
        if (player.Position.x + this.rayonPlayer >=
            VariableGlobal.terrain.width - VariableGlobal.terrain.border) {
            player.Position.x =
                VariableGlobal.terrain.width -
                    VariableGlobal.terrain.border -
                    this.rayonPlayer;
        }
        else if (player.Position.x - this.rayonPlayer <=
            VariableGlobal.terrain.border) {
            player.Position.x = VariableGlobal.terrain.border + this.rayonPlayer;
        }
        else if (player.Position.y - this.rayonPlayer <=
            VariableGlobal.terrain.border) {
            player.Position.y = VariableGlobal.terrain.border + this.rayonPlayer;
        }
        else if (player.Position.y + this.rayonPlayer >=
            VariableGlobal.terrain.height - VariableGlobal.terrain.border) {
            player.Position.y =
                VariableGlobal.terrain.height -
                    VariableGlobal.terrain.border -
                    this.rayonPlayer;
        }
    }
    // collisison entre joueur
    collisionEntreJouer() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            this.IsplayerCollision(this.tableauJoueur[i], i);
        }
    }
    IsplayerCollision(player, avancement) {
        for (let i = avancement; i < this.tableauJoueur.length; i++) {
            if (this.tableauJoueur[i] != player) {
                if (player.Position.x - this.rayonPlayer <=
                    this.tableauJoueur[i].Position.x + this.rayonPlayer &&
                    player.Position.x + this.rayonPlayer >
                        this.tableauJoueur[i].Position.x - this.rayonPlayer &&
                    player.Position.y - this.rayonPlayer <=
                        this.tableauJoueur[i].Position.y + this.rayonPlayer &&
                    player.Position.y + this.rayonPlayer >=
                        this.tableauJoueur[i].Position.y - this.rayonPlayer) {
                    const distance = distanceEntreObjet(player.Position, this.tableauJoueur[i].Position);
                    if (distance <= this.rayonPlayer * 2) {
                        const distanceDeCollision = this.rayonPlayer * 2 - distance;
                        player.Position.x =
                            player.Position.x -
                                (distanceDeCollision * Math.cos(player.angle)) / 2;
                        player.Position.y =
                            player.Position.y -
                                (distanceDeCollision * Math.sin(player.angle)) / 2;
                        this.tableauJoueur[i].Position.x =
                            this.tableauJoueur[i].Position.x -
                                (distanceDeCollision * Math.cos(this.tableauJoueur[i].angle)) / 2;
                        this.tableauJoueur[i].Position.y =
                            this.tableauJoueur[i].Position.y -
                                (distanceDeCollision * Math.sin(this.tableauJoueur[i].angle)) / 2;
                        // voir fichier collision.Ts
                        collision(player, this.tableauJoueur[i]);
                    }
                }
            }
        }
    }
}
