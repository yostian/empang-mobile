import React from "react";
import { Image, ImageProps, ImageStyle, StyleProp } from "react-native";
import { WebpImages, FallbackImages } from "../assets/images-webp";

interface ImageWithFallbackProps {
  baseName: keyof typeof WebpImages | keyof typeof FallbackImages;
  source?: ImageProps["source"];
  style?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
  resizeMode?: ImageProps["resizeMode"];
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  baseName,
  source,
  style,
  accessibilityLabel,
  resizeMode = "contain",
}) => {
  let imageSource;
  const webpSrc = WebpImages[baseName];
  const fallbackSrc = FallbackImages[baseName];

  // Coba load .webp dulu
  try {
    imageSource = webpSrc;
  } catch {
    // Kalau gagal, coba load PNG fallback
    try {
      imageSource = fallbackSrc;
    } catch {
      console.warn(`Image not found for baseName: ${baseName}`);
      return null;
    }
  }

  return (
    <Image
      source={imageSource}
      style={style}
      resizeMode={resizeMode}
      accessibilityLabel={accessibilityLabel} // untuk aksesibilitas
    />
  );
};

export default ImageWithFallback;
