const blockies = require('ethereum-blockies-base64').default;
const fs = require('fs');

const address = '0x1234567890abcdef1234567890abcdef12345678';

const dataUrl = blockies({
  seed: address,
  color: '#000000',
  bgColor: '#ffffff',
  spotColor: '#000000'
});

const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
fs.writeFileSync('blockie.png', base64Data, 'base64');

console.log('✅ blockie saved as blockie.png');