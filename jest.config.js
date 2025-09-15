module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/test-db.setup.js'],
  testMatch: ['**/?(*.)+(test).[jt]s'],
};