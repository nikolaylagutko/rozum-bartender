import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Pose, Position} from '../model';
import {ConverterService} from './converter.service';
import {PoseJson} from './model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/interval';

@Injectable()
export class RobotService {

  private  static TIMEOUT = 100; // 100 milliseconds

  private static fillSpeedAndTime(speed?: number, time?: number): HttpParams {
    const params = new HttpParams();
    if (speed) {
      params.set('speed', speed.toString());
    }
    if (time) {
      params.set('time', time.toString());
    }

    return params;
  }

  constructor(private http: HttpClient, private converter: ConverterService) { }

  status(): Observable<string> {
    return this.http.get<string>('/status/motion');
  }

  getPose(): Observable<Pose> {
    return this.http.get<PoseJson>('/pose').map(this.converter.convertPoseJson);
  }

  setPose(pose: Pose, speed?: number, time?: number): Observable<Pose> {
    const params = RobotService.fillSpeedAndTime(speed, time);
    const poseJson = this.converter.convertPose(pose);
    const action = () => this.http.put('/pose', poseJson, { params: params });

    return this.waitMoving(action).flatMap(() => this.getPose());
  }

  getPosition(): Observable<Position> {
    return this.http.get<Position>('/position');
  }

  setPosition(position: Position, speed?: number, time?: number): Observable<Position> {
    const params = RobotService.fillSpeedAndTime(speed, time);
    const positionJson = this.converter.convertPosition(position);
    const action = () => this.http.put('/position', positionJson, { params: params });

    return this.waitMoving(action).flatMap(() => this.getPosition());
  }

  runPoses(poses: Pose[], speed?: number, time?: number): Observable<Pose> {
    const params = RobotService.fillSpeedAndTime(speed, time);
    const action = () => this.http.put('/poses/run', poses, { params: params});

    return this.waitMoving(action).flatMap(() => this.getPose());
  }

  runPositions(positions: Position[], speed?: number, time?: number): Observable<Position> {
    const params = RobotService.fillSpeedAndTime(speed, time);
    const action = () => this.http.put('/positions/run', positions, { params: params });

    return this.waitMoving(action).flatMap(() => this.getPosition());
  }

  openGripper(): Observable<any> {
    return this.http.put('/gripper/close', {});
  }

  closeGripper(): Observable<any> {
    return this.http.put('/gripper/open', {});
  }

  freeze(): Observable<any> {
    return this.http.put('/freeze', {});
  }

  relax(): Observable<any>  {
    return this.http.put('/relax', {});
  }

  private waitMoving(action: () => Observable<any>): Observable<string> {
    return action().flatMap(() =>
      Observable.interval(RobotService.TIMEOUT).flatMap(() => this.status())
        .takeWhile(status => status === 'RUNNING')
    );
  }



}
