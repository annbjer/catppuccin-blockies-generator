import { BLACK, CATPPUCCIN_MOCHA, WHITE } from './palettes';

export type BlockieStyle = 'catppuccin-mocha' | 'bw';

export interface BlockieOptions {
  seed: string;
  style: BlockieStyle;
  gridSize?: number;
}

export interface BlockieResult {
  grid: number[];
  gridSize: number;
  color: string;
  bgcolor: string;
  spotcolor: string;
}

const randseed: number[] = [0, 0, 0, 0];

function seedrand(seed: string): void {
  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }

  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
}

function rand(): number {
  const t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createImageData(size: number): number[] {
  const width = size;
  const height = size;
  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;
  const data: number[] = [];

  for (let y = 0; y < height; y++) {
    let row: number[] = [];

    for (let x = 0; x < dataWidth; x++) {
      row[x] = Math.floor(rand() * 2.3);
    }

    row = row.concat(row.slice(0, mirrorWidth).reverse());
    data.push(...row);
  }

  return data;
}

export function simpleHash(str: string): number {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }

  return Math.abs(hash);
}

function paletteColor(seed: string, salt: string): string {
  return CATPPUCCIN_MOCHA[
    simpleHash(`${seed}:${salt}`) % CATPPUCCIN_MOCHA.length
  ];
}

function normalizeGridSize(gridSize?: number): number {
  return gridSize === 6 || gridSize === 8 || gridSize === 10 ? gridSize : 8;
}

export function generateBlockie(opts: BlockieOptions): BlockieResult {
  const gridSize = normalizeGridSize(opts.gridSize);
  const seed = opts.seed || 'blockie';

  seedrand(seed);

  if (opts.style === 'bw') {
    return {
      grid: createImageData(gridSize),
      gridSize,
      color: BLACK,
      bgcolor: WHITE,
      spotcolor: BLACK,
    };
  }

  return {
    grid: createImageData(gridSize),
    gridSize,
    color: paletteColor(seed, 'color'),
    bgcolor: paletteColor(seed, 'bgcolor'),
    spotcolor: paletteColor(seed, 'spotcolor'),
  };
}
