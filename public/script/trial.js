import bip39 from 'bip39';

// Generate a 12-word mnemonic (128 bits of entropy)
const mnemonic = bip39.generateMnemonic(128);
const words = mnemonic.split(" ");
console.log(words);
exports={words};
