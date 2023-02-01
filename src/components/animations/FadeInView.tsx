import React, { useRef, ReactElement, useEffect } from "react";
import { Animated } from "react-native";

interface Props {
  duration?: number;
  children: ReactElement | ReactElement[];
  style?: {};
}

const FadeInView = ({ duration = 1000, children, style }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [duration, fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
