# Catppuccin Blockies Generator

Generate minimal Ethereum-style PNG and SVG blockies/identicons for dashboards, wallets, and interface mockups — including black-and-white and Catppuccin Mocha themed outputs.

I made this as a quick design utility for moments when I need placeholder wallet avatars or identity icons while working on crypto/web3 dashboards. It is intentionally simple: run a script, generate a batch of blockies, and drop them into your mockups or prototypes.

## Preview

![Single blockie example](examples/example-single.png)
![Catppuccin blockie example 1](examples/example-catppuccin-01.png)
![Catppuccin blockie example 2](examples/example-catppuccin-02.png)

## Install

```bash
npm install
```

## Usage

Generate a batch of Catppuccin-themed PNG and SVG blockies:

```bash
npm run generate
```

Generate a black-and-white blockie with a random seed/address:

```bash
npm run generate:bw
# or
node generate-bw-blockie.js
```

Generate a black-and-white blockie with a deterministic seed/address:

```bash
node generate-bw-blockie.js 0x1234567890abcdef1234567890abcdef12345678
```

Generate a single PNG and SVG blockie with a random seed/address:

```bash
npm run generate:single
# or
node generate-blockie.js
```

Generate a single PNG and SVG blockie with a deterministic seed/address:

```bash
node generate-blockie.js 0x1234567890abcdef1234567890abcdef12345678
```

## Output

- `npm run generate` writes timestamped batch PNG and SVG files to `./generated-blockies/`.
- `npm run generate:bw` writes timestamped files like `./generated-blockies/blockie-bw_YYYYMMDDHHMMSS.png` and `.svg`.
- `npm run generate:single` writes timestamped files like `./generated-blockies/blockie-single_YYYYMMDDHHMMSS.png` and `.svg`.

Generated outputs are ignored by Git by default.

## Notes

Wallet/address-looking values in the examples are dummy seeds only. They are used to produce deterministic visual output and are not intended to represent a real wallet. If no seed/address is provided, the single-output scripts generate a random Ethereum-style seed/address and print it.

This tool creates visual identicons only. It does not validate wallet ownership, verify addresses, or perform any blockchain lookups.

## Attribution

This is an unofficial tool inspired by the Catppuccin Mocha color palette. Catppuccin is created by the Catppuccin community.

This project is not affiliated with or endorsed by the official Catppuccin organization.

## License

MIT
