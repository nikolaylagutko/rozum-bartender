import {Program} from './program';
import {RobotService} from '../services/robot.service';
import {Observable} from 'rxjs';
import {Pose, Position} from '../model';

export class Program2 implements Program {
  private static TAKE_X = 0.3;
  private static TAKE_Y = 0.115;
  private static TAKE_Z = -0.31;

  private static SPEED = 100;

  private static HOME_POSE: Pose = {a1: 0, a2: 90, a3: 0, a4: -90, a5: 90, a6: 0};
  private static HOME: Position = {x: -0.11901095346349844, y: -0.11940131437009674, z: 0.9305895703529117, roll: -2.84, pitch: -1.5707080364227295, yaw: -1.30};
  private static BEFORE_HOME: Position = {x: 0.28643966027746526, y: 0.18045242207222595, z: 0.7282068806154234, roll: -1.5708032846450806, pitch: -0.5760120749473572, yaw: -0.9610802531242371};

  private static BEFORE_6 = {x: 0.47474978426241404, y: 0.1266681579944789, z: 0.6643774748868253, roll: -1.570796251296997, pitch: -0.2617540657520294, yaw: 0.8730484247207642};
  private static BEFORE_5 = {x: 0.49095987345345504, y: 0.1038440847117492, z: 0.21412579707541463, roll: 2.0559935569763184, pitch: -0.5709368586540222, yaw: 0.09273076057434082};
  private static BEFORE_4 = {x: 0.5017535886027755, y: 0.005203466516383828, z: 0.054859659620849696, roll: 2.3560380935668945, pitch: -0.9709660410881042, yaw: 0.715729832649231};
  private static BEFORE_3 = {x: 0.36435936219854537, y: -0.15482557976357949, z: -0.17092482707956316, roll: 2.355966329574585, pitch: -1.3708958625793457, yaw: 0.7469449043273926};
  private static BEFORE_2 = {x: 0.26224062718604404, y: -0.20718665130436704, z: -0.2567601342535085, roll: -1.0301505327224731, pitch: -1.570756196975708, yaw: -2.610917329788208};
  private static BEFORE_1 = {x: 0.20242694992711213, y: -0.20611957651582572, z: -0.35016190058855134, roll: -1.2407959699630737, pitch: -1.5706969499588013, yaw: -2.821584701538086};


  private static TAKE_1: Position = {x: 0.13981255460633296, y: -0.20777583269553313, z: -0.3518939082805496, roll: -1.2407959699630737, pitch: -1.5706969499588013, yaw: -2.821584701538086};

  private static LIFT_1: Position = {x: 0.13398361731813618, y: -0.20851783606632029, z: -0.3039567376552947, roll: -2.0249412059783936, pitch: -1.5706517696380615, yaw: 2.677431106567383};

  private static INTERMEDIATE_1: Position = {x: 0.31460728550928385, y: -0.12509338667989841, z: -0.20265254771789344, roll: -0.09951391816139221, pitch: -1.570691704750061, yaw: -1.6802746057510376};
  private static INTERMEDIATE_2: Position = {x: 0.37651228666025915, y: 0.12592159871327935, z: -0.04064071313397976, roll: 0.3878915309906006, pitch: -1.5705703496932983, yaw: -1.192779302597046};
  private static INTERMEDIATE_3: Position = {x: 0.38050321921509545, y: 0.23441437973603454, z: 0.08138789474423284, roll: -0.37311437726020813, pitch: -1.57063627243042, yaw: -1.9537924528121948};
  private static INTERMEDIATE_4: Position = {x: 0.3286295824464868, y: 0.23566699165505514, z: 0.10536654134102755, roll: -0.6451488137245178, pitch: -1.5706204175949097, yaw: -2.2258057594299316};
  private static INTERMEDIATE_5: Position = {x: 0.11262112382606669, y: 0.23312658308891226, z: 0.07739492402679102, roll: -0.9316279888153076, pitch: -1.5705748796463013, yaw: -2.5521202087402344};


  private static AFTER_1: Position = {x: 0.15604940096977124, y: 0.23419585352642114, z: 0.08073674521967197, roll: -1.2223237752914429, pitch: -1.570696234703064, yaw: -2.8430614471435547};
  private static AFTER_2: Position = {x: 0.22100127033555414, y: 0.23518418227054227, z: 0.08721955112390051, roll: -0.29821401834487915, pitch: -1.57072114944458, yaw: -1.9189320802688599};


  run(service: RobotService): Observable<any> {
    return service.openGripper().flatMap(() =>
      service.setPose(Program2.HOME_POSE, Program2.SPEED)
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
      service.runPositions([Program2.AFTER_1, Program2.AFTER_2, Program2.BEFORE_HOME], Program2.SPEED)
    ).flatMap(() =>
      service.setPose(Program2.HOME_POSE, Program2.SPEED)
    );
  }
  //
  // run(service: RobotService): Observable<any> {
  //   return service.openGripper().flatMap(() =>
  //     service.setPose(Program2.HOME_POSE, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.setPose(
  //         {
  //           a1: 14.997405856120064,
  //           a2: 68.2269839776679,
  //           a3: -37.50090447475497,
  //           a4: -103.24806881853134,
  //           a5: 179.9999991013494,
  //           a6: -22.499999775337315
  //         }, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 30.845182928819213,
  //         a2: 28.142839603472382,
  //         a3: -13.718507260554617,
  //         a4: -169.5297825672719,
  //         a5: 291.218442613269,
  //         a6: -20.124980764574676
  //       }, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 16.46478311974275,
  //         a2: 20.34048590777345,
  //         a3: -32.97891454415329,
  //         a4: -143.55810409739604,
  //         a5: 278.563568457438,
  //         a6: -2.2783953132309946
  //       }, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.setPose(
  //         {
  //           a1: 9.809113143385202,
  //           a2: 1.0849009150537086,
  //           a3: -53.745820571379525,
  //           a4: -119.26595961300458,
  //           a5: 268.362076125766,
  //           a6: -1.3816377658443075
  //         }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //         {
  //           a1: 6.048337714839326,
  //           a2: -8.597505043318023,
  //           a3: -77.53466407335415,
  //           a4: -93.86902226186157,
  //           a5: 263.9496918770008,
  //           a6: -0.5713966724407469
  //         }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //         {
  //           a1: 6.047669278892911,
  //           a2: -30.077821048898347,
  //           a3: -45.88030747443813,
  //           a4: -104.04440536962993,
  //           a5: 263.9544982679778,
  //           a6: -0.5720849535519799
  //         }, Program2.SPEED
  //     )
  //   ).flatMap(() => service.openGripper()).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 7.192403321710102,
  //         a2: -28.70075143704435,
  //         a3: -62.41692586678237,
  //         a4: -88.88418414522158,
  //         a5: 262.80221062634706,
  //         a6: -0.572764403226995
  //       },
  //       Program2.SPEED
  //     )
  //   ).flatMap(() => service.closeGripper()).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 7.189868653816247,
  //         a2: -18.60013213147409,
  //         a3: -78.28279340225974,
  //         a4: -83.11341368237707,
  //         a5: 262.8026876336495,
  //         a6: -0.573459145918621
  //       },
  //       Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 4.587158036441151,
  //         a2: 4.190578632188437,
  //         a3: -61.56054166179255,
  //         a4: -122.6360209052034,
  //         a5: 265.4122466224216,
  //         a6: -0.5713987963712609
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 27.776549330753703,
  //         a2: 11.547978556194675,
  //         a3: -44.999336712682876,
  //         a4: -146.56218830692924,
  //         a5: 242.22834753315573,
  //         a6: -0.5720841113227596
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 37.647766287331486,
  //         a2: 11.98675820875294,
  //         a3: -17.156544888106144,
  //         a4: -174.84099953903637,
  //         a5: 232.34889257741074,
  //         a6: -0.5727747527246424
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 41.4284664233482,
  //         a2: 30.619566926854347,
  //         a3: -49.8696892403236,
  //         a4: -160.7606210032884,
  //         a5: 228.5654752001144,
  //         a6: -0.5720902467069762
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 66.50750597992173,
  //         a2: 57.734510044080054,
  //         a3: -111.55242864867293,
  //         a4: -126.20108312853627,
  //         a5: 203.48231397637417,
  //         a6: -2.864788783899886
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() => service.openGripper()).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 59.7296130943743,
  //         a2: 53.72587570885221,
  //         a3: -102.39602830161623,
  //         a4: -131.33374013821987,
  //         a5: 210.2649981451081,
  //         a6: -2.864790770207157
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 51.47338886792254,
  //         a2: 46.729645672771476,
  //         a3: -86.53106757982411,
  //         a4: -140.2051993143143,
  //         a5: 218.52534486122929,
  //         a6: -2.8654864007002274
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 32.296425502717945,
  //         a2: 71.58867437468822,
  //         a3: -55.45539209029695,
  //         a4: -16.10605131896814,
  //         a5: 179.29336477946336,
  //         a6: -55.03839976630644
  //       }, Program2.SPEED
  //     )
  //   ).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 0.0035214792028028796,
  //         a2: 90.0124654572643,
  //         a3: -0.025417189926969286,
  //         a4: -89.98203032478939,
  //         a5: 90.0028814599054,
  //         a6: -0.00010760843667867448
  //       },  Program2.SPEED
  //     )
  //   );
  // }

  // run(service: RobotService): Observable<any> {
  //   return service.openGripper().flatMap(() =>
  //     service.setPose(Program2.HOME_POSE, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.runPoses(
  //       [
  //         {
  //           a1: 14.997405856120064,
  //           a2: 68.2269839776679,
  //           a3: -37.50090447475497,
  //           a4: -103.24806881853134,
  //           a5: 179.9999991013494,
  //           a6: -22.499999775337315
  //         },
  //         {
  //           a1: 30.845182928819213,
  //           a2: 28.142839603472382,
  //           a3: -13.718507260554617,
  //           a4: -169.5297825672719,
  //           a5: 291.218442613269,
  //           a6: -20.124980764574676
  //         },
  //         {
  //           a1: 16.46478311974275,
  //           a2: 20.34048590777345,
  //           a3: -32.97891454415329,
  //           a4: -143.55810409739604,
  //           a5: 278.563568457438,
  //           a6: -2.2783953132309946
  //         },
  //         {
  //           a1: 9.809113143385202,
  //           a2: 1.0849009150537086,
  //           a3: -53.745820571379525,
  //           a4: -119.26595961300458,
  //           a5: 268.362076125766,
  //           a6: -1.3816377658443075
  //         },
  //         // {
  //         //   a1: 6.048337714839326,
  //         //   a2: -8.597505043318023,
  //         //   a3: -77.53466407335415,
  //         //   a4: -93.86902226186157,
  //         //   a5: 263.9496918770008,
  //         //   a6: -0.5713966724407469
  //         // },
  //         {
  //           a1: 6.047669278892911,
  //           a2: -30.077821048898347,
  //           a3: -45.88030747443813,
  //           a4: -104.04440536962993,
  //           a5: 263.9544982679778,
  //           a6: -0.5720849535519799
  //         }
  //       ],
  //       Program2.SPEED
  //     )
  //   ).flatMap(() => service.openGripper()).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 7.192403321710102,
  //         a2: -28.70075143704435,
  //         a3: -62.41692586678237,
  //         a4: -88.88418414522158,
  //         a5: 262.80221062634706,
  //         a6: -0.572764403226995
  //       },
  //       Program2.SPEED
  //     )
  //   ).flatMap(() => service.closeGripper()).flatMap(() =>
  //     service.setPose(
  //       {
  //         a1: 7.189868653816247,
  //         a2: -18.60013213147409,
  //         a3: -78.28279340225974,
  //         a4: -83.11341368237707,
  //         a5: 262.8026876336495,
  //         a6: -0.573459145918621
  //       },
  //       Program2.SPEED
  //     )
  //   ).flatMap(() => service.runPoses(
  //     [
  //       {
  //         a1: 4.587158036441151,
  //         a2: 4.190578632188437,
  //         a3: -61.56054166179255,
  //         a4: -122.6360209052034,
  //         a5: 265.4122466224216,
  //         a6: -0.5713987963712609
  //       },
  //       {
  //         a1: 27.776549330753703,
  //         a2: 11.547978556194675,
  //         a3: -44.999336712682876,
  //         a4: -146.56218830692924,
  //         a5: 242.22834753315573,
  //         a6: -0.5720841113227596
  //       },
  //       {
  //         a1: 37.647766287331486,
  //         a2: 11.98675820875294,
  //         a3: -17.156544888106144,
  //         a4: -174.84099953903637,
  //         a5: 232.34889257741074,
  //         a6: -0.5727747527246424
  //       },
  //       {
  //         a1: 41.4284664233482,
  //         a2: 30.619566926854347,
  //         a3: -49.8696892403236,
  //         a4: -160.7606210032884,
  //         a5: 228.5654752001144,
  //         a6: -0.5720902467069762
  //       },
  //       {
  //         a1: 66.50750597992173,
  //         a2: 57.734510044080054,
  //         a3: -111.55242864867293,
  //         a4: -126.20108312853627,
  //         a5: 203.48231397637417,
  //         a6: -2.864788783899886
  //       }
  //     ],
  //     Program2.SPEED
  //   )).flatMap(() => service.openGripper()).flatMap(() => service.runPoses(
  //     [
  //       {
  //         a1: 59.7296130943743,
  //         a2: 53.72587570885221,
  //         a3: -102.39602830161623,
  //         a4: -131.33374013821987,
  //         a5: 210.2649981451081,
  //         a6: -2.864790770207157
  //       },
  //       {
  //         a1: 51.47338886792254,
  //         a2: 46.729645672771476,
  //         a3: -86.53106757982411,
  //         a4: -140.2051993143143,
  //         a5: 218.52534486122929,
  //         a6: -2.8654864007002274
  //       },
  //       {
  //         a1: 32.296425502717945,
  //         a2: 71.58867437468822,
  //         a3: -55.45539209029695,
  //         a4: -16.10605131896814,
  //         a5: 179.29336477946336,
  //         a6: -55.03839976630644
  //       },
  //       {
  //         a1: 0.0035214792028028796,
  //         a2: 90.0124654572643,
  //         a3: -0.025417189926969286,
  //         a4: -89.98203032478939,
  //         a5: 90.0028814599054,
  //         a6: -0.00010760843667867448
  //       }
  //     ],
  //     Program2.SPEED
  //   ));
  // }

  // run(service: RobotService): Observable<any> {
  //   return service.openGripper().flatMap(() =>
  //     service.setPose(Program2.HOME_POSE, Program2.SPEED)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.BEFORE_6)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.BEFORE_5)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.BEFORE_4)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.BEFORE_3)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.BEFORE_2)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.BEFORE_1)
  //   ).flatMap(() =>
  //     service.openGripper()
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.TAKE_1)
  //   ).flatMap(() =>
  //     service.closeGripper()
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.LIFT_1)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.INTERMEDIATE_1)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.INTERMEDIATE_2)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.INTERMEDIATE_3)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.INTERMEDIATE_4)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.INTERMEDIATE_5)
  //   ).flatMap(() =>
  //     service.openGripper()
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.AFTER_1)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.AFTER_2)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.BEFORE_HOME)
  //   ).flatMap(() =>
  //     this.setPosition(service, Program2.HOME)
  //   );
  // }
  //
  // private setPosition(service: RobotService, position: Position): Observable<any> {
  //   return service.setPosition(position, Program2.SPEED).flatMap(() => service.getPose()).do(pose => console.log(pose));
  // }

}
