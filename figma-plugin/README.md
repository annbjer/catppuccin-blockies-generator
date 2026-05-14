# Catppuccin Blockies Figma Plugin

Local-first Figma plugin for filling selected frames or groups with editable
vector blockies.

## Features

- Native Figma rectangle layers, not PNG imports
- Catppuccin Mocha and black-and-white styles
- Random seed mode
- Layer-name seed mode for deterministic output
- Grid sizes: 6, 8, and 10
- Regeneration cleanup for groups named `_catppuccin-blockie`

## Install

```bash
npm install
npm run build
```

## Load in Figma

1. Open the Figma desktop app.
2. Go to **Plugins → Development → Import plugin from manifest…**.
3. Select `figma-plugin/manifest.json`.
4. Run **Catppuccin Blockies** from the development plugins menu.

## Usage

1. Select one or more frames or groups.
2. Choose style, seed mode, and grid size.
3. Click **Generate**.

The plugin skips unsupported selected layers. Re-running on the same frame or
group removes only existing groups named `_catppuccin-blockie` before inserting
the new blockie.

## Development

```bash
npm run typecheck
npm test
npm run build
npm run watch
```

No network calls are used. ENS resolution and Ethereum address validation are
intentionally out of scope for v1.
