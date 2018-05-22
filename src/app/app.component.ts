import { Component } from '@angular/core';
import {RobotService} from './services/robot.service';
import {Program} from './programs/program';
import {Program1} from './programs/Program1';
import {Program2} from './programs/Program2';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private program1 = new Program1();
  private program2 = new Program2();

  busy: Subscription;

  constructor(private service: RobotService) { }

  runProgram1() {
    this.execute(this.program1);
  }

  runProgram2() {
    this.execute(this.program2);
  }

  private execute(program: Program) {
    this.busy = program.run(this.service).subscribe(() => this.finish());
  }

  private finish() {
    alert('Executed!');
  }

}
