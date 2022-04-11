import VariableGlobal from "./VariableGlobal.js";
import { Vector } from "./Interface";
export default class Player {
  //typage de variable
  Position: { x: number; y: number } = { x: 0, y: 0 };
  PositionPreview: { x: number; y: number } = { x: 0, y: 0 };
  player: number;
  angle: number;
  speed: number;
  masse: number;
  color: string;
  rayon: number;
  collision: Boolean;
  RAYONPLAYER: number = VariableGlobal.player.RAYONPLAYER;
  constructor(numberPlayer: number, color: string) {
    this.angle = 0;
    this.speed = 0;
    this.player = numberPlayer;
    this.masse = VariableGlobal.player.masse;
    this.color = color;
    this.collision = false;
    // pas modifier partout
    this.rayon = VariableGlobal.player.RAYONPLAYER;
  }

  public getVectorSpeed(): Vector {
    return {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle),
    };
  }

  public setVectorSpeed(vector: Vector): void {
    this.speed = (vector.x ** 2 + vector.y ** 2) ** 0.5;
    this.angle = Math.atan2(vector.y, vector.x);
  }

  //getter setter
  public getPosition(): { x: number; y: number } {
    return this.Position;
  }
  public setPositionAndPreview(x: number, y: number): void {
    this.Position.x = x;
    this.Position.y = y;
    this.PositionPreview.x = x;
    this.PositionPreview.y = y;
  }
  public setAngle(angle: number): void {
    this.angle = angle;
  }
}
