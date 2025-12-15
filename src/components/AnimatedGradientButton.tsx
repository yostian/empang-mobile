// components/AnimatedGradientButton.tsx
import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  Easing,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const AnimatedGradientButton: React.FC<Props> = ({ title, onPress, style }) => {
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // animasi geser gradient
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.back(1),
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.back(0),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // animasi membesar & mengecil
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05, // sedikit membesar
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // kembali normal
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [gradientAnim, scaleAnim]);

  const translateX = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.buttonContainer, style]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View style={styles.gradientWrapper}>
          <Animated.View
            style={[styles.animatedGradient, { transform: [{ translateX }] }]}
          >
            <LinearGradient
              colors={['#ff00cc', '#f48831', '#f5dec6', '#f48181', '#f6634c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          </Animated.View>
          <Text style={styles.text}>{title}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: 12,
    marginVertical: 6,
    overflow: 'hidden',
  },
  gradientWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedGradient: {
    ...StyleSheet.absoluteFillObject,
    width: '300%',
  },
  gradient: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 14,
  },
});

export default AnimatedGradientButton;
