import * as React from 'react';
import {Animated, Button, View} from 'react-native';
import {useRef} from 'react';

//y축 -100, 100으로 이동하는 spring 애니메이션
const AnimatedSpring = () => {
  const translateYAnim = useRef(new Animated.Value(-100)).current;
  const onButtonPress = () => {
    translateYAnim.setValue(-100);
    Animated.spring(translateYAnim, {
      toValue: 100,
      //이렇게 띄어쓰기해놓은 그룹으로만 사용하여야 한다.
      // bounciness: 8, //탄력 제어 느슨해질지 탄력을 가질지
      // speed: 12, //애니메이션 속도

      // friction: 7, //얼마나 빨리 에너지를 소비하는가
      // tension: 40, //스프링이 얼마나 많은 에너지를 가졌는기

      // stiffness: 100, //스프링의 강도
      // damping: 10, //마찰력
      // mass: 1, //용수철 끝에 매달려있는 물체의 질량

      velocity: 0, //스프링에 달려있는 물체의 초기속도 좀더 자연스럽게 설정가능
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Button title={'스프링으로 움직인다'} onPress={onButtonPress} />
      <Animated.Text
        style={{fontSize: 70, transform: [{translateY: translateYAnim}]}}>
        🍊
      </Animated.Text>
    </View>
  );
};

export default AnimatedSpring;
