/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
   // to obtain access to the matchers.
   setupFilesAfterEnv: ['./src/setupTests.ts'],
   moduleNameMapper: {
    "axios": "axios/dist/axios.js"
  },
  collectCoverage: true,
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
};