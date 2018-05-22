import {Program} from './program';
import {RobotService} from '../services/robot.service';
import {Observable} from 'rxjs';
import {Pose, Position} from '../model';

export class Program1 implements Program {

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

  private static BEFORE_1: Position = { x: Program1.INITIAL_X + 0.05, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z, roll: Program1.INITIAL_ROLL, pitch: Program1.INITIAL_PITCH, yaw: Program1.INITIAL_YAW};
  private static BEFORE_2: Position = { x: Program1.INITIAL_X + 0.05, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z + 0.1, roll: Program1.INITIAL_ROLL, pitch: Program1.INITIAL_PITCH, yaw: Program1.INITIAL_YAW};
  private static BEFORE_3: Position = { x: Program1.INITIAL_X + 0.2, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z + 0.15, roll: Program1.INITIAL_ROLL, pitch: Program1.INITIAL_PITCH - 0.2, yaw: Program1.INITIAL_YAW};
  private static BEFORE_4: Position = { x: Program1.INITIAL_X + 0.35, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z + 0.3, roll: Program1.INITIAL_ROLL, pitch: Program1.INITIAL_PITCH - 0.6, yaw: Program1.INITIAL_YAW};
  private static BEFORE_5: Position = { x: Program1.INITIAL_X + 0.4, y: Program1.INITIAL_Y + 0.02, z: Program1.INITIAL_Z + 0.44, roll: Program1.INITIAL_ROLL - 0.3, pitch: Program1.INITIAL_PITCH - 1.0, yaw: Program1.INITIAL_YAW};
  private static BEFORE_6: Position = { x: 0.7325093897042189, y: 0.5138609462741055, z: 0.6483402541993144, roll: 1.570788860321045, pitch: 0.2617891728878021, yaw: -1.658217191696167};

  private static TAKE_1: Position = { x: Program1.TAKE_X, y: Program1.TAKE_Y, z: Program1.TAKE_Z, roll: Program1.TAKE_ROLL, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW};

  private static LIFT_1: Position = { x: Program1.TAKE_X, y: Program1.TAKE_Y, z: Program1.TAKE_Z + 0.05, roll: Program1.TAKE_ROLL, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW};

  private static INTERMEDIATE_1: Position = { x: Program1.TAKE_X + 0.15, y: Program1.TAKE_Y, z: Program1.TAKE_Z + 0.2, roll: Program1.TAKE_ROLL, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW};
  private static INTERMEDIATE_2: Position = { x: Program1.TAKE_X + 0.2, y: Program1.TAKE_Y + 0.2, z: Program1.TAKE_Z + 0.3, roll: Program1.TAKE_ROLL, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW};
  private static INTERMEDIATE_3: Position = { x: Program1.TAKE_X + 0.2, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.4, roll: Program1.TAKE_ROLL, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW};
  private static INTERMEDIATE_4: Position = { x: Program1.TAKE_X + 0.25, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: Program1.TAKE_ROLL - 0.2, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW - 0.2};
  private static INTERMEDIATE_5: Position = { x: Program1.TAKE_X + 0.45, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: Program1.TAKE_ROLL - 0.2, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW - 0.24};

  private static AFTER_1: Position = { x: Program1.TAKE_X + 0.49, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: Program1.TAKE_ROLL - 0.2, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW - 0.24};
  private static AFTER_2: Position = { x: Program1.TAKE_X + 0.55, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: Program1.TAKE_ROLL - 0.2, pitch: Program1.TAKE_PITCH, yaw: Program1.TAKE_YAW - 0.24};


  run(service: RobotService): Observable<any> {
    return service.openGripper().flatMap(() =>
      service.setPose(Program1.HOME_POSE)
    ).flatMap(() =>
      service.setPosition(Program1.BEFORE_6, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.BEFORE_5, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.BEFORE_4, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.BEFORE_3, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.BEFORE_2, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.BEFORE_1, Program1.SPEED)
    ).flatMap(() =>
      service.openGripper()
    ).flatMap(() =>
      service.setPosition(Program1.TAKE_1, Program1.SPEED)
    ).flatMap(() =>
      service.closeGripper()
    ).flatMap(() =>
      service.setPosition(Program1.LIFT_1, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.INTERMEDIATE_1, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.INTERMEDIATE_2, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.INTERMEDIATE_3, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.INTERMEDIATE_4, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.INTERMEDIATE_5, Program1.SPEED)
    ).flatMap(() =>
      service.openGripper()
    ).flatMap(() =>
      service.setPosition(Program1.AFTER_1, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.AFTER_2, Program1.SPEED)
    ).flatMap(() =>
      service.setPosition(Program1.BEFORE_HOME, Program1.SPEED)
    ).flatMap(() =>
      service.setPose(Program1.HOME_POSE, Program1.SPEED)
    );
  }
}
