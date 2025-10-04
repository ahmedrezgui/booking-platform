import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // ✅ Make sure TS files in src/* are counted for coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'cobertura'],

  // Transform TS/TSX
  transform: { '^.+\\.(t|j)sx?$': 'ts-jest' },

  // Make sure test files are detected
  testMatch: ['**/?(*.)+(spec|test).ts'],

  // If you use path aliases in tsconfig, map them here
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
