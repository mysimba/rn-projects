import * as React from 'react';
import {Animated, Button, Easing} from 'react-native';
import {useRef} from 'react';

//spring 메뉴는 끝을 넘어서도 bounce가 가능한데 timing은 불가능
// Easing ease / back / bounce / elastic / circle
const AnimatedTiming = () => {
  const translateXAnim = useRef(new Animated.Value(-100)).current;
  const onButtonPress = () => {
    translateXAnim.setValue(-100);
    //easing옵션은
    //animation이 함수 linear 값에 따라 움직인다. 상세는 http://easings.net 을 참고
    Animated.timing(translateXAnim, {
      toValue: 100,
      duration: 1000,
      //easing: Easing.in(Easing.back(2)), in, out, inOut 방향에 따라 2정도 뒤로 갔다가 움직임
      //easing: Easing.in(Easing.ease), in, inOut 상관없이 일정하게
      // easing: Easing.out(Easing.elastic(2)), 어느정도 넘치게 bounce가 이뤄지느냐
      // easing: Easing.out(Easing.circle), 시작속도가 빠르고 끝속도가 느리다 유저관점에서 편리할듯
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

export default AnimatedTiming;
