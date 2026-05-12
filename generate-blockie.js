const blockies = require('ethereum-blockies-png');
const crypto = require('crypto');
const fs = require('fs');
const { createSvg } = require('./blockie-svg');

// catppuccin mocha palette
const palette = [
  '#F5E0DC',
  '#F2CDCD',
  '#F5C2E7',
  '#CBA6F7',
  '#F38BA8',
  '#EBA0AC',
  '#FAB387',
  '#F9E2AF',
  '#A6E3A1',
  '#94E2D5',
  '#89DCEB',
  '#89B4FA',
  '#B4BEFE',
  '#C6D0F5',
  '#45475A',
  '#313244',
  '#1E1E2E',
  '#181825',
];

const randomAddress = () => `0x${crypto.randomBytes(20).toString('hex')}`;
const seed = (process.argv[2] || randomAddress()).toLowerCase();

const paletteColor = (salt) => {
  const hash = crypto.createHash('sha256').update(`${seed}:${salt}`).digest();
  return palette[hash[0] % palette.length];
};

const options = {
  seed,
  scale: 10,
  color: paletteColor('color'),
  bgcolor: paletteColor('bgcolor'),
  spotcolor: paletteColor('spotcolor'),
};

const outDir = './generated-blockies';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// timestamp helper
const timestamp = () =>
  new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

const pngBuffer = blockies.createBuffer(options);
const svg = createSvg(options);

const baseFilename = `${outDir}/blockie-single_${timestamp()}`;
fs.writeFileSync(`${baseFilename}.png`, pngBuffer);
fs.writeFileSync(`${baseFilename}.svg`, svg);

console.log(
  `✅ Catppuccin blockie saved as ${baseFilename}.png and ${baseFilename}.svg`
);
console.log(`seed: ${seed}`);
