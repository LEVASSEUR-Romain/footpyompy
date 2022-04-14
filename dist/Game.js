import VariableGlobal from "./VariableGlobal.js";
import { distanceEntreObjet } from "./outilsMath.js";
import gestionCollision from "./gestionCollision.js";
export default class Game {
    constructor(tableauDeJoueur) {
        this.tableauJoueur = [];
        this.rayonPlayer = VariableGlobal.player.RAYONPLAYER;
        this.tableauJoueur = tableauDeJoueur;
        this.nombreAnimationJouer = VariableGlobal.mouvement.nombreAnimationJouer;
    }
    // AVANCER LES JOUEURS
    avancer(player) {
        // on remet les collision a false il est modifier dans gestionCollision
        player.collision = false;
        const avancement = (player.speed / VariableGlobal.player.maxSpeed) *
            VariableGlobal.player.maxPxAvancement;
        const avancementX = player.Position.x + avancement * Math.cos(player.angle);
        const avancementY = player.Position.y + avancement * Math.sin(player.angle);
        // position du joueur preview
        player.PositionPreview.x = avancementX;
        player.PositionPreview.y = avancementY;
        this.collisionEntreJouer();
        if (!player.collision) {
            player.Position.x = avancementX;
            player.Position.y = avancementY;
        }
        this.lawSpeed(player);
        if (this.iScollisionBordure(player)) {
            this.changementAngle(player);
            this.collisionBordurePosition(player);
        }
    }
    avancerTousLesJoueurs() {
        this.nombreAnimationJouer = this.nombreAnimationJouer - 1;
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            if (this.tableauJoueur[i].speed > 0) {
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
            if (this.tableauJoueur[i].player !== player.player) {
                if (this.isCollisionInCarre(player, this.tableauJoueur[i])) {
                    const distance = distanceEntreObjet(player.PositionPreview, this.tableauJoueur[i].PositionPreview);
                    if (distance <= this.rayonPlayer * 2) {
                        gestionCollision(player, this.tableauJoueur[i]);
                        //collision(player, this.tableauJoueur[i]);
                        //collisionPyompy(player, this.tableauJoueur[i]);
                    }
                }
            }
        }
    }
    isCollisionInCarre(player1, player2) {
        if (player1.PositionPreview.x - this.rayonPlayer <=
            player2.PositionPreview.x + this.rayonPlayer &&
            player1.PositionPreview.x + this.rayonPlayer >
                player2.PositionPreview.x - this.rayonPlayer &&
            player1.PositionPreview.y - this.rayonPlayer <=
                player2.PositionPreview.y + this.rayonPlayer &&
            player1.PositionPreview.y + this.rayonPlayer >=
                player2.PositionPreview.y - this.rayonPlayer) {
            return true;
        }
        return false;
    }
    lawSpeed(player) {
        const ratioAnimation = this.nombreAnimationJouer / VariableGlobal.mouvement.nombreAnimationJouer;
        if (player.speed < VariableGlobal.mouvement.velociteMin) {
            player.speed = 0;
        }
        else {
            player.speed = player.speed * ratioAnimation;
        }
    }
    isAnimationfinish() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            if (this.tableauJoueur[i].speed > 0) {
                return false;
            }
        }
        return true;
    }
    refrechAngleSpeed() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            this.tableauJoueur[i].angle = 0;
            this.tableauJoueur[i].speed = 0;
        }
    }
}
