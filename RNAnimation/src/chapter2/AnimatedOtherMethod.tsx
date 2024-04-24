import * as React from 'react';
import {Animated, Button} from 'react-native';
import {useRef} from 'react';

// Animated 사칙연산 메소드
// add, subtract, divide, multiply

// Animated 핸들러 메소드
// start, reset, loop

const AnimatedOtherMethod = () => {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const value1 = new Animated.Value(100);
  const value2 = new Animated.Value(30);

  console.log(
    Animated.add(value1, value2),
    Animated.subtract(value1, value2),
    Animated.divide(value1, value2),
    Animated.multiply(value1, value2),
  );

  Animated.timing(value1, {
    toValue: Animated.add(value1, value2),
    useNativeDriver: true,
  });

  const onPressButton = () => {
    // Animated.timing(opacityAnim, {
    //   toValue: 0,
    //   useNativeDriver: true,
    // }).start(finish => {
    //   //{"finished": true, "value": 0}
    //   const {finished} = finish;
    //
    //   if (finished) {
    //     //같은 함수를 써서 reset시켜서 초기값으로 이동시키는것이므로 많이 쓰이지는 않는다.
    //     //opacityAnim.resetAnimation();을 쓰는게 낫다.
    //     setTimeout(() => {
    //       Animated.timing(opacityAnim, {
    //         toValue: 0,
    //         useNativeDriver: true,
    //       }).reset();
    //     }, 2000);
    //   }
    // });

    //무한으로 안할려면 iterations 설정 빼버리자
    Animated.loop(
      Animated.timing(opacityAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
      {iterations: 5},
    ).start();
  };

  return (
    <>
      <Button title={'button'} onPress={onPressButton} />
      <Animated.Text style={{fontSize: 70, opacity: opacityAnim}}>
        🍊
      </Animated.Text>
    </>
  );
};

export default AnimatedOtherMethod;
