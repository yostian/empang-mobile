import React, { useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';

type SlideButtonProps = {
  onPress: () => void;
  isActive: boolean;
  text: string;
};

const SlideButton: React.FC<SlideButtonProps> = ({
  onPress,
  isActive,
  text,
}) => {
  const pressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 200,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 4,
      tension: 200,
    }).start();
  };

  // scale akhir = tombol aktif + tombol ditekan
  const scale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [isActive ? 1.15 : 0.95, isActive ? 1.1 : 1.05],
  });

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -3],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          transform: [{ scale }, { translateY }],
          paddingVertical: 14,
          paddingHorizontal: 28,
          borderRadius: 12,
          backgroundColor: isActive ? '#ea580c' : '#1f2937',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: isActive ? 10 : 6,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default SlideButton;
