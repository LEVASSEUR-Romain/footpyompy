import VariableGlobal from "./VariableGlobal.js";
export default class Collission {
    constructor(tableauDeJoueur) {
        this.tableauJoueur = [];
        this.positionJoueur = [];
        this.rayonPlayer = VariableGlobal.player.RAYONPLAYER;
        this.tableauJoueur = tableauDeJoueur;
    }
    avancerTousLesJoueurs() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            this.tableauJoueur[i].avancer();
        }
        this.mettreAJourPosition();
    }
    mettreAJourPosition() {
        for (let i = 0; i < this.tableauJoueur.length; i++) {
            this.positionJoueur.push(this.tableauJoueur[i].getPosition());
        }
    }
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
