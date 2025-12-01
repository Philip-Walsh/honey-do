const crypto = require('crypto');

if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: crypto.webcrypto,
    writable: true
  });
}

if (!globalThis.crypto) {
  globalThis.crypto = crypto.webcrypto;
}
