import { Position, Rectangle } from "./Interface";
import VariableGlobal from "./VariableGlobal.js";
export default class Terrain {
  width: number;
  height: number;
  border: number;
  POURCENTAGEGLOBALGOAL: number = VariableGlobal.terrain.POURCENTAGEGLOBALGOAL;
  constructor() {
    this.width = VariableGlobal.terrain.width;
    this.height = VariableGlobal.terrain.height;
    this.border = VariableGlobal.terrain.border;
  }

  public dimensionGoalPlayer1(): Rectangle {
    return {
      x: this.getBorder() / 2,
      y:
        this.height / 2 - (this.width * (this.POURCENTAGEGLOBALGOAL / 100)) / 2,
      w: this.getBorder() / 2,
      h: this.width * (this.POURCENTAGEGLOBALGOAL / 100),
    };
  }

  public dimensionGoalPlayer2(): Rectangle {
    return {
      x: this.width - this.getBorder(),
      y:
        this.height / 2 - (this.width * (this.POURCENTAGEGLOBALGOAL / 100)) / 2,
      w: this.getBorder() / 2,
      h: this.width * (this.POURCENTAGEGLOBALGOAL / 100),
    };
  }

  public dimensionBorder(): Rectangle {
    return {
      x: this.getBorder(),
      y: this.getBorder(),
      w: this.getWidth() - this.getBorder() * 2,
      h: this.getHeight() - this.getBorder() * 2,
    };
  }

  public positionPlayerStart(numeroPlayer: number): Position {
    const diametrePlayer = VariableGlobal.player.RAYONPLAYER * 2;
    switch (numeroPlayer) {
      case 1:
        return {
          x: this.width / 4,
          y:
            this.height / 2 -
            diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
        };
      case 2:
        return {
          x: this.width / 4,
          y: this.height / 2,
        };
      case 3:
        return {
          x: this.width / 4,
          y:
            this.height / 2 +
            diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
        };
      case 4:
        return {
          x: (this.width * 3) / 4,
          y:
            this.height / 2 -
            diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
        };
      case 5:
        return {
          x: (this.width * 3) / 4,
          y: this.height / 2,
        };
      case 6:
        return {
          x: (this.width * 3) / 4,
          y:
            this.height / 2 +
            diametrePlayer * VariableGlobal.positionStart.ecartEntrejoueur,
        };
      default:
        return {
          x: this.width / 4,
          y: this.height / 4,
        };
    }
  }

  public positionStartBallon(): Position {
    return {
      x: this.width / 2,
      y: this.height / 2,
    };
  }
  //getter setter
  public getWidth(): number {
    return this.width;
  }
  public setWidth(whitdh: number): void {
    this.width = whitdh;
  }
  public getHeight(): number {
    return this.height;
  }
  public setHeight(height: number): void {
    this.height = height;
  }
  public getBorder(): number {
    return this.border;
  }
  public setBorder(border: number): void {
    this.border = border;
  }
}
