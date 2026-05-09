const DEG_TO_RAD = Math.PI / 180;

// =========================
// SCENE
// =========================

const scene = new THREE.Scene();

// =========================
// BACKGROUND
// =========================

const loader = new THREE.TextureLoader();

loader.load(
    'assets/img/bg-' + bild + '.jpg',
    function(texture) {
        scene.background = texture;
    }
);

// =========================
// RENDERER
// =========================

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

document
    .getElementById('globeViz')
    .appendChild(renderer.domElement);

// =========================
// CAMERA
// =========================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.z = cameraposition;

// =========================
// CONTROLS
// =========================

const tbControls =
    new THREE.TrackballControls(
        camera,
        renderer.domElement
    );

tbControls.rotateSpeed = 1.0;
tbControls.zoomSpeed = 1.2;

// Earth-Mode näher begrenzen
if (p2r === "earth") {
    tbControls.minDistance = 180;
} else {
    tbControls.minDistance = 101;
}

// =========================
// LICHTER
// =========================

scene.add(
    new THREE.AmbientLight(0xbbbbbb)
);

const sunLight =
    new THREE.DirectionalLight(
        0xffffff,
        1.2
    );

sunLight.position.set(
    500,
    200,
    300
);

scene.add(sunLight);

// =========================
// PLANET CREATOR
// =========================

function createPlanet(name, scale) {

    if (!name) return null;

    const planet = new ThreeGlobe()
        .globeImageUrl(
            'assets/img/' +
            name +
            '-' +
            bild +
            '.jpg'
        )
        .bumpImageUrl(
            'assets/img/bump-' +
            name +
            '.jpg'
        );

    if (scale > 0) {
        planet.scale.setScalar(
            scale * scalingfactor
        );
    }

    return planet;
}

// =========================
// PLANETEN
// =========================

const Pl1 = createPlanet(P1, 1);

const Pl2 = createPlanet(P2, P2DM);
const Pl3 = createPlanet(P3, P3DM);
const Pl4 = createPlanet(P4, P4DM);
const Pl5 = createPlanet(P5, P5DM);
const Pl6 = createPlanet(P6, P6DM);
const Pl7 = createPlanet(P7, P7DM);
const Pl8 = createPlanet(P8, P8DM);
const Pl9 = createPlanet(P9, P9DM);

// =========================
// ZENTRALES SYSTEM
// =========================

const centerSystem =
    new THREE.Object3D();

scene.add(centerSystem);

centerSystem.add(Pl1);

// =========================
// ORBIT CREATOR
// =========================

function createOrbit(
    planet,
    distance,
    tilt = 0
) {

    if (!planet) return null;

    const orbit =
        new THREE.Object3D();

    orbit.rotation.z =
        THREE.MathUtils.degToRad(tilt);

    centerSystem.add(orbit);

    planet.position.set(
        distance,
        0,
        0
    );

    orbit.add(planet);

    return orbit;
}

// =========================
// ORBITS
// =========================

const orbit2 = createOrbit(
    Pl2,
    P2Abst,
    p2r === "earth"
        ? 5.145
        : 0
);

const orbit3 =
    createOrbit(Pl3, P3Abst);

const orbit4 =
    createOrbit(Pl4, P4Abst);

const orbit5 =
    createOrbit(Pl5, P5Abst);

const orbit6 =
    createOrbit(Pl6, P6Abst);

const orbit7 =
    createOrbit(Pl7, P7Abst);

const orbit8 =
    createOrbit(Pl8, P8Abst);

const orbit9 =
    createOrbit(Pl9, P9Abst);

// =========================
// CLOCK
// =========================

const clock =
    new THREE.Clock();

// =========================
// RESIZE
// =========================

window.addEventListener(
    'resize',
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);

// =========================
// ANIMATION
// =========================

(function animate() {

    requestAnimationFrame(animate);

    const delta =
        clock.getDelta();

    tbControls.update();

    // =====================
    // EIGENROTATION
    // =====================

    if (Pl1) {
     if (p2r === "earth") {
         Pl1.rotation.y += delta * 0.018;
     } else {
         Pl1.rotation.y += delta * 0.008;
     }
    }

    if (Pl2)
        Pl2.rotation.y +=
            delta * 0.4;

    if (Pl3)
        Pl3.rotation.y +=
            delta * 0.35;

    if (Pl4)
        Pl4.rotation.y +=
            delta * 0.35;

    if (Pl5)
        Pl5.rotation.y +=
            delta * 0.3;

    if (Pl6)
        Pl6.rotation.y +=
            delta * 0.6;

    if (Pl7)
        Pl7.rotation.y +=
            delta * 0.5;

    if (Pl8)
        Pl8.rotation.y +=
            delta * 0.45;

    if (Pl9)
        Pl9.rotation.y +=
            delta * 0.4;

    // =====================
    // ORBITS
    // =====================

    if (orbit2)
        orbit2.rotation.y +=
            delta * P2Speed;

    if (orbit3)
        orbit3.rotation.y +=
            delta * P3Speed;

    if (orbit4)
        orbit4.rotation.y +=
            delta * P4Speed;

    if (orbit5)
        orbit5.rotation.y +=
            delta * P5Speed;

    if (orbit6)
        orbit6.rotation.y +=
            delta * P6Speed;

    if (orbit7)
        orbit7.rotation.y +=
            delta * P7Speed;

    if (orbit8)
        orbit8.rotation.y +=
            delta * P8Speed;

    if (orbit9)
        orbit9.rotation.y +=
            delta * P9Speed;

    // =====================
    // TIDAL LOCK MOND
    // =====================

    if (
        p2r === "earth" &&
        Pl2 &&
        orbit2
    ) {

        Pl2.rotation.y =
            -orbit2.rotation.y;
    }

    renderer.render(
        scene,
        camera
    );

})();
