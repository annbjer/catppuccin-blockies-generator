const blockies = require('ethereum-blockies-png');
const fs = require('fs');

const address = '0x1234567890abcdef1234567890abcdef12345678';

const pngBuffer = blockies.createBuffer({
  seed: address.toLowerCase(),
  scale: 10,
  color: '#000000',
  bgcolor: '#ffffff',
  spotcolor: '#000000',
});

fs.writeFileSync('blockie.png', pngBuffer);

console.log('✅ black & white blockie saved as blockie.png');