import VariableGlobal from "./VariableGlobal.js";
export default class Player {
  //typage de variable
  Position: { x: number; y: number } = { x: 0, y: 0 };
  player: number;
  angle: number;
  speed: number;
  masse: number;
  color: string;
  RAYONPLAYER: number = VariableGlobal.player.RAYONPLAYER;
  constructor(numberPlayer: number, color: string) {
    this.angle = 0;
    this.speed = 0;
    this.player = numberPlayer;
    this.masse = VariableGlobal.player.masse;
    this.color = color;
  }

  //getter setter
  public getPosition(): { x: number; y: number } {
    return this.Position;
  }
  public setPosition(x: number, y: number): void {
    this.Position.x = x;
    this.Position.y = y;
  }
  public setAngle(angle: number): void {
    this.angle = angle;
  }
}
