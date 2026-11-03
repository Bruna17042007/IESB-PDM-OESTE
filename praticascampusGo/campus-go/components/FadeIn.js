
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({ children, duration = 600 }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [opacity, duration]);

  return (
    <Animated.View style={{ opacity }}>
      {children}
    </Animated.View>
  );
}
