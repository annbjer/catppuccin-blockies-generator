const blockies = require('ethereum-blockies-png');
const fs = require('fs');

// catppuccin mocha palette
const palette = [
  '#F5E0DC', '#F2CDCD', '#F5C2E7', '#CBA6F7', '#F38BA8',
  '#EBA0AC', '#FAB387', '#F9E2AF', '#A6E3A1', '#94E2D5',
  '#89DCEB', '#89B4FA', '#B4BEFE', '#C6D0F5',
  '#45475A', '#313244', '#1E1E2E', '#181825'
];

// optional: create output folder if not exists
const outDir = './blockies_png';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// timestamp helper
const timestamp = () => new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

// generate 12 blockies with random colors
for (let i = 0; i < 12; i++) {
  const seed = Math.random().toString(36).slice(2);

  const color = palette[Math.floor(Math.random() * palette.length)];
  const bgcolor = palette[Math.floor(Math.random() * palette.length)];
  const spotcolor = palette[Math.floor(Math.random() * palette.length)];

  const buffer = blockies.createBuffer({
    seed,
    scale: 10,
    color,
    bgcolor,
    spotcolor,
  });

  const filename = `${outDir}/blockie_${timestamp()}_${i + 1}.png`;
  fs.writeFileSync(filename, buffer);
  console.log(`✅ saved ${filename}`);
}