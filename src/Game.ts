import Player from "./Player";
import { Position } from "./Interface";
import VariableGlobal from "./VariableGlobal.js";
import collision from "./collision.js";
import { distanceEntreObjet } from "./outilsMath.js";
import gestionCollision from "./gestionCollision.js";
import collisionPyompy from "./collisionPyompy.js";
export default class Game {
  tableauJoueur: Player[] = [];
  rayonPlayer: number = VariableGlobal.player.RAYONPLAYER;
  nombreAnimationJouer: number;
  constructor(tableauDeJoueur: Player[]) {
    this.tableauJoueur = tableauDeJoueur;
    this.nombreAnimationJouer = VariableGlobal.mouvement.nombreAnimationJouer;
  }
  // AVANCER LES JOUEURS
  public avancer(player: Player): void {
    // on remet les collision a false il est modifier dans gestionCollision
    player.collision = false;
    const avancement =
      (player.speed / VariableGlobal.player.maxSpeed) *
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

  public avancerTousLesJoueurs(): void {
    this.nombreAnimationJouer = this.nombreAnimationJouer - 1;
    for (let i = 0; i < this.tableauJoueur.length; i++) {
      if (this.tableauJoueur[i].speed > 0) {
        this.avancer(this.tableauJoueur[i]);
      }
    }
  }

  //colision avec le border
  public iScollisionBordure(player: Player): boolean {
    if (
      player.Position.x + this.rayonPlayer >=
        VariableGlobal.terrain.width - VariableGlobal.terrain.border ||
      player.Position.x - this.rayonPlayer <= VariableGlobal.terrain.border ||
      player.Position.y - this.rayonPlayer <= VariableGlobal.terrain.border ||
      player.Position.y + this.rayonPlayer >=
        VariableGlobal.terrain.height - VariableGlobal.terrain.border
    ) {
      return true;
    }
    return false;
  }

  public changementAngle(player: Player): void {
    if (
      player.Position.x + this.rayonPlayer >=
      VariableGlobal.terrain.width - VariableGlobal.terrain.border
    ) {
      player.angle = Math.PI - player.angle;
    } else if (
      player.Position.x - this.rayonPlayer <=
      VariableGlobal.terrain.border
    ) {
      player.angle = Math.PI - player.angle;
    } else if (
      player.Position.y - this.rayonPlayer <=
      VariableGlobal.terrain.border
    ) {
      player.angle = -player.angle;
    } else if (
      player.Position.y + this.rayonPlayer >=
      VariableGlobal.terrain.height - VariableGlobal.terrain.border
    ) {
      player.angle = -player.angle;
    }
  }

  public collisionBordurePosition(player: Player): void {
    if (
      player.Position.x + this.rayonPlayer >=
      VariableGlobal.terrain.width - VariableGlobal.terrain.border
    ) {
      player.Position.x =
        VariableGlobal.terrain.width -
        VariableGlobal.terrain.border -
        this.rayonPlayer;
    } else if (
      player.Position.x - this.rayonPlayer <=
      VariableGlobal.terrain.border
    ) {
      player.Position.x = VariableGlobal.terrain.border + this.rayonPlayer;
    } else if (
      player.Position.y - this.rayonPlayer <=
      VariableGlobal.terrain.border
    ) {
      player.Position.y = VariableGlobal.terrain.border + this.rayonPlayer;
    } else if (
      player.Position.y + this.rayonPlayer >=
      VariableGlobal.terrain.height - VariableGlobal.terrain.border
    ) {
      player.Position.y =
        VariableGlobal.terrain.height -
        VariableGlobal.terrain.border -
        this.rayonPlayer;
    }
  }
  // collisison entre joueur
  public collisionEntreJouer(): void {
    for (let i = 0; i < this.tableauJoueur.length; i++) {
      this.IsplayerCollision(this.tableauJoueur[i], i);
    }
  }
  public IsplayerCollision(player: Player, avancement: number): void {
    for (let i = avancement; i < this.tableauJoueur.length; i++) {
      if (this.tableauJoueur[i].player !== player.player) {
        if (this.isCollisionInCarre(player, this.tableauJoueur[i])) {
          const distance = distanceEntreObjet(
            player.PositionPreview,
            this.tableauJoueur[i].PositionPreview
          );
          if (distance <= this.rayonPlayer * 2) {
            //gestionCollision(player, this.tableauJoueur[i]);
            //collision(player, this.tableauJoueur[i]);
            collisionPyompy(player, this.tableauJoueur[i]);
          }
        }
      }
    }
  }

  private isCollisionInCarre(player1: Player, player2: Player): boolean {
    if (
      player1.PositionPreview.x - this.rayonPlayer <=
        player2.PositionPreview.x + this.rayonPlayer &&
      player1.PositionPreview.x + this.rayonPlayer >
        player2.PositionPreview.x - this.rayonPlayer &&
      player1.PositionPreview.y - this.rayonPlayer <=
        player2.PositionPreview.y + this.rayonPlayer &&
      player1.PositionPreview.y + this.rayonPlayer >=
        player2.PositionPreview.y - this.rayonPlayer
    ) {
      return true;
    }
    return false;
  }

  private lawSpeed(player: Player): void {
    const ratioAnimation =
      this.nombreAnimationJouer / VariableGlobal.mouvement.nombreAnimationJouer;
    if (player.speed < VariableGlobal.mouvement.velociteMin) {
      player.speed = 0;
    } else {
      player.speed = player.speed * ratioAnimation;
    }
  }

  public isAnimationfinish(): boolean {
    for (let i = 0; i < this.tableauJoueur.length; i++) {
      if (this.tableauJoueur[i].speed > 0) {
        return false;
      }
    }
    return true;
  }

  public refrechAngleSpeed(): void {
    for (let i = 0; i < this.tableauJoueur.length; i++) {
      this.tableauJoueur[i].angle = 0;
      this.tableauJoueur[i].speed = 0;
    }
  }
}
