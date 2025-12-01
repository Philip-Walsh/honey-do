import crypto from 'crypto';

// @ts-ignore
if (!global.crypto) {
  // @ts-ignore
  global.crypto = crypto.webcrypto;
}

// @ts-ignore
if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = crypto.webcrypto;
}

console.log('Setup running, crypto defined:', !!global.crypto);
