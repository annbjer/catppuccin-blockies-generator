const blockies = require('ethereum-blockies-png');
const crypto = require('crypto');
const fs = require('fs');
const { createSvg } = require('./blockie-svg');

const randomAddress = () => `0x${crypto.randomBytes(20).toString('hex')}`;
const seed = (process.argv[2] || randomAddress()).toLowerCase();

const options = {
  seed,
  scale: 10,
  color: '#000000',
  bgcolor: '#ffffff',
  spotcolor: '#000000',
};

const outDir = './generated-blockies';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// timestamp helper
const timestamp = () => new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

const pngBuffer = blockies.createBuffer(options);
const svg = createSvg(options);

const baseFilename = `${outDir}/blockie-single_${timestamp()}`;
fs.writeFileSync(`${baseFilename}.png`, pngBuffer);
fs.writeFileSync(`${baseFilename}.svg`, svg);

console.log(`✅ blockie saved as ${baseFilename}.png and ${baseFilename}.svg`);
console.log(`seed: ${seed}`);