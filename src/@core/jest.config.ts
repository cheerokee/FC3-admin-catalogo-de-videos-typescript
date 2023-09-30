/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */


const config = {
  displayName: {
    name: '@core',
    color: 'blue'
  },
  clearMocks: true, // Limpa o mock a cada teste que é executado
  coverageDirectory: '<rootDir>/../__coverage',
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "html"
    // "lcov",
    // "clover"
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  rootDir: "src",
  setupFilesAfterEnv: ["./@seedwork/domain/tests/validations.ts"],
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  }
};

export default config;
