import { Platform } from "react-native";

const preloadImage = (): Promise<number> => {
  return new Promise((resolve) => {
    // Cek platform dan set gambar sesuai support
    if (Platform.OS === "android") {
      // Android biasanya support webp
      try {
        const webp = require("../assets/images-webp/bg2.webp");
        resolve(webp);
      } catch {
        const fallback = require("../assets/images/bg2.jpg");
        resolve(fallback);
      }
    } else {
      // iOS biasanya tidak support webp native (kecuali dengan libs)
      const fallback = require("../assets/images/bg2.jpg");
      resolve(fallback);
    }
  });
};

export default preloadImage;
