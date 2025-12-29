import { Platform } from 'react-native';

const preloadImage = (): number => {
  try {
    if (Platform.OS === 'android') {
      return require('../assets/images-webp/bg2.webp');
    }
    return require('../assets/images/bg2.jpg');
  } catch (e) {
    console.log('preloadImage error, fallback used', e);
    return require('../assets/images/bg2.jpg');
  }
};

export default preloadImage;
