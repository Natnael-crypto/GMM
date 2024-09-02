const { pathsToModuleNameMapper } = require('../gmm-api/node_modules/ts-jest');
const { compilerOptions } = require('../gmm-api/tsconfig.json');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': [
      '../gmm-api/node_modules/ts-jest',
      {
        tsconfig: '../gmm-api/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/../gmm-api/',
  }),
};
