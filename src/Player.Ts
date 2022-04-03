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
    this.angle = 0;
    this.speed = 0;
    this.player = numberPlayer;
  }

  public cerclePlayer(): Cercle {
    return {
      x: this.Position.x,
      y: this.Position.y,
      r: this.RAYONPLAYER,
      ai: 0,
      af: Math.PI * 2,
    };
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
}
