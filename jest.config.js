module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', 
  }, 
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|expo|@expo.*|expo-modules-core|@unimodules|firebase|react-clone-referenced-element|my-untranspiled-module|@testing-library/react-native)/)',
  ],
  setupFilesAfterEnv: ['./jest.setup.js', '@testing-library/jest-native/extend-expect'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testEnvironment: "jsdom",
};
