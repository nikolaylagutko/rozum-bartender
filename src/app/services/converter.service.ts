import {Injectable} from '@angular/core';
import {PoseJson, PositionJson} from './model';
import {Pose, Position} from '../model';

@Injectable()
export class ConverterService {

  constructor() {

  }

  convertPose(pose: Pose): PoseJson {
    return {
      angles: [pose.a1, pose.a2 - 180, pose.a3, pose.a4, -pose.a5, pose.a6]
    };
  }

  convertPoseJson(pose: PoseJson): Pose {
    return {
      a1: pose.angles[0],
      a2: pose.angles[1],
      a3: pose.angles[2],
      a4: pose.angles[3],
      a5: pose.angles[4],
      a6: pose.angles[5],
    };
  }

  convertPosition(position: Position): PositionJson {
    return {
      point: {
        x: position.x,
        y: position.y,
        z: position.z
      },
      rotation: {
        roll: position.roll,
        pitch: position.pitch,
        yaw: position.yaw
      }
    };
  }

  convertPositionJson(position: PositionJson): Position {
    return {
      x: position.point.x,
      y: position.point.y,
      z: position.point.z,
      roll: position.rotation.roll,
      pitch: position.rotation.pitch,
      yaw: position.rotation.yaw
    };
  }
}


