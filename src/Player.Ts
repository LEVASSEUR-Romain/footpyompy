import VariableGlobal from "./VariableGlobal.js";
export default class Player {
  //typage de variable
  Position: { x: number; y: number } = { x: 0, y: 0 };
  player: number;
  angle: number;
  speed: number;
  RAYONPLAYER: number = VariableGlobal.player.RAYONPLAYER;
  constructor(numberPlayer: number) {
    this.angle = Math.PI / 4;
    this.speed = 0;
    this.player = numberPlayer;
  }

  //getter setter
  public getPosition(): { x: number; y: number } {
    return this.Position;
  }
  public setPosition(x: number, y: number): void {
    this.Position.x = x;
    this.Position.y = y;
  }
}
