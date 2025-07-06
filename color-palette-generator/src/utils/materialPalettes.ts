import type { ColorLAB, ColorRGBA, PaletteMatch } from '../types/color';
import { createColorLAB, createColorRGBA, createColorLCH, clampValue } from './colorClasses';
import { convertLabToLch, convertRgbToLab, delinearizeColorValue, denormalizeLab } from './colorConversions';

/** Material Design color palettes in LAB color space */
export const MATERIAL_PALETTES: ColorLAB[][] = [
  [createColorLAB(94.67497003305085, 7.266715066863771, 1.000743882272359), createColorLAB(86.7897416761699, 18.370736761658012, 4.23637133971424), createColorLAB(72.0939162832561, 31.7948058298117, 13.2972443996896), createColorLAB(61.79353370051851, 44.129498163764545, 20.721477326799608), createColorLAB(57.194195398949574, 59.6450006197361, 34.999830012940194), createColorLAB(55.603951071861374, 66.01287384845483, 47.67169313982772), createColorLAB(51.66348502954747, 64.7487785020625, 43.244876694855286), createColorLAB(47.09455666350969, 62.29836039074277, 40.67775424698388), createColorLAB(43.77122063388739, 60.28633509183384, 40.31444686692952), createColorLAB(39.555187078007386, 58.703681355389975, 41.66495027798629)],
  [createColorLAB(92.68053776327665, 9.515385232804263, -0.8994072969754852), createColorLAB(81.86756643628922, 25.05688089723257, -1.9475235115390621), createColorLAB(70.90987389545768, 42.21705257720526, -1.095154624057959), createColorLAB(61.08140805216186, 58.871233307587204, 2.1008764804626434), createColorLAB(54.97970219986448, 68.56530938366889, 7.327430728560569), createColorLAB(50.872250340749176, 74.60459195925529, 15.353576256896073), createColorLAB(47.27738650144558, 70.77855776427805, 11.70434273264508), createColorLAB(42.58424189486517, 65.5411953138309, 7.595596439803797), createColorLAB(37.977492407254836, 60.74362621842075, 2.9847124951453474), createColorLAB(29.699290034849604, 51.90485023721311, -4.830186634107636)],
  [createColorLAB(92.4362655169016, 7.542927467702299, -6.039842848605881), createColorLAB(81.07399776904751, 19.563870217805036, -15.719625491986044), createColorLAB(68.71394717711831, 33.79992812490556, -26.49539972339321), createColorLAB(56.596161226236305, 47.5856631835152, -36.480816605410915), createColorLAB(48.002791217624434, 57.30866443934879, -43.2561127152548), createColorLAB(40.66211534692161, 64.01910773818436, -48.05930162591041), createColorLAB(37.690702208992185, 61.13762767732481, -49.384803274243026), createColorLAB(33.56291870731981, 57.637381239254104, -51.39557249855828), createColorLAB(29.865391314234515, 54.29737439901333, -52.6601973712463), createColorLAB(23.16724235420436, 48.51764437280498, -55.16267949015293)],
  [createColorLAB(92.49103426017201, 4.712320025752947, -6.532868071709763), createColorLAB(81.24668319505597, 11.50642734909485, -16.666600637245367), createColorLAB(68.61488216554629, 20.395329051982824, -28.522018851715416), createColorLAB(55.60369793053023, 30.933537768905005, -41.16439122358484), createColorLAB(45.834566190969426, 39.28806272235674, -50.523322052772635), createColorLAB(36.608620229358664, 47.29686002828143, -59.111766586186846), createColorLAB(34.189791237562616, 46.60426065139123, -59.53961627676729), createColorLAB(30.52713367338361, 46.01498224754519, -60.19975052509064), createColorLAB(27.44585524877222, 44.96180431854785, -60.46395810756433), createColorLAB(21.98627670328218, 44.29296076245473, -60.93653655172098)],
  [createColorLAB(92.86314411983918, 1.5318147061061937, -6.025243528950552), createColorLAB(81.8348073705298, 4.460934955458907, -15.873561009736136), createColorLAB(69.7796913795672, 7.9043652558912765, -26.3170846346932), createColorLAB(57.48786519938736, 12.681019504822533, -37.23202012914528), createColorLAB(47.74592578811101, 18.520799302452374, -46.47540679000397), createColorLAB(38.334403614455404, 25.57700668170812, -55.28224153299287), createColorLAB(35.15116453901552, 26.231812080381168, -54.53700978785404), createColorLAB(31.080429988007957, 27.07394930110124, -53.97505274579958), createColorLAB(27.026672080454922, 28.165266427558983, -53.28987325482218), createColorLAB(19.751201587921678, 30.60784576895101, -52.13866519297474)],
  [createColorLAB(94.70682457348717, -2.835484735987326, -6.978044694792707), createColorLAB(86.8839842970016, -5.16908728759552, -17.88561192754956), createColorLAB(79.0451532401558, -6.817753527015746, -28.968537490432176), createColorLAB(71.15083697242613, -5.994763756850707, -39.72549451158927), createColorLAB(65.48106058907833, -2.735745792537936, -48.15471238926561), createColorLAB(60.43009440850862, 2.079928897321559, -55.10935847069616), createColorLAB(55.62267676922188, 4.998684384486918, -55.02164729429915), createColorLAB(49.27006645904875, 8.470398370314381, -54.494796838457546), createColorLAB(43.16828856394358, 11.968483076143844, -53.972567377977974), createColorLAB(32.17757793894193, 18.96054990229354, -53.45146365049088)],
  [createColorLAB(95.35713467762652, -4.797149155388203, -6.550002550504308), createColorLAB(88.27942649540043, -10.836006614583892, -16.359361821940375), createColorLAB(81.10009044900976, -15.323054522981716, -26.419121191320947), createColorLAB(74.44713958259777, -16.664432625362547, -35.19702686900037), createColorLAB(69.87836465637318, -14.291515332054693, -41.827430329755174), createColorLAB(65.68851259178913, -9.612635721963692, -47.34091616039191), createColorLAB(60.88357994308973, -7.252819027184943, -46.67753731595634), createColorLAB(54.26166495426166, -3.8141836897908066, -45.97939475762498), createColorLAB(48.10661895072673, -1.378998784464347, -44.34466750206778), createColorLAB(36.34401147057282, 5.067812404713545, -43.11786257561915)],
  [createColorLAB(95.69295154599753, -6.898716127301141, -3.994284229654421), createColorLAB(89.52842524059004, -16.412398289601725, -9.260466069266693), createColorLAB(83.32031214655748, -24.83036840728098, -14.568673583304603), createColorLAB(77.35338313752958, -30.201708572215104, -18.92358284721101), createColorLAB(73.45322093857781, -31.88590390189383, -21.130459992513686), createColorLAB(69.97638465064783, -30.679850324547953, -23.186685661136707), createColorLAB(64.44491716553777, -29.08337434584457, -21.154935769156214), createColorLAB(56.99816432961103, -27.31081477279451, -17.86988815767443), createColorLAB(49.75464182255671, -25.335383503694242, -15.024722591662787), createColorLAB(36.52725894264432, -22.129641744194515, -9.176159146894303)],
  [createColorLAB(94.18453941589918, -6.08351703428972, -1.5488916051161983), createColorLAB(85.68177077414457, -15.333179440298606, -2.8519825761476048), createColorLAB(76.85067847190405, -24.844059173189713, -3.8750785132192656), createColorLAB(68.02762242570138, -32.566861154120716, -4.015231084407134), createColorLAB(61.667257304525464, -36.06752603289354, -3.4734046401753815), createColorLAB(55.67310397390196, -36.66069960626328, -2.125617915169653), createColorLAB(51.059149495197715, -34.65019160301408, -1.3910484300432513), createColorLAB(45.269081019218405, -32.13244775422941, -0.4526371852697775), createColorLAB(39.36899076059384, -29.25264468583161, -0.03562564673170732), createColorLAB(28.58363043701477, -24.585465516136413, 1.8037402162492389)],
  [createColorLAB(95.30530183565223, -6.430415645739263, 4.292950594459599), createColorLAB(88.49014579152143, -15.23147744952702, 10.848261177683138), createColorLAB(81.22616870575376, -24.993886168551583, 18.144696803330884), createColorLAB(74.30361721558802, -35.56088696067356, 26.781515251907727), createColorLAB(69.0430995277442, -42.61556126595995, 33.17109563126665), createColorLAB(63.977421814072926, -48.54292673319982, 39.73241526342939), createColorLAB(58.777960853461366, -46.1153692478013, 37.838910745225576), createColorLAB(52.41108688974904, -43.21761792485762, 35.62250659009424), createColorLAB(46.2813873076426, -40.25816227675361, 33.32343229338761), createColorLAB(34.685655305814514, -34.75343878510312, 28.866739034359767)],
  [createColorLAB(96.70518169355954, -4.929987845095463, 6.397084523168894), createColorLAB(91.66416061199438, -12.057032041945693, 16.054604579275143), createColorLAB(86.2244395865449, -19.613646834080622, 26.384906423454236), createColorLAB(80.83404879636919, -27.080171840756893, 37.378493742021334), createColorLAB(76.79543725108964, -32.76659719736752, 45.912190572444445), createColorLAB(72.90025297028019, -37.549139223927384, 53.51959496103027), createColorLAB(67.21532310272079, -36.56304870773486, 50.49629051268894), createColorLAB(59.91051142210195, -35.77011466063357, 46.56465847976187), createColorLAB(52.51015841084511, -34.47903440699235, 42.20723868724268), createColorLAB(39.41191983353878, -32.80460974352642, 35.255490585630014)],
  [createColorLAB(97.99506057883428, -4.059632482741494, 9.355797602381521), createColorLAB(94.80926235976536, -9.237091467352855, 23.230650064824985), createColorLAB(91.85205843526167, -15.053917327011114, 38.86115182206598), createColorLAB(88.75812142080242, -19.542900400164097, 53.71785675783709), createColorLAB(86.27404180729515, -22.173992891121596, 63.978639065232514), createColorLAB(84.20566835376492, -24.270643520989342, 72.79624067033038), createColorLAB(78.27915100603997, -21.181850056402496, 68.82763412297965), createColorLAB(70.82385811892824, -17.788148932525672, 64.00327817988128), createColorLAB(62.936867012868035, -13.697412111684903, 58.513000509287835), createColorLAB(49.498610881452535, -6.485230564384715, 49.67432722833751)],
  [createColorLAB(98.93885129752759, -3.0098470288543178, 10.765736833790008), createColorLAB(97.22689784824074, -6.174599368734491, 26.22932417355146), createColorLAB(95.58092947828766, -8.907132848473886, 43.56297291446567), createColorLAB(94.09009515702486, -10.509628942710735, 60.20019514231188), createColorLAB(93.06546746683087, -11.008558476013008, 71.76500826005477), createColorLAB(92.12975017760128, -10.830023094868302, 80.9090559640089), createColorLAB(87.12188349168609, -2.3764300099239355, 78.14868195373407), createColorLAB(80.96200442419905, 8.849333792729064, 75.05050700092679), createColorLAB(75.00342770718086, 20.340173566879283, 72.24841925958934), createColorLAB(65.48207757431567, 39.647064970476094, 68.34872841768654)],
  [createColorLAB(97.5642392074337, -1.445525639405032, 11.881254316297674), createColorLAB(93.67057953749456, -1.8693096862072434, 30.02888670415651), createColorLAB(89.94571492804107, -1.0224503814769692, 49.649542361642276), createColorLAB(86.71009164153801, 1.0496066396428194, 68.77377342409739), createColorLAB(83.78773993319211, 5.248231820098425, 78.92920457852716), createColorLAB(81.52191382080228, 9.403655370707199, 82.69257112982746), createColorLAB(78.17240973804697, 16.628512886531887, 81.09358318806208), createColorLAB(73.80899654381052, 26.53614315250874, 78.21754052181723), createColorLAB(70.1134511665764, 35.3007623359744, 75.87510992138593), createColorLAB(63.86460405565717, 50.94648214505959, 72.17815682124423)],
  [createColorLAB(96.30459517801387, 0.923151172282477, 10.598439446083074), createColorLAB(90.68320082865087, 4.103774964681062, 26.485793721916128), createColorLAB(85.00055287186233, 9.047181758866651, 44.51407622580792), createColorLAB(79.42428495742953, 16.452610724439875, 62.08721739074201), createColorLAB(75.47792699289774, 23.395742928451867, 72.64347611236501), createColorLAB(72.04246561548388, 30.681921012382098, 77.08579298904603), createColorLAB(68.94724338946975, 35.22014778433863, 74.88425044595111), createColorLAB(64.83017495535229, 40.91200730099703, 71.9596053545428), createColorLAB(60.8534207471871, 46.41483590510681, 69.18061963415211), createColorLAB(54.77571742962287, 55.282751019360035, 65.10193403547922)],
  [createColorLAB(93.69219844671957, 5.763979334358293, 3.1700162796469034), createColorLAB(86.04629434276428, 15.750843803958192, 14.828476927090994), createColorLAB(77.54010042938336, 27.90113842540043, 25.99645229289065), createColorLAB(69.74095456707857, 41.14487377552256, 39.443320178900024), createColorLAB(64.37085344539341, 51.890379620443575, 50.81312471046415), createColorLAB(60.06780837277435, 61.65258736118817, 61.54771829165221), createColorLAB(57.28707915232363, 60.3250664308812, 60.07341536376447), createColorLAB(53.810052616293845, 58.36760943780162, 58.19586806694884), createColorLAB(50.301352405105874, 56.40104898089937, 55.924141992404344), createColorLAB(43.86477994548343, 52.970887703910726, 52.30067989225532)],
  [createColorLAB(93.29864888069987, 0.9915456090475727, 1.442353076378411), createColorLAB(82.80884359004081, 3.116221903342209, 3.3523059451463055), createColorLAB(70.95493047668185, 5.469742193344784, 5.449009494553492), createColorLAB(58.712934619103066, 7.990991075363385, 8.352488495367627), createColorLAB(49.150208552875895, 10.570984981000397, 10.831440151197924), createColorLAB(39.63200151837749, 13.138881961627241, 13.531574711511885), createColorLAB(35.600996682015754, 12.40352847757295, 12.10432183902449), createColorLAB(30.084271265759952, 11.317148149878081, 10.547484304296217), createColorLAB(24.555014696416578, 10.816613316782464, 8.506555306791984), createColorLAB(18.35055226514404, 10.225725550338765, 7.058582769882571)],
  [createColorLAB(98.27202740980219, -0.000016418393644634932, 0.000006567357457853973), createColorLAB(96.53749336548567, -0.00001616917905122861, 0.000006467671598286984), createColorLAB(94.0978378987781, -0.00001581865383126768, 0.000006327461532507073), createColorLAB(89.17728373493613, -0.00001511167768697419, 0.000006044671074789676), createColorLAB(76.61119902231323, -0.00001330620591488696, 0.000005322482343750323), createColorLAB(65.11424774127516, -0.000011654345155598378, 0.000004661738062239351), createColorLAB(49.238989620828065, -0.000009373417431124409, 0.0000037493669724497636), createColorLAB(41.14266843804848, -0.000008210152946386273, 0.0000032840611896567395), createColorLAB(27.974857206003705, -0.000006318226192236764, 0.0000025272904768947058), createColorLAB(12.740011331302725, -0.000004129311698131133, 0.0000016517246792524531)],
  [createColorLAB(94.27665212516236, -0.637571046109342, -1.313515378996688), createColorLAB(85.77788001492097, -2.2777811084512822, -3.0177758416151557), createColorLAB(76.12296325015231, -3.401502988883809, -5.16867892977908), createColorLAB(66.16340108908365, -4.819627183079045, -7.520697631614404), createColorLAB(58.35752478513645, -5.7195089100892105, -9.165988916613488), createColorLAB(50.70748082202715, -6.837992965799455, -10.956055112409357), createColorLAB(44.85917867647632, -6.411990559239578, -9.74511982878765), createColorLAB(36.92458930566504, -5.319878610845596, -8.341943474561553), createColorLAB(29.115334784637618, -4.168907828645069, -6.8629962199973304), createColorLAB(19.958338450799914, -3.3116721453186617, -5.4486142104736786)]
];

/** Lightness adjustment values for palette generation */
export const LIGHTNESS_VALUES = [
  2.048875457, 5.124792061, 8.751659557, 12.07628774, 13.91449542,
  15.92738893, 15.46585818, 15.09779227, 15.13738673, 15.09818372
];

/** Chroma adjustment values for palette generation */
export const CHROMA_VALUES = [
  1.762442714, 4.213532634, 7.395827458, 11.07174158, 13.89634504,
  16.37591477, 16.27071136, 16.54160806, 17.35916727, 19.88410864
];

/**
 * Calculates the angle in degrees from a and b components of LAB color space.
 * @param a - The a component of LAB color
 * @param b - The b component of LAB color
 * @returns The angle in degrees (0-360)
 */
function calculateAngle(a: number, b: number): number {
  if (0.0001 > Math.abs(a) && 0.0001 > Math.abs(b)) return 0;
  const angle = 180 * Math.atan2(a, b) / Math.PI;
  return 0 <= angle ? angle : angle + 360;
}

/**
 * Finds the closest palette and color index to a target LAB color using CIEDE2000 color difference.
 * @param targetLab - The target color in LAB color space
 * @param palettes - Array of color palettes to search through (defaults to MATERIAL_PALETTES)
 * @returns An object containing the closest palette and the color index within that palette
 * @throws {Error} When palettes array is empty or invalid
 */
export function findClosestPalette(targetLab: ColorLAB, palettes: ColorLAB[][] = MATERIAL_PALETTES): PaletteMatch {
  if (!palettes.length || !palettes[0].length) {
    throw new Error('Invalid golden palettes');
  }
  
  let minDistance = Infinity;
  let closestPalette = palettes[0];
  let colorIndex = -1;

  for (let paletteIdx = 0; paletteIdx < palettes.length; paletteIdx++) {
    for (let colorIdx = 0; colorIdx < palettes[paletteIdx].length; colorIdx++) {
      const paletteColor = palettes[paletteIdx][colorIdx];

      // CIEDE2000 calculations
      // const deltaL = paletteColor.lightness - targetLab.lightness;
      const c1 = Math.sqrt(Math.pow(paletteColor.a, 2) + Math.pow(paletteColor.b, 2));
      const c2 = Math.sqrt(Math.pow(targetLab.a, 2) + Math.pow(targetLab.b, 2));

      // const h1 = calculateAngle(paletteColor.b, paletteColor.a);
      // const h2 = calculateAngle(targetLab.b, targetLab.a);

      const avgC = (c1 + c2) / 2;
      const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));

      const a1_prime = paletteColor.a * (1 + G);
      const a2_prime = targetLab.a * (1 + G);

      const c1_prime = Math.sqrt(Math.pow(a1_prime, 2) + Math.pow(paletteColor.b, 2));
      const c2_prime = Math.sqrt(Math.pow(a2_prime, 2) + Math.pow(targetLab.b, 2));

      const h1_prime = calculateAngle(paletteColor.b, a1_prime);
      const h2_prime = calculateAngle(targetLab.b, a2_prime);

      const deltaL_prime = paletteColor.lightness - targetLab.lightness;
      const deltaC_prime = c2_prime - c1_prime;

      let deltaH_prime_final: number;
      if (Math.abs(h1_prime - h2_prime) <= 180) {
        deltaH_prime_final = h2_prime - h1_prime;
      } else if (h2_prime > h1_prime) {
        deltaH_prime_final = h2_prime - h1_prime - 360;
      } else {
        deltaH_prime_final = h2_prime - h1_prime + 360;
      }
      deltaH_prime_final = 2 * Math.sqrt(c1_prime * c2_prime) * Math.sin(deltaH_prime_final / 2 * Math.PI / 180);

      const avgL_prime = (paletteColor.lightness + targetLab.lightness) / 2;
      const avgC_prime = (c1_prime + c2_prime) / 2;

      let avgH_prime_temp: number;
      if (Math.abs(h1_prime - h2_prime) <= 180) {
        avgH_prime_temp = (h1_prime + h2_prime) / 2;
      } else if (h1_prime + h2_prime < 360) {
        avgH_prime_temp = (h1_prime + h2_prime + 360) / 2;
      } else {
        avgH_prime_temp = (h1_prime + h2_prime - 360) / 2;
      }

      const T = 1 - 0.17 * Math.cos((avgH_prime_temp - 30) * Math.PI / 180) +
                0.24 * Math.cos((avgH_prime_temp * 2) * Math.PI / 180) +
                0.32 * Math.cos((avgH_prime_temp * 3 + 6) * Math.PI / 180) -
                0.20 * Math.cos((avgH_prime_temp * 4 - 63) * Math.PI / 180);

      const Sl = 1 + ((0.015 * Math.pow(avgL_prime - 50, 2)) / Math.sqrt(20 + Math.pow(avgL_prime - 50, 2)));
      const Sc = 1 + 0.045 * avgC_prime;
      const Sh = 1 + 0.015 * avgC_prime * T;

      const deltaE = Math.sqrt(
        Math.pow(deltaL_prime / Sl, 2) +
        Math.pow(deltaC_prime / Sc, 2) +
        Math.pow(deltaH_prime_final / Sh, 2)
      );

      if (deltaE < minDistance) {
        minDistance = deltaE;
        closestPalette = palettes[paletteIdx];
        colorIndex = colorIdx;
      }
    }
  }
  
  return { closestPalette, colorIndex };
}

/**
 * Generates a complete Material Design color palette from a base color.
 * The function finds the closest Material Design palette to the base color and adjusts
 * all palette colors to match the base color's characteristics while maintaining
 * the relative relationships between palette steps.
 * @param baseColor - The base ColorRGBA to generate a palette from
 * @returns An array of 10 ColorRGBA objects representing the complete palette (50-900 steps)
 */
export function generateColorPalette(baseColor: ColorRGBA): ColorRGBA[] {
  const labColor = convertRgbToLab(baseColor);
  const paletteMatch = findClosestPalette(labColor);
  const palette = paletteMatch.closestPalette;
  const paletteIndex = paletteMatch.colorIndex;

  const baseColorLch = convertLabToLch(palette[paletteIndex]);
  const targetColorLch = convertLabToLch(labColor);

  const isLowChroma = 30 > convertLabToLch(palette[5]).chroma;
  const lightnessDelta = baseColorLch.lightness - targetColorLch.lightness;
  const chromaDelta = baseColorLch.chroma - targetColorLch.chroma;
  const hueDelta = baseColorLch.hue - targetColorLch.hue;
  const baseLightnessFactor = LIGHTNESS_VALUES[paletteIndex];
  const baseChromaFactor = CHROMA_VALUES[paletteIndex];

  let maxLightnessClamping = 100;

  return palette.map((paletteColor, index) => {
    if (paletteColor === palette[paletteIndex]) {
      maxLightnessClamping = Math.max(targetColorLch.lightness - 1.7, 0);
      return baseColor;
    }

    const currentLch = convertLabToLch(paletteColor);

    let adjustedLightness = currentLch.lightness - (LIGHTNESS_VALUES[index] / baseLightnessFactor) * lightnessDelta;
    adjustedLightness = Math.min(adjustedLightness, maxLightnessClamping);

    let adjustedChroma = currentLch.chroma - chromaDelta;
    if (!isLowChroma) {
      adjustedChroma = currentLch.chroma - chromaDelta * Math.min(CHROMA_VALUES[index] / baseChromaFactor, 1.25);
    }
    adjustedChroma = Math.max(0, adjustedChroma);

    const adjustedHue = (currentLch.hue - hueDelta + 360) % 360;

    const adjustedLch = createColorLCH(
      clampValue(adjustedLightness, 0, 100),
      adjustedChroma,
      adjustedHue
    );

    maxLightnessClamping = Math.max(adjustedLch.lightness - 1.7, 0);

    // Convert LCH back to LAB, then XYZ, then RGB
    const hueRadians = adjustedLch.hue * Math.PI / 180;
    const labColorResult = createColorLAB(
      adjustedLch.lightness,
      adjustedLch.chroma * Math.cos(hueRadians),
      adjustedLch.chroma * Math.sin(hueRadians),
      adjustedLch.alpha
    );

    // Convert LAB to XYZ
    const labLightnessNormalized = (labColorResult.lightness + 16) / 116;
    const xyzY = denormalizeLab(labLightnessNormalized);
    const xyzX = denormalizeLab(labLightnessNormalized + labColorResult.a / 500) * 0.95047;
    const xyzZ = denormalizeLab(labLightnessNormalized - labColorResult.b / 200) * 1.08883;

    // Convert XYZ to linear RGB
    let linearR = 3.2404542 * xyzX + -1.5371385 * xyzY + -0.4985314 * xyzZ;
    let linearG = -0.969266 * xyzX + 1.8760108 * xyzY + 0.041556 * xyzZ;
    let linearB = 0.0556434 * xyzX + -0.2040259 * xyzY + 1.0572252 * xyzZ;

    return createColorRGBA(
      clampValue(delinearizeColorValue(linearR), 0, 1),
      clampValue(delinearizeColorValue(linearG), 0, 1),
      clampValue(delinearizeColorValue(linearB), 0, 1),
      labColorResult.alpha
    );
  });
}