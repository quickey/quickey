module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  testMatch: [
    '**/__tests__/*.+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest'
};