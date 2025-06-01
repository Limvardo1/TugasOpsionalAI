const bcrypt = require('bcrypt');

const passwords = ['admin123', 'user123'];

async function generateHashes() {
  for (const pwd of passwords) {
    const hash = await bcrypt.hash(pwd, 10);
    console.log(`Password: ${pwd} => Hash: ${hash}`);
  }
}

generateHashes();
