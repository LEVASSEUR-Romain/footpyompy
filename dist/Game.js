import VariableGlobal from "./VariableGlobal.js";
export default class Game {
    constructor(tableauDeJoueur) {
        this.tableauJoueur = [];
        this.positionJoueur = [];
        this.rayonPlayer = VariableGlobal.player.RAYONPLAYER;
        this.tableauJoueur = tableauDeJoueur;
    }
    // AVANCER LES JOUEURS
    avancer(player) {
        player.Position.x =
            player.Position.x + this.rayonPlayer * Math.cos(player.angle);
        player.Position.y =
            player.Position.y + this.rayonPlayer * Math.sin(player.angle);
        if (this.iScollisionBordure(player)) {
            this.changementAngle(player);
            this.collisionBordurePosition(player);
        }
    }
    avancerTousLesJoueurs() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            this.avancer(this.tableauJoueur[i]);
        }
        this.mettreAJourPosition();
    }
    mettreAJourPosition() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            this.positionJoueur.push(this.tableauJoueur[i].getPosition());
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
            player.angle = player.angle + Math.PI;
        }
        else if (player.Position.x - this.rayonPlayer <=
            VariableGlobal.terrain.border) {
            player.angle = player.angle + Math.PI;
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
    IscollisionEntreJouer() {
        this.mettreAJourPosition();
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            this.IsplayerCollision(this.tableauJoueur[i]);
        }
    }
    IsplayerCollision(player) {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            if (this.tableauJoueur[i] != player) {
                if (player.getPosition().x <=
                    this.tableauJoueur[i].getPosition().x + this.rayonPlayer &&
                    player.getPosition().x + this.rayonPlayer >
                        this.tableauJoueur[i].getPosition().x &&
                    player.getPosition().y <=
                        this.tableauJoueur[i].getPosition().y + this.rayonPlayer &&
                    player.getPosition().y + this.rayonPlayer >=
                        this.tableauJoueur[i].getPosition().y) {
                    return true;
                }
            }
        }
        return false;
    }
}