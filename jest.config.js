const { pathsToModuleNameMapper } = require('ts-jest/utils');
// const { include } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  maxWorkers: 1,
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)']
};
