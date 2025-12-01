const crypto = require('crypto');

// Polyfill crypto
if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    value: crypto.webcrypto,
    writable: true
  });
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  setupFiles: ['<rootDir>/test/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setupFilesAfterEnv.test.ts'],
  globalTeardown: '<rootDir>/test/globalTeardown.test.ts',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/test/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testTimeout: 10000,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.test.{ts,tsx,js,jsx}'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '\\.test\\.ts$',
    '\\.spec\\.ts$',
    '/__tests__/'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: false,
  coverageReporters: ['text', 'lcov'],
  coverageDirectory: '<rootDir>/coverage'
};
