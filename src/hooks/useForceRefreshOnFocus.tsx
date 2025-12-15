import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Animated } from 'react-native';

export default function useForceRefreshOnFocus(duration = 200) {
  const [refresh, setRefresh] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;

  useFocusEffect(
    useCallback(() => {
      setRefresh(true);

      // fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start(() => {
        // re-render
        setRefresh(false);

        // fade in lagi
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start();
      });

      return () => {
        opacity.stopAnimation();
      };
    }, [duration]),
  );

  return { refresh, opacity };
}
