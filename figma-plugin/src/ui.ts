type BlockieStyle = 'catppuccin-mocha' | 'bw';
type SeedMode = 'random' | 'layer-name';
type GridSize = 6 | 8 | 10;

interface SelectionCountMessage {
  type: 'selection-count';
  count: number;
}

const generateButton = document.getElementById('generate') as HTMLButtonElement;
const selectionStatus = document.getElementById('selection-status') as HTMLDivElement;
const gridSizeSelect = document.getElementById('grid-size') as HTMLSelectElement;

function getCheckedValue<T extends string>(name: string): T {
  const input = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return input?.value as T;
}

function setSelectionCount(count: number): void {
  generateButton.disabled = count === 0;
  selectionStatus.textContent =
    count === 0
      ? 'Select frames or groups first'
      : `${count} frame${count === 1 ? '' : 's'} / group${count === 1 ? '' : 's'} selected`;
}

generateButton.addEventListener('click', () => {
  parent.postMessage(
    {
      pluginMessage: {
        type: 'generate',
        style: getCheckedValue<BlockieStyle>('style'),
        seedMode: getCheckedValue<SeedMode>('seed-mode'),
        gridSize: Number(gridSizeSelect.value) as GridSize,
      },
    },
    '*'
  );
});

window.onmessage = (event: MessageEvent<{ pluginMessage?: SelectionCountMessage }>) => {
  const message = event.data.pluginMessage;

  if (message?.type === 'selection-count') {
    setSelectionCount(message.count);
  }
};
