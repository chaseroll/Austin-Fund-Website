/* One character palette, size, spacing, and tonal range for every letter field. */
const alphabet = 'UniversityofAustinAustinFundResearchBuildCreate';
const hash = seed => { const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
export const letterStyle = Object.freeze({
  ink: '#eaeaea',
  alphabet,
  column: 12,
  row: 9,
  alpha(seed) { return .08 + hash(seed) * .19; },
  font(width) {
    return `400 ${width <= 760 ? 8 : 9}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  },
});
