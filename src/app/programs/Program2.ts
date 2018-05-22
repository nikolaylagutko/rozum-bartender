import {Program} from './program';
import {RobotService} from '../services/robot.service';
import {Observable} from 'rxjs';
import {Pose, Position} from '../model';
import {Program1} from './Program1';

export class Program2 implements Program {
  private static INITIAL_ROLL = - Math.PI / 4;
  private static INITIAL_PITCH = Math.PI / 2;
  private static INITIAL_YAW = - Math.PI / 4 - 0.01;
  private static INITIAL_X = 0.3;
  private static INITIAL_Y = 0.115;
  private static INITIAL_Z = -0.31;

  private static TAKE_X = 0.3;
  private static TAKE_Y = 0.115;
  private static TAKE_Z = -0.31;
  private static TAKE_ROLL = - Math.PI / 4;
  private static TAKE_PITCH = Math.PI / 2;
  private static TAKE_YAW = - Math.PI / 4 - 0.01;

  private static SPEED = 60;

  private static HOME_POSE: Pose = {a1: 0, a2: 90, a3: 0, a4: -90, a5: 90, a6: 0};
  private static BEFORE_HOME: Position = {x: 0.49, y: 0.53, z: 0.72, roll: 1.57, pitch: 0.57, yaw: 0.96};

  private static BEFORE_1: Position = { x: Program2.INITIAL_X + 0.05, y: Program2.INITIAL_Y, z: Program2.INITIAL_Z, roll: Program2.INITIAL_ROLL, pitch: Program2.INITIAL_PITCH, yaw: Program2.INITIAL_YAW};
  private static BEFORE_2: Position = { x: Program2.INITIAL_X + 0.05, y: Program2.INITIAL_Y, z: Program2.INITIAL_Z + 0.1, roll: Program2.INITIAL_ROLL, pitch: Program2.INITIAL_PITCH, yaw: Program2.INITIAL_YAW};
  private static BEFORE_3: Position = { x: Program2.INITIAL_X + 0.2, y: Program2.INITIAL_Y, z: Program2.INITIAL_Z + 0.15, roll: Program2.INITIAL_ROLL, pitch: Program2.INITIAL_PITCH - 0.2, yaw: Program2.INITIAL_YAW};
  private static BEFORE_4: Position = { x: Program2.INITIAL_X + 0.35, y: Program2.INITIAL_Y, z: Program2.INITIAL_Z + 0.3, roll: Program2.INITIAL_ROLL, pitch: Program2.INITIAL_PITCH - 0.6, yaw: Program2.INITIAL_YAW};
  private static BEFORE_5: Position = { x: Program2.INITIAL_X + 0.4, y: Program2.INITIAL_Y + 0.02, z: Program2.INITIAL_Z + 0.44, roll: Program2.INITIAL_ROLL - 0.3, pitch: Program2.INITIAL_PITCH - 1.0, yaw: Program2.INITIAL_YAW};
  private static BEFORE_6: Position = { x: 0.73, y: 0.51, z: 0.64, roll: 1.57, pitch: 0.26, yaw: 1.65};

  private static TAKE_1: Position = { x: Program2.TAKE_X, y: Program2.TAKE_Y, z: Program2.TAKE_Z, roll: Program2.TAKE_ROLL, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW};

  private static LIFT_1: Position = { x: Program2.TAKE_X, y: Program2.TAKE_Y, z: Program2.TAKE_Z + 0.05, roll: Program2.TAKE_ROLL, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW};

  private static INTERMEDIATE_1: Position = { x: Program2.TAKE_X + 0.15, y: Program2.TAKE_Y, z: Program2.TAKE_Z + 0.2, roll: Program2.TAKE_ROLL, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW};
  private static INTERMEDIATE_2: Position = { x: Program2.TAKE_X + 0.2, y: Program2.TAKE_Y + 0.2, z: Program2.TAKE_Z + 0.3, roll: Program2.TAKE_ROLL, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW};
  private static INTERMEDIATE_3: Position = { x: Program2.TAKE_X + 0.2, y: Program2.TAKE_Y + 0.3, z: Program2.TAKE_Z + 0.4, roll: Program2.TAKE_ROLL, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW};
  private static INTERMEDIATE_4: Position = { x: Program2.TAKE_X + 0.15, y: Program2.TAKE_Y + 0.3, z: Program2.TAKE_Z + 0.44, roll: Program2.TAKE_ROLL - 0.2, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW - 0.2};
  private static INTERMEDIATE_5: Position = { x: Program2.TAKE_X - 0.05, y: Program2.TAKE_Y + 0.3, z: Program2.TAKE_Z + 0.44, roll: Program2.TAKE_ROLL - 0.2, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW - 0.24};

  private static AFTER_1: Position = { x: Program2.TAKE_X + 0.49, y: Program2.TAKE_Y + 0.3, z: Program2.TAKE_Z + 0.44, roll: Program2.TAKE_ROLL - 0.2, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW - 0.24};
  private static AFTER_2: Position = { x: Program2.TAKE_X + 0.55, y: Program2.TAKE_Y + 0.3, z: Program2.TAKE_Z + 0.44, roll: Program2.TAKE_ROLL - 0.2, pitch: Program2.TAKE_PITCH, yaw: Program2.TAKE_YAW - 0.24};


  run(service: RobotService): Observable<any> {
    return service.openGripper().flatMap(() =>
      service.setPose(Program2.HOME_POSE)
    ).flatMap(() =>
      service.runPositions([
        Program2.BEFORE_6, Program2.BEFORE_5, Program2.BEFORE_4, Program2.BEFORE_3, Program2.BEFORE_2, Program2.BEFORE_1
      ], Program2.SPEED)
    ).flatMap(() =>
      service.openGripper()
    ).flatMap(() =>
      service.setPosition(Program2.TAKE_1, Program2.SPEED)
    ).flatMap(() =>
      service.closeGripper()
    ).flatMap(() =>
      service.setPosition(Program2.LIFT_1, Program2.SPEED)
    ).flatMap(() =>
      service.runPositions([
        Program2.INTERMEDIATE_1, Program2.INTERMEDIATE_2, Program2.INTERMEDIATE_3, Program2.INTERMEDIATE_4, Program2.INTERMEDIATE_5
      ], Program2.SPEED)
    ).flatMap(() =>
      service.openGripper()
    ).flatMap(() =>
      service.runPositions([ Program2.AFTER_1, Program2.AFTER_2, Program2.BEFORE_HOME], Program2.SPEED)
    ).flatMap(() =>
      service.setPose(Program2.HOME_POSE, Program2.SPEED)
    );
  }

}
