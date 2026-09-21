import { NeatGradient } from "https://cdn.jsdelivr.net/npm/@firecms/neat@latest/dist/index.es.js";

const config = {
    colors: [
        { color: '#899D99', enabled: true },
        { color: '#5f2727', enabled: true },
        { color: '#373c38', enabled: true },
        { color: '#0099bb', enabled: true },
        { color: '#303B42', enabled: true },
        { color: '#2E7075', enabled: true },
    ],
    speed: 1.5,
    horizontalPressure: 5,
    verticalPressure: 4,
    waveFrequencyX: 4,
    waveFrequencyY: 5,
    waveAmplitude: 0,
    secondaryWaveEnabled: false,
    secondaryWaveFrequencyX: 3,
    secondaryWaveFrequencyY: 3,
    secondaryWaveAmplitude: 5,
    secondaryWaveSpeed: 0.6,
    secondaryWaveAngle: 1,
    shadows: 4,
    highlights: 4,
    colorBrightness: 0.6,
    colorSaturation: 0,
    wireframe: true,
    antialias: false,
    colorBlending: 3,
    backgroundColor: '#202020',
    backgroundAlpha: 0.95,
    grainScale: 2,
    grainSparsity: 0,
    grainIntensity: 0.575,
    grainSpeed: 0.1,
    resolution: 0.7,
    yOffset: 471.8333740234375,
    yOffsetWaveMultiplier: 5.5,
    yOffsetColorMultiplier: 5.2,
    yOffsetFlowMultiplier: 6,
    flowDistortionA: 3.7,
    flowDistortionB: 1.4,
    flowScale: 2.9,
    flowEase: 0.32,
    flowEnabled: true,
    enableProceduralTexture: true,
    transparentTextureVoid: false,
    textureMode: 'bitmap',
    bakeEdgeSoftness: 1,
    textureVoidLikelihood: 0.27,
    textureVoidWidthMin: 60,
    textureVoidWidthMax: 420,
    textureBandDensity: 1.2,
    textureColorBlending: 0.06,
    textureSeed: 333,
    textureEase: 1,
    proceduralBackgroundColor: '#0E0707',
    textureShapeTriangles: 20,
    textureShapeCircles: 15,
    textureShapeBars: 15,
    textureShapeSquiggles: 10,
    domainWarpEnabled: false,
    domainWarpIntensity: 0,
    domainWarpScale: 3,
    vignetteIntensity: 0,
    vignetteRadius: 0.8,
    fresnelEnabled: false,
    fresnelPower: 2,
    fresnelIntensity: 0.5,
    fresnelColor: '#FFFFFF',
    iridescenceEnabled: false,
    iridescenceIntensity: 0.5,
    iridescenceSpeed: 1,
    prismEdgeEnabled: false,
    prismEdgeIntensity: 0.5,
    prismEdgeThinness: 3,
    prismEdgeSpread: 1,
    prismEdgeSpeed: 0.5,
    prismEdgeRipple: 1,
    bloomIntensity: 0,
    bloomThreshold: 0.7,
    chromaticAberration: 0,
    shapeType: 'plane',
    shapeRotationX: 0,
    shapeRotationY: 0,
    shapeRotationZ: 0,
    shapeAutoRotateSpeedX: 0,
    shapeAutoRotateSpeedY: 0,
    sphereRadius: 15,
    torusRadius: 15,
    torusTube: 5,
    cylinderRadius: 10,
    cylinderHeight: 40,
    planeBend: 0,
    planeTwist: 0,
    silhouetteFade: 0.25,
    cylinderFade: 0.08,
    ribbonFade: 0.05,
    flatShading: true,
    cameraLock: true,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 0,
    cameraRotationX: 0,
    cameraRotationY: 0,
    cameraRotationZ: 0,
    cameraZoom: 1,
};

// skip the whole thing for anyone who's asked for less motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    // build the canvas here so it doesn't have to be pasted into all six pages
    const canvas = document.createElement("canvas");
    canvas.id = "bg-canvas";
    document.body.prepend(canvas);

    const gradient = new NeatGradient({ ref: canvas, ...config });

    // drift the gradient as the page scrolls
    window.addEventListener("scroll", () => {
        gradient.yOffset = config.yOffset + window.scrollY;
    }, { passive: true });

    // stop rendering while the tab is in the background
    document.addEventListener("visibilitychange", () => {
        gradient.speed = document.hidden ? 0 : config.speed;
    });
}
