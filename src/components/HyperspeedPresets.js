export const hyperspeedPresets = {
  cyberpunk: {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 40,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.1, 0.4],
    lightStickHeight: [1.2, 1.6],
    movingAwaySpeed: [70, 90],
    movingCloserSpeed: [-130, -170],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.04, 0.12],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.5, 0.5],
    carFloorSeparation: [0, 3],
    colors: {
      roadColor: 0x061e26,         // deep blue
      islandColor: 0x0a1f2d,       // dark cerulean
      background: 0x000000,
      shoulderLines: 0xffffff,     // white
      brokenLines: 0x00cfff,       // bright cerulean
      leftCars: [0x00bcd4, 0x00acc1, 0x80deea],   // cerulean shades
      rightCars: [0x4dd0e1, 0x26c6da, 0x00b8d4],
      sticks: 0xffffff,            // white neon
    }
  }
};