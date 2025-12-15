import React, { useState, useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Text,
  StyleSheet,
  ViewStyle,
  Easing,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface AnimatedButtonProps {
  onPress?: () => void;
  buttonText: string;
  style?: any;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  buttonText,
  style,
}) => {
  const gradientAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(gradientAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnim, {
          toValue: 2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(gradientAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => {
    setIsPressed(false);
    onPress?.();
  };

  // 🔄 Geser background gradient (pakai piksel, bukan %)
  const translateX = gradientAnim.interpolate({
    inputRange: [0, 15],
    outputRange: [-screenWidth * 0.2, screenWidth * 0.5],
  });

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.buttonWrapper,
          style,
          {
            transform: [{ scale: pulseAnim }, { scale: isPressed ? 0.97 : 1 }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.gradientWrapper,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={['#f48831', '#f5dec6', '#f48181', '#f6634c']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 1.5 }}
            style={styles.gradientBackground}
          />
        </Animated.View>

        <Text style={styles.text}>{buttonText}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    overflow: 'hidden',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -6, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
    width: '220%',
  },
  gradientBackground: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
