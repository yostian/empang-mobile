import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';

interface CardProps {
  children: ReactNode;
  className?: string;
  blurType?:
    | 'light'
    | 'dark'
    | 'xlight'
    | 'extraDark'
    | 'regular'
    | 'prominent';
  blurAmount?: number;
  style?: ViewStyle | ViewStyle[];
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  blurType = 'light',
  blurAmount = 10,
  style,
}) => {
  return (
    <View
      className={`w-full max-w-[720px] rounded-2xl overflow-hidden relative p-[18px] self-center ${className}`}
      style={style}
    >
      {/* BlurView wajib absoluteFill pakai StyleSheet */}
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType={blurType}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor="rgba(0,0,0,0)"
      />
      {/* Lapisan overlay */}
      <View style={StyleSheet.absoluteFillObject} className="bg-white/20" />

      <View className="w-full p-2 bg-transparent">{children}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 720,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexShrink: 1, // 👈 biar card gak maksa full tinggi
    alignSelf: 'center', // 👈 biar tetap center
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(215, 210, 210, 0.25)', // lapisan transparan lembut
  },
});
