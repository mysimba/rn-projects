import * as React from 'react';
import {Animated, Button, View} from 'react-native';
import {useRef} from 'react';

const AnimatedDecay = () => {
  const translateXAnim = useRef(new Animated.Value(-100)).current;
  const onButtonPress = () => {
    // decay animation 속도가 줄어들어 애니메이션이 끝나야한다.
    Animated.decay(translateXAnim, {
      velocity: 1, //속도
      deceleration: 0.995, // 0.997 기본값 이것보다 낮아야 멈추는걸 볼수있다.
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Button title={'거기 멈춰!'} onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 70, transform: [{translateX: translateXAnim}]}}>
        🚗
      </Animated.Text>
    </>
  );
};

export default AnimatedDecay;
