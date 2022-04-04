import { Cercle, Position } from "./Interface";
import VariableGlobal from "./VariableGlobal.js";
export default class Player {
  //typage de variable
  private Position: { x: number; y: number } = { x: 0, y: 0 };
  player: number;
  angle: number;
  speed: number;
  RAYONPLAYER: number = VariableGlobal.player.RAYONPLAYER;
  constructor(numberPlayer: number) {
    this.angle = Math.PI / 3;
    this.speed = 0;
    this.player = numberPlayer;
  }
  // calculer position en function de l'angle
  public avancer(): void {
    console.log(Math.sin(this.angle), "arriver");
    this.Position.x = this.Position.x + this.RAYONPLAYER * Math.cos(this.angle);
    this.Position.y = this.Position.y + this.RAYONPLAYER * Math.sin(this.angle);

    if (this.collisionBordure()) {
      this.angle = this.angle + Math.PI;
      this.collisionBordurePosition();
    }
  }

  //gerer les collisions avec les bordures
  public collisionBordure(): boolean {
    if (
      this.Position.x + this.RAYONPLAYER >=
        VariableGlobal.terrain.width - VariableGlobal.terrain.border ||
      this.Position.x - this.RAYONPLAYER <= VariableGlobal.terrain.border ||
      this.Position.y - this.RAYONPLAYER <= VariableGlobal.terrain.border ||
      this.Position.y + this.RAYONPLAYER >=
        VariableGlobal.terrain.height - VariableGlobal.terrain.border
    ) {
      return true;
    }
    return false;
  }
  // calculer position quand collision border
  private collisionBordurePosition(): void {
    if (
      this.Position.x + this.RAYONPLAYER >=
      VariableGlobal.terrain.width - VariableGlobal.terrain.border
    ) {
      this.Position.x =
        VariableGlobal.terrain.width -
        VariableGlobal.terrain.border -
        this.RAYONPLAYER;
    } else if (
      this.Position.x - this.RAYONPLAYER <=
      VariableGlobal.terrain.border
    ) {
      this.Position.x = VariableGlobal.terrain.border + this.RAYONPLAYER;
    } else if (
      this.Position.y - this.RAYONPLAYER <=
      VariableGlobal.terrain.border
    ) {
      this.Position.y = VariableGlobal.terrain.border + this.RAYONPLAYER;
    } else if (
      this.Position.y + this.RAYONPLAYER >=
      VariableGlobal.terrain.height - VariableGlobal.terrain.border
    ) {
      this.Position.y =
        VariableGlobal.terrain.height -
        VariableGlobal.terrain.border -
        this.RAYONPLAYER;
    }
  }
  //getter setter
  public getPosition(): { x: number; y: number } {
    return this.Position;
  }
  public setPosition(Position: { x: number; y: number }): void {
    this.Position = Position;
  }
  public getAngle(): number {
    return this.angle;
  }
  public setAngle(angle: number): void {
    this.angle = angle;
  }
  public getSpeed(): number {
    return this.speed;
  }
  public setSpeed(speed: number): void {
    this.speed = speed;
  }
  public getPlayer(): number {
    return this.player;
  }
  public getRayonPlayer(): number {
    return this.RAYONPLAYER;
  }
}
