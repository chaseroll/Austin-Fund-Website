/* Letter-built interpretation of Austin's Pennybacker (Loop 360) Bridge.
   Reference: https://guidetoaustinarchitecture.com/places/pennybacker-bridge/ */
export function buildBridge() {
  const letters = 'AustinFundUniversityofAustinFoundersIdeasResearchEngineeringBuildTheFuture';
  const glyphs = [], unique = new Set();
  function add(x, y, z, fade = 1) {
    const key = [x, y, z].map(value => Math.round(value / 2.5)).join(':');
    if (unique.has(key)) return;
    unique.add(key);
    glyphs.push({x: x - 500, y: 210 - y, z, char: letters[glyphs.length % letters.length], fade, dx: 0, dy: 0});
  }
  function line(a, b, fade = 1, spacing = 6) {
    const steps = Math.ceil(Math.hypot(...a.map((value, index) => b[index] - value)) / spacing);
    for (let i = 0; i <= steps; i++) {
      add(...a.map((value, index) => value + (b[index] - value) * i / Math.max(1, steps)), fade);
    }
  }
  function box(x1, x2, y1, y2, z1, z2, fade = 1) {
    for (const y of [y1, y2]) {
      for (const z of [z1, z2]) line([x1, y, z], [x2, y, z], fade);
      for (const x of [x1, x2]) line([x, y, z1], [x, y, z2], fade);
    }
    for (const x of [x1, x2]) for (const z of [z1, z2]) line([x, y1, z], [x, y2, z], fade);
  }
  const halfWidth = 86, deck = 230;
  const archStart = 100, archEnd = 900;
  const archY = x => 355 - 295 * (1 - ((x - 500) / 400) ** 2);

  // Pennybacker's shallow roadway passes between paired box-section arches.
  box(0, 1000, deck, deck + 12, -halfWidth, halfWidth, .85);
  for (let x = 0; x <= 1000; x += 40) {
    line([x, deck + 12, -halfWidth], [x, deck + 12, halfWidth], .5, 8);
  }
  for (const z of [-43, 0, 43]) line([0, deck, z], [1000, deck, z], .4, 8);
  for (const z of [-halfWidth, halfWidth]) {
    line([0, deck - 12, z], [1000, deck - 12, z], .8);
    for (let x = 0; x <= 1000; x += 24) line([x, deck - 12, z], [x, deck, z], .7);
  }

  // Two continuous arch ribs, each with front/back faces and real thickness.
  for (const z of [-halfWidth - 8, halfWidth + 8]) {
    for (const faceZ of [z - 6, z + 6]) {
      for (const offsetY of [0, 8, 16]) {
        for (let x = archStart; x < archEnd; x += 5) {
          line([x, archY(x) + offsetY, faceZ], [x + 5, archY(x + 5) + offsetY, faceZ]);
        }
      }
    }
    for (let x = archStart; x <= archEnd; x += 50) {
      line([x, archY(x), z - 6], [x, archY(x), z + 6]);
      line([x, archY(x) + 16, z - 6], [x, archY(x) + 16, z + 6]);
    }
    // Paired slender vertical hangers; the end portions meet the arch below deck.
    for (let x = 220; x <= 780; x += 32) {
      line([x - 3, archY(x) + 16, z], [x - 3, deck, z], .8);
      line([x + 3, archY(x) + 16, z], [x + 3, deck, z], .8);
    }
    for (const x of [archStart, archEnd]) box(x - 18, x + 18, 355, 380, z - 18, z + 18, .65);
  }

  // Horizontal Vierendeel struts link the arch ribs above the roadway.
  // These open rectangular portals are characteristic of the 360 Bridge.
  for (let x = 220; x <= 780; x += 70) {
    box(x - 4, x + 4, archY(x) + 5, archY(x) + 13, -halfWidth - 8, halfWidth + 8, .85);
  }
  for (const x of [35, 965]) {
    box(x - 8, x + 8, deck + 12, 345, -halfWidth + 10, -halfWidth + 26, .6);
    box(x - 8, x + 8, deck + 12, 345, halfWidth - 26, halfWidth - 10, .6);
    box(x - 12, x + 12, deck + 12, deck + 22, -halfWidth, halfWidth, .6);
  }
  return glyphs;
}
