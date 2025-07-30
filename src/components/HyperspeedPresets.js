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
      roadColor: 0x2dd4bf,         // bright teal
      islandColor: 0x06b6d4,       // sky blue
      background: 0x0f172a,        // dark slate
      shoulderLines: 0x22d3ee,     // cyan
      brokenLines: 0x00cfff,       // bright cerulean
      leftCars: [0x06b6d4, 0x0891b2, 0x0e7490],   // sky blue shades
      rightCars: [0x22d3ee, 0x0891b2, 0x155e75],  // cyan shades
      sticks: 0x67e8f9,            // bright cyan
    }
  }
};