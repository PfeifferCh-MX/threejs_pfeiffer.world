//if (typeof p2r !== 'undefined') {p2r = "earth";}

// =========================
// DEFAULTWERTE
// =========================

var P2DM = 0.2;
var P3DM = 0;
var P4DM = 0;
var P5DM = 0;
var P6DM = 0;
var P7DM = 0;
var P8DM = 0;
var P9DM = 0;

var P2Abst = 195;
var P3Abst = 240;
var P4Abst = 240;
var P5Abst = 240;
var P6Abst = 240;
var P7Abst = 240;
var P8Abst = 240;
var P9Abst = 240;

var scalingfactor = 1;
var artisatani = "inactive";
var cameraposition = 700;

// Orbitgeschwindigkeiten
var P2Speed = 0.6;
var P3Speed = 0.4;
var P4Speed = 0.3;
var P5Speed = 0.24;
var P6Speed = 0.13;
var P7Speed = 0.09;
var P8Speed = 0.06;
var P9Speed = 0.05;

// =========================
// MODI
// =========================

if (p2r === "earth") {

    var P1 = 'earth';
    var P2 = 'moon';

    P2DM = 0.27;
    P2Abst = 120;
    P2Speed = 0.45;

    cameraposition = 700;
    artisatani = "active";

} else if (p2r === "sun") {

    var P1 = 'sun';
    var P2 = 'earth';

    P2DM = 0.18;
    P2Abst = 260;
    P2Speed = 0.15;

    artisatani = "inactive";
    cameraposition = 700;

} else if (p2r === "solarsystem") {

    var P1 = 'sun';

    var P2 = 'mercury';
    P2DM = 0.007;
    P2Abst = 100;
    P2Speed = 1.2;

    var P3 = 'venus_atmosphere';
    P3DM = 0.0174;
    P3Abst = 170;
    P3Speed = 0.9;

    var P4 = 'earth';
    P4DM = 0.0183;
    P4Abst = 260;
    P4Speed = 0.75;

    var P5 = 'mars';
    P5DM = 0.0098;
    P5Abst = 340;
    P5Speed = 0.55;

    var P6 = 'jupiter';
    P6DM = 0.2053;
    P6Abst = 500;
    P6Speed = 0.25;

    var P7 = 'saturn';
    P7DM = 0.1731;
    P7Abst = 700;
    P7Speed = 0.18;

    var P8 = 'uranus';
    P8DM = 0.0734;
    P8Abst = 900;
    P8Speed = 0.12;

    var P9 = 'neptune';
    P9DM = 0.0711;
    P9Abst = 1100;
    P9Speed = 0.08;

    scalingfactor = 1.20;
    artisatani = "inactive";
    cameraposition = 2400;

} else {

    var P1 = 'sun';
    var P2 = 'earth';

    artisatani = "active";
    cameraposition = 700;
}

// =========================
// TAG / NACHT
// =========================

var jetzt = new Date().getHours();

if (jetzt >= 5 && jetzt <= 20) {
    bild = 'day';
} else {
    bild = 'night';
}
