// Small internal SVG renderer matching ethereum-blockies-png's grid algorithm.
const randseed = new Array(4);

function seedrand(seed) {
  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }

  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
}

function rand() {
  const t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createImageData(size) {
  const width = size;
  const height = size;
  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;
  const data = [];

  for (let y = 0; y < height; y++) {
    let row = [];

    for (let x = 0; x < dataWidth; x++) {
      row[x] = Math.floor(rand() * 2.3);
    }

    row = row.concat(row.slice(0, mirrorWidth).reverse());
    data.push(...row);
  }

  return data;
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function createSvg(opts = {}) {
  const size = opts.size || 8;
  const scale = opts.scale || 4;
  const seed =
    opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);
  const color = opts.color || '#000000';
  const bgcolor = opts.bgcolor || '#ffffff';
  const spotcolor = opts.spotcolor || color;
  const imageWidth = size * scale;

  seedrand(seed);

  const imageData = createImageData(size);
  const rects = [
    `<rect width="${imageWidth}" height="${imageWidth}" fill="${escapeAttr(
      bgcolor
    )}"/>`,
  ];

  for (let i = 0; i < imageData.length; i++) {
    if (!imageData[i]) continue;

    const row = Math.floor(i / size);
    const col = i % size;
    const fill = imageData[i] === 1 ? color : spotcolor;

    rects.push(
      `<rect x="${col * scale}" y="${row * scale}" width="${scale}" height="${scale}" fill="${escapeAttr(
        fill
      )}"/>`
    );
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageWidth}" viewBox="0 0 ${imageWidth} ${imageWidth}" shape-rendering="crispEdges">`,
    ...rects,
    '</svg>',
    '',
  ].join('\n');
}

module.exports = { createSvg };
