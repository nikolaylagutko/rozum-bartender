import {Program} from './program';
import {RobotService} from '../services/robot.service';
import {Observable} from 'rxjs';
import {Program1} from './Program1';
import {Pose} from '../model';

export class Program2 implements Program {
  private static START_POSE: Pose = {a1: 0, a2: 90, a3: 0, a4: -90, a5: 90, a6: 180};

  run(service: RobotService): Observable<any> {
    return service.openGripper().flatMap(() =>
      service.setPose(Program2.START_POSE)
    ).flatMap(() =>
      service.closeGripper()
    );
  }

}
