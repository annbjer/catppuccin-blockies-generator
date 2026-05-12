# Catppuccin Blockies Generator

Generate minimal Ethereum-style PNG blockies/identicons for dashboards, wallets, and interface mockups — including black-and-white and Catppuccin Mocha themed outputs.

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

Generate a batch of Catppuccin-themed PNG blockies:

```bash
npm run generate
```

Generate a black-and-white blockie from the dummy example seed/address:

```bash
npm run generate:bw
```

Generate a single PNG blockie from the dummy example seed/address:

```bash
npm run generate:single
```

## Output

- `npm run generate` writes PNG files to `./blockies_png/`.
- `npm run generate:bw` and `npm run generate:single` write `./blockie.png`.

Generated PNG outputs are ignored by Git by default.

## Notes

The wallet/address-looking values in the example scripts are dummy seeds only. They are used to produce deterministic visual output and are not intended to represent a real wallet.

This tool creates visual identicons only. It does not validate wallet ownership, verify addresses, or perform any blockchain lookups.

## Attribution

This is an unofficial tool inspired by the Catppuccin Mocha color palette. Catppuccin is created by the Catppuccin community.

This project is not affiliated with or endorsed by the official Catppuccin organization.

## License

MIT
