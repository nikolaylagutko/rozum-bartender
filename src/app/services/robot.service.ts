import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Pose, Position} from '../model';
import {ConverterService} from './converter.service';
import {PoseJson, PositionJson} from './model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/skipWhile';

@Injectable()
export class RobotService {

  private  static TIMEOUT = 100; // 100 milliseconds

  private static fillSpeedAndTime(speed?: number, time?: number): HttpParams {
    let params = new HttpParams();
    if (speed) {
      params = params.set('speed', speed.toString());
    }
    if (time) {
      params = params.set('time', time.toString());
    }
    params = params.set('solution', 'full');

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
    return this.http.get<PositionJson>('/position').map(this.converter.convertPositionJson);
  }

  setPosition(position: Position, speed?: number, time?: number): Observable<Position> {
    const params = RobotService.fillSpeedAndTime(speed, time);
    const positionJson = this.converter.convertPosition(position);
    const action = () => this.http.put('/position', positionJson, { params: params });

    return this.waitMoving(action).flatMap(() => this.getPosition());
  }

  runPoses(poses: Pose[], speed?: number, time?: number): Observable<Pose> {
    const params = RobotService.fillSpeedAndTime(speed, time);
    const posesJson = poses.map(p => this.converter.convertPose(p));
    const action = () => this.http.put('/poses/run', posesJson, { params: params});

    return this.waitMoving(action).flatMap(() => this.getPose());
  }

  runPositions(positions: Position[], speed?: number, time?: number): Observable<Position> {
    const params = RobotService.fillSpeedAndTime(speed, time);
    const positionsJson = positions.map(p => this.converter.convertPosition(p));
    const action = () => this.http.put('/positions/run', positionsJson, { params: params });

    return this.waitMoving(action).flatMap(() => this.getPosition());
  }

  openGripper(): Observable<any> {
    return this.http.put('/gripper/open', {});
  }

  closeGripper(): Observable<any> {
    return this.http.put('/gripper/close', {});
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
        .skipWhile(status => status === 'RUNNING')
        .take(1)
    );
  }



}
