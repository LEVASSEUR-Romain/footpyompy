// w witdh et h height
export interface Rectangle {
  x: number;
  y: number;
  w: number;
  h: number;
}

// r rayon du player ai angle départ af angle final
export interface Cercle {
  x: number;
  y: number;
  r: number;
  ai: number;
  af: number;
}

// position
export interface Position {
  x: number;
  y: number;
}

export interface Vector {
  x: number;
  y: number;
}
