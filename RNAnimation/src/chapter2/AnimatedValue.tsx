import * as React from 'react';
import {Animated, Button} from 'react-native';
import {useEffect, useRef} from 'react';

// setValue(); //애니메이션 시작전에 초기값으로 설정하기 위함
// addListener(callback) 실시간으로 value를 확인해볼수있음. 테스트 및 다른로직과 사용해 풍부한 애니메이션이 가능하게함
// removeAllListener(); unmaount 될때 메모리 누수를 ㅁ막기위해 사용
// stopAnimation(); setTimeout과 사용하여 애니메이션을 컨트롤
// resetAnimation(); 애니메이션을 멈추고 초기값으로 돌아오게한다

// setOffset(); value에 추가된 값을 설정할수 있는기능 제스처를 사용하는 부분에서 주로 사용
// flattenOffset();
// extractOffset();

// 왼(-100) > 오(100) x값이 변화하는 애니메이션
const AnimatedValue = () => {
  const translateXAnim = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    return () => translateXAnim.removeAllListeners();
  });

  const onButtonPress = () => {
    translateXAnim.setValue(-100);
    translateXAnim.addListener(({value}) => console.log(value));
    // setTimeout(() => {
    //   translateXAnim.stopAnimation();
    // }, 500);

    setTimeout(() => {
      translateXAnim.resetAnimation();
    }, 500);
    Animated.timing(translateXAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Button title={'움직여라!'} onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 70, transform: [{translateX: translateXAnim}]}}>
        🍊
      </Animated.Text>
    </>
  );
};

export default AnimatedValue;
