import * as React from 'react';
import {Animated, Button} from 'react-native';
import {useRef} from 'react';

// sequence: 애니메이션을 동기적으로 작동하도록 한다.
// delay: 애니메이션 사이에 딜레이를 준다.
// parallel: 기존의 애니메이션 동작과 크게 다르지않다.애니메이션을 묶어주는 역할 애니메이션 하나가 멈추면 다멈춘다
// stagger: 애니메이션 사이에 delay를 적용시켜준다.

// 1) y -200 > 0 timing
// 2) x 0 > 100 timing
const AnimatedComposing = () => {
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-200)).current;

  const onButtonPress = () => {
    setTimeout(() => {
      translateYAnim.stopAnimation();
    }, 500);

    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <Button title={'Button'} onPress={onButtonPress} />
      <Animated.Text
        style={{
          fontSize: 70,
          transform: [
            {translateX: translateXAnim},
            {translateY: translateYAnim},
          ],
        }}>
        🍊
      </Animated.Text>
    </>
  );
};

export default AnimatedComposing;
