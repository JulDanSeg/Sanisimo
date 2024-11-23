jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Animated.NativeAnimatedHelper = {};
  return RN;
});
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
    default: jest.fn().mockReturnValue('light'),
  }));
  jest.mock('@react-native-firebase/app', () => jest.fn());
  jest.mock('@react-native-firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
  }));
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({
    default: jest.fn(),
  }));
  
  jest.mock('react-native-reanimated', () => require('react-native/jest/mock'));
  jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
  }));
  
  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(() => ({
      currentUser: { uid: 'test-uid' }, // Mock de usuario autenticado
    })),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  }));
  
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(() => ({ id: 'mockDoc' })),
    setDoc: jest.fn(() => Promise.resolve()),
  }));
  
  jest.mock('@react-native/js-polyfills/error-guard', () => {});


 





  