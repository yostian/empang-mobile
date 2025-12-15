import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface DynamicLoaderProps {
  size?: number;
  holeSize?: number;
  backgroundColor?: string;
}

const DynamicLoader: React.FC<DynamicLoaderProps> = ({
  size = 50,
  holeSize = 32,
  backgroundColor = '#ffffffff',
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* spinner */}
      <Animated.View
        style={{
          transform: [{ rotate }],
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      >
        <LinearGradient
          colors={['#ff8f4c', '#ffd7b4', '#ff8f8f', '#ff5139']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          width: holeSize,
          height: holeSize,
          borderRadius: holeSize / 2,
          backgroundColor,
        }}
      />
    </View>
  );
};

export default DynamicLoader;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
