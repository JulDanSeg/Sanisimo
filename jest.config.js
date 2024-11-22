module.exports = {
    preset: 'react-native',
    setupFiles: ['./jest-setup.js'],
     setupFilesAfterEnv: ['./jest-setup.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Transformar archivos JS y TS
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native-reanimated|react-native|@react-native-community|@firebase|firebase|@react-navigation|@react-native/polyfills|@react-native/js-polyfills)/)', // Asegúrate de que los módulos se transformen
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  
  