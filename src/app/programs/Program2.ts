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
  private static HOME: Position = {
    x: 0.027305309361239316,
    y: 0.08149639068657356,
    z: 0.8884717275149439,
    roll: -0.12697279453277588,
    pitch: 1.5707080364227295,
    yaw: 1.6977672576904297
  };
  private static BEFORE_HOME: Position = {
    x: 0.49,
    y: 0.53,
    z: 0.72,
    roll: 1.5707893371582031,
    pitch: 0.5760120749473572,
    yaw: -0.9601222276687622
  };

  private static BEFORE_6 = {
    x: 0.7326028706121241,
    y: 0.5138693386044813,
    z: 0.6482596496122165,
    roll: 1.5708247423171997,
    pitch: 0.26176273822784424,
    yaw: -1.6584539413452148
  };
  private static BEFORE_5 = {
    x: 0.6999806859386853,
    y: 0.13496042190050736,
    z: 0.12994753279288435,
    roll: -1.0855990648269653,
    pitch: 0.5709368586540222,
    yaw: -0.7952250242233276
  };
  private static BEFORE_4 = {
    x: 0.6499521204012888,
    y: 0.11498020772913073,
    z: -0.010042814797695393,
    roll: -0.7855545878410339,
    pitch: 0.9709660410881042,
    yaw: -0.7952607870101929
  };
  private static BEFORE_3 = {
    x: 0.49995924380240325,
    y: 0.11502874491760792,
    z: -0.16001955422957148,
    roll: -0.7856265306472778,
    pitch: 1.3708958625793457,
    yaw: -0.7951730489730835
  };
  private static BEFORE_2 = {
    x: 0.3499944201113013,
    y: 0.11503640229013261,
    z: -0.21000763619716456,
    roll: 2.1121585369110107,
    pitch: 1.570756196975708,
    yaw: 2.5902554988861084
  };
  private static BEFORE_1 = {
    x: 0.34997829089280746,
    y: 0.11500773038544511,
    z: -0.3100048852658574,
    roll: -2.4312047958374023,
    pitch: 1.5707383155822754,
    yaw: 0.8504190444946289
  };


  private static TAKE_1: Position = {
    x: Program2.TAKE_X,
    y: Program2.TAKE_Y,
    z: Program2.TAKE_Z,
    roll: 1.9011156558990479,
    pitch: 1.5706969499588013,
    yaw: 2.8012726306915283
  };

  private static LIFT_1: Position = {
    x: Program2.TAKE_X,
    y: Program2.TAKE_Y,
    z: Program2.TAKE_Z + 0.05,
    roll: 1.116859793663025,
    pitch: 1.5706517696380615,
    yaw: -2.6976568698883057
  };

  private static INTERMEDIATE_1: Position = {
    x: 0.4499705336047264,
    y: 0.11503206709716879,
    z: -0.11001107507392856,
    roll: 3.0421082973480225,
    pitch: 1.570691704750061,
    yaw: 1.66029953956604
  };
  private static INTERMEDIATE_2: Position = {
    x: 0.499946032201325,
    y: 0.3149745918064969,
    z: -0.010036289531137188,
    roll: -2.7537877559661865,
    pitch: 1.5705703496932983,
    yaw: 1.1728965044021606
  };
  private static INTERMEDIATE_3: Position = {
    x: 0.49999004779663875,
    y: 0.41498154651814034,
    z: 0.0899586982148918,
    roll: 2.768613815307617,
    pitch: 1.57063627243042,
    yaw: 1.9336633682250977
  };
  private static INTERMEDIATE_4: Position = {
    x: 0.44999987541629266,
    y: 0.41499526673286397,
    z: 0.12996045482046442,
    roll: 2.496656656265259,
    pitch: 1.5706204175949097,
    yaw: 2.2056233882904053
  };
  private static INTERMEDIATE_5: Position = {
    x: 0.24993082839430064,
    y: 0.41491869516644486,
    z: 0.1299485558973838,
    roll: 2.210239887237549,
    pitch: 1.5705748796463013,
    yaw: 2.4518449306488037
  };


  private static AFTER_1: Position = {
    x: 0.29001069995234174,
    y: 0.41500719780495215,
    z: 0.12998082853881338,
    roll: 1.9199551343917847,
    pitch: 1.570696234703064,
    yaw: 2.742375135421753
  };
  private static AFTER_2: Position = {
    x: 0.34998373455590753,
    y: 0.41500608277437345,
    z: 0.1299823095658358,
    roll: 2.843646764755249,
    pitch: 1.5707210302352905,
    yaw: 1.8186396360397339
  };


  // run(service: RobotService): Observable<any> {
  //   return service.openGripper().flatMap(() =>
  //     service.setPose(Program2.HOME_POSE, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.runPositions([
  //       Program2.BEFORE_6, Program2.BEFORE_5, Program2.BEFORE_4, Program2.BEFORE_3, Program2.BEFORE_2, Program2.BEFORE_1
  //     ], Program2.SPEED)
  //   ).flatMap(() =>
  //     service.openGripper()
  //   ).flatMap(() =>
  //     service.setPosition(Program2.TAKE_1, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.closeGripper()
  //   ).flatMap(() =>
  //     service.setPosition(Program2.LIFT_1, Program2.SPEED)
  //   ).flatMap(() =>
  //     service.runPositions([
  //       Program2.INTERMEDIATE_1, Program2.INTERMEDIATE_2, Program2.INTERMEDIATE_3, Program2.INTERMEDIATE_4, Program2.INTERMEDIATE_5
  //     ], Program2.SPEED)
  //   ).flatMap(() =>
  //     service.openGripper()
  //   ).flatMap(() =>
  //     service.runPositions([Program2.AFTER_1, Program2.AFTER_2, Program2.BEFORE_HOME, Program2.HOME], Program2.SPEED)
  //   );
  // }

  run(service: RobotService): Observable<any> {
    return service.openGripper().flatMap(() =>
      service.setPose(Program2.HOME_POSE, Program2.SPEED)
    ).flatMap(() =>
      service.runPoses(
        [
          {
            a1: 14.997405856120064,
            a2: 68.2269839776679,
            a3: -37.50090447475497,
            a4: -103.24806881853134,
            a5: 179.9999991013494,
            a6: -22.499999775337315
          },
          {
            a1: 30.845182928819213,
            a2: 28.142839603472382,
            a3: -13.718507260554617,
            a4: -169.5297825672719,
            a5: 291.218442613269,
            a6: -20.124980764574676
          },
          {
            a1: 16.46478311974275,
            a2: 20.34048590777345,
            a3: -32.97891454415329,
            a4: -143.55810409739604,
            a5: 278.563568457438,
            a6: -2.2783953132309946
          },
          {
            a1: 9.809113143385202,
            a2: 1.0849009150537086,
            a3: -53.745820571379525,
            a4: -119.26595961300458,
            a5: 268.362076125766,
            a6: -1.3816377658443075
          },
          // {
          //   a1: 6.048337714839326,
          //   a2: -8.597505043318023,
          //   a3: -77.53466407335415,
          //   a4: -93.86902226186157,
          //   a5: 263.9496918770008,
          //   a6: -0.5713966724407469
          // },
          {
            a1: 6.047669278892911,
            a2: -30.077821048898347,
            a3: -45.88030747443813,
            a4: -104.04440536962993,
            a5: 263.9544982679778,
            a6: -0.5720849535519799
          }
        ],
        Program2.SPEED
      )
    ).flatMap(() => service.openGripper()).flatMap(() =>
      service.setPose(
        {
          a1: 7.192403321710102,
          a2: -28.70075143704435,
          a3: -62.41692586678237,
          a4: -88.88418414522158,
          a5: 262.80221062634706,
          a6: -0.572764403226995
        },
        Program2.SPEED
      )
    ).flatMap(() => service.closeGripper()).flatMap(() =>
      service.setPose(
        {
          a1: 7.189868653816247,
          a2: -18.60013213147409,
          a3: -78.28279340225974,
          a4: -83.11341368237707,
          a5: 262.8026876336495,
          a6: -0.573459145918621
        },
        Program2.SPEED
      )
    ).flatMap(() => service.runPoses(
      [
        {
          a1: 4.587158036441151,
          a2: 4.190578632188437,
          a3: -61.56054166179255,
          a4: -122.6360209052034,
          a5: 265.4122466224216,
          a6: -0.5713987963712609
        },
        {
          a1: 27.776549330753703,
          a2: 11.547978556194675,
          a3: -44.999336712682876,
          a4: -146.56218830692924,
          a5: 242.22834753315573,
          a6: -0.5720841113227596
        },
        {
          a1: 37.647766287331486,
          a2: 11.98675820875294,
          a3: -17.156544888106144,
          a4: -174.84099953903637,
          a5: 232.34889257741074,
          a6: -0.5727747527246424
        },
        {
          a1: 41.4284664233482,
          a2: 30.619566926854347,
          a3: -49.8696892403236,
          a4: -160.7606210032884,
          a5: 228.5654752001144,
          a6: -0.5720902467069762
        },
        {
          a1: 66.50750597992173,
          a2: 57.734510044080054,
          a3: -111.55242864867293,
          a4: -126.20108312853627,
          a5: 203.48231397637417,
          a6: -2.864788783899886
        }
      ],
      Program2.SPEED
    )).flatMap(() => service.openGripper()).flatMap(() => service.runPoses(
      [
        {
          a1: 59.7296130943743,
          a2: 53.72587570885221,
          a3: -102.39602830161623,
          a4: -131.33374013821987,
          a5: 210.2649981451081,
          a6: -2.864790770207157
        },
        {
          a1: 51.47338886792254,
          a2: 46.729645672771476,
          a3: -86.53106757982411,
          a4: -140.2051993143143,
          a5: 218.52534486122929,
          a6: -2.8654864007002274
        },
        {
          a1: 32.296425502717945,
          a2: 71.58867437468822,
          a3: -55.45539209029695,
          a4: -16.10605131896814,
          a5: 179.29336477946336,
          a6: -55.03839976630644
        },
        {
          a1: 0.0035214792028028796,
          a2: 90.0124654572643,
          a3: -0.025417189926969286,
          a4: -89.98203032478939,
          a5: 90.0028814599054,
          a6: -0.00010760843667867448
        }
      ],
      Program2.SPEED
    ));
  }

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
