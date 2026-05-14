import { generateBlockie, type BlockieResult, type BlockieStyle } from './blockies';

const BLOCKIE_GROUP_NAME = '_catppuccin-blockie';

type SeedMode = 'random' | 'layer-name';
type GridSize = 6 | 8 | 10;

interface GenerateMessage {
  type: 'generate';
  style: BlockieStyle;
  seedMode: SeedMode;
  gridSize: GridSize;
}

interface CancelMessage {
  type: 'cancel';
}

type PluginMessage = GenerateMessage | CancelMessage;

type TargetNode = SceneNode & ChildrenMixin & LayoutMixin;

figma.showUI(__html__, { width: 300, height: 280 });

function isTargetNode(node: SceneNode): node is TargetNode {
  return 'children' in node && 'appendChild' in node && 'width' in node && 'height' in node;
}

function getTargets(): TargetNode[] {
  return figma.currentPage.selection.filter(isTargetNode);
}

function postSelectionCount(): void {
  figma.ui.postMessage({
    type: 'selection-count',
    count: getTargets().length,
  });
}

function randomSeed(): string {
  let hex = '';
  const chars = '0123456789abcdef';

  for (let i = 0; i < 40; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)];
  }

  return `0x${hex}`;
}

function hexToRgb(hex: string): RGB {
  const normalized = hex.replace('#', '');
  const n = parseInt(normalized, 16);

  return {
    r: ((n >> 16) & 0xff) / 255,
    g: ((n >> 8) & 0xff) / 255,
    b: (n & 0xff) / 255,
  };
}

function removeExistingBlockie(parent: TargetNode): void {
  for (const child of [...parent.children]) {
    if (child.name === BLOCKIE_GROUP_NAME && child.type === 'GROUP') {
      child.remove();
    }
  }
}

function fillNodeWithBlockie(node: TargetNode, result: BlockieResult): void {
  const cellWidth = node.width / result.gridSize;
  const cellHeight = node.height / result.gridSize;
  const cells: SceneNode[] = [];

  removeExistingBlockie(node);

  for (let i = 0; i < result.grid.length; i++) {
    const row = Math.floor(i / result.gridSize);
    const col = i % result.gridSize;
    const cellValue = result.grid[i];
    const fill =
      cellValue === 0
        ? result.bgcolor
        : cellValue === 1
          ? result.color
          : result.spotcolor;

    const rect = figma.createRectangle();
    rect.name = `blockie-cell-${row}-${col}`;
    rect.x = col * cellWidth;
    rect.y = row * cellHeight;
    rect.resize(cellWidth, cellHeight);
    rect.fills = [{ type: 'SOLID', color: hexToRgb(fill) }];

    node.appendChild(rect);
    cells.push(rect);
  }

  const group = figma.group(cells, node);
  group.name = BLOCKIE_GROUP_NAME;
  group.locked = false;
  group.x = 0;
  group.y = 0;
}

function handleGenerate(message: GenerateMessage): void {
  const targets = getTargets();
  let generated = 0;

  for (const node of targets) {
    const seed = message.seedMode === 'layer-name' ? node.name : randomSeed();
    const result = generateBlockie({
      seed,
      style: message.style,
      gridSize: message.gridSize,
    });

    fillNodeWithBlockie(node, result);
    generated += 1;
  }

  const skipped = figma.currentPage.selection.length - generated;

  if (generated === 0) {
    figma.notify('Select at least one frame or group first.');
    figma.closePlugin();
    return;
  }

  if (skipped > 0) {
    figma.notify(`Generated ${generated} blockies. Skipped ${skipped} unsupported layers.`);
  } else {
    figma.notify(`Generated ${generated} blockies.`);
  }

  figma.closePlugin('Done!');
}

figma.ui.onmessage = (message: PluginMessage) => {
  if (message.type === 'cancel') {
    figma.closePlugin();
    return;
  }

  if (message.type === 'generate') {
    handleGenerate(message);
  }
};

figma.on('selectionchange', postSelectionCount);
postSelectionCount();
