import { describe, expect, it } from 'vitest';
import { generateBlockie } from '../src/blockies';
import { CATPPUCCIN_MOCHA } from '../src/palettes';

function isSymmetric(grid: number[], gridSize: number): boolean {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const left = grid[row * gridSize + col];
      const right = grid[row * gridSize + (gridSize - 1 - col)];

      if (left !== right) return false;
    }
  }

  return true;
}

describe('generateBlockie', () => {
  it('produces identical output for the same seed', () => {
    const first = generateBlockie({ seed: 'alice', style: 'catppuccin-mocha' });
    const second = generateBlockie({ seed: 'alice', style: 'catppuccin-mocha' });

    expect(second).toEqual(first);
  });

  it('produces different output for different seeds', () => {
    const first = generateBlockie({ seed: 'alice', style: 'catppuccin-mocha' });
    const second = generateBlockie({ seed: 'bob', style: 'catppuccin-mocha' });

    expect(second).not.toEqual(first);
  });

  it('generates a horizontally symmetric grid', () => {
    const result = generateBlockie({ seed: 'symmetric', style: 'catppuccin-mocha' });

    expect(isSymmetric(result.grid, result.gridSize)).toBe(true);
  });

  it('uses Catppuccin colors in Catppuccin mode', () => {
    const result = generateBlockie({ seed: 'palette', style: 'catppuccin-mocha' });

    expect(CATPPUCCIN_MOCHA).toContain(result.color);
    expect(CATPPUCCIN_MOCHA).toContain(result.bgcolor);
    expect(CATPPUCCIN_MOCHA).toContain(result.spotcolor);
  });

  it('uses only black and white in B&W mode', () => {
    const result = generateBlockie({ seed: 'bw', style: 'bw' });

    expect(result.color).toBe('#000000');
    expect(result.bgcolor).toBe('#ffffff');
    expect(result.spotcolor).toBe('#000000');
  });

  it.each([
    [6, 36],
    [8, 64],
    [10, 100],
  ])('supports grid size %i', (gridSize, length) => {
    const result = generateBlockie({
      seed: `grid-${gridSize}`,
      style: 'catppuccin-mocha',
      gridSize,
    });

    expect(result.gridSize).toBe(gridSize);
    expect(result.grid).toHaveLength(length);
  });
});
