
export class PoseJson {
  angles: number[];
}

class Point {
  x: number;
  y: number;
  z: number;
}

class Rotation {
  roll: number;
  pitch: number;
  yaw: number;
}

export class PositionJson {
  point: Point;
  rotation: Rotation;
}
