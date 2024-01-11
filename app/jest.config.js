module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],

  moduleNameMapper: {
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
    '^middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^jobs/(.*)$': '<rootDir>/src/jobs/$1',
    '^database/(.*)$': '<rootDir>/src/database/$1',
    '^general/(.*)$': '<rootDir>/src/modules/general/$1',
    // Adicione mais mapeamentos conforme necessário
  }
};
