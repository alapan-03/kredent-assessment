// jest.config.js
export default {
  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // A file to run before each test file
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Mock CSS imports
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Define how to transform JS/JSX files
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};