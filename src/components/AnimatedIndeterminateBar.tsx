import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, LayoutChangeEvent } from 'react-native';

type Props = {
  step: number;
  totalSteps: number;
};

const AnimatedIndeterminateBar: React.FC<Props> = ({ step, totalSteps }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (width === 0) return;

    const segmentWidth = width / totalSteps;
    const barWidth = 40;

    const startX = step * segmentWidth;
    const endX = startX + segmentWidth - barWidth;

    translateX.setValue(startX);

    animationRef.current?.stop();

    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: endX,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: startX,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    animationRef.current.start();

    return () => {
      animationRef.current?.stop();
    };
  }, [width, step, totalSteps, translateX]);

  const onLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

export default AnimatedIndeterminateBar;

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 10,
  },
  bar: {
    width: 40,
    height: '100%',
    backgroundColor: '#16A34A',
    borderRadius: 6,
  },
});
