import {RobotService} from '../services/robot.service';
import {Observable} from 'rxjs';

export interface Program {

  run(service: RobotService): Observable<any>;

}
