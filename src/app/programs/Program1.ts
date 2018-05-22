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
  private static BEFORE_HOME: Position = {x: 0.49, y: 0.53, z: 0.72, roll: 1.5707893371582031, pitch: 0.5760120749473572, yaw: -0.9601222276687622};

  private static BEFORE_1: Position = { x: Program1.INITIAL_X + 0.05, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z, roll: 1.5707536935806274, pitch: 0.26176512241363525, yaw: -1.6584597826004028};
  private static BEFORE_2: Position = { x: Program1.INITIAL_X + 0.05, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z + 0.1, roll: -1.0855844020843506, pitch: 0.5709584951400757, yaw: -0.7952526807785034};
  private static BEFORE_3: Position = { x: Program1.INITIAL_X + 0.2, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z + 0.15, roll: -0.7855721116065979, pitch: 0.970974326133728, yaw: -0.7952494025230408};
  private static BEFORE_4: Position = { x: Program1.INITIAL_X + 0.35, y: Program1.INITIAL_Y, z: Program1.INITIAL_Z + 0.3, roll: -1.0855844020843506, pitch: 0.5709584951400757, yaw: -0.7952526807785034};
  private static BEFORE_5: Position = { x: Program1.INITIAL_X + 0.4, y: Program1.INITIAL_Y + 0.02, z: Program1.INITIAL_Z + 0.44, roll: 1.5707536935806274, pitch: 0.26176512241363525, yaw: -1.6584597826004028};
  private static BEFORE_6: Position = { x: 0.7325093897042189, y: 0.5138609462741055, z: 0.6483402541993144, roll: 1.570788860321045, pitch: 0.2617891728878021, yaw: -1.658217191696167};

  private static TAKE_1: Position = { x: Program1.TAKE_X, y: Program1.TAKE_Y, z: Program1.TAKE_Z, roll: 1.9011156558990479, pitch: 1.5706969499588013, yaw: 2.8012726306915283};

  private static LIFT_1: Position = { x: Program1.TAKE_X, y: Program1.TAKE_Y, z: Program1.TAKE_Z + 0.05, roll: 1.116859793663025, pitch: 1.5706517696380615, yaw: -2.6976568698883057};

  private static INTERMEDIATE_1: Position = { x: Program1.TAKE_X + 0.15, y: Program1.TAKE_Y, z: Program1.TAKE_Z + 0.2, roll: -2.257770538330078, pitch: 1.5706698894500732, yaw: 0.6769829988479614};
  private static INTERMEDIATE_2: Position = { x: Program1.TAKE_X + 0.2, y: Program1.TAKE_Y + 0.2, z: Program1.TAKE_Z + 0.3, roll: -2.73281192779541, pitch: 1.5705806016921997, yaw: 1.1519266366958618};
  private static INTERMEDIATE_3: Position = { x: Program1.TAKE_X + 0.2, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.4, roll: 2.9147324562072754, pitch: 1.5706435441970825, yaw: 1.7875690460205078};
  private static INTERMEDIATE_4: Position = { x: Program1.TAKE_X + 0.15, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: 2.4636738300323486, pitch: 1.5706268548965454, yaw: 2.238626003265381};
  private static INTERMEDIATE_5: Position = { x: Program1.TAKE_X - 0.05, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: 2.2452642917633057, pitch: 1.5707377195358276, yaw: 2.4170403480529785};

  private static AFTER_1: Position = { x: Program1.TAKE_X + 0.49, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: 2.8160221576690674, pitch: 1.570728063583374, yaw: 1.846255898475647};
  private static AFTER_2: Position = { x: Program1.TAKE_X + 0.55, y: Program1.TAKE_Y + 0.3, z: Program1.TAKE_Z + 0.44, roll: 2.8131022453308105, pitch: 1.570727825164795, yaw: 1.8492051362991333};


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
