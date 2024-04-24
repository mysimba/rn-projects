import * as React from 'react';
import {Animated, Button, View} from 'react-native';
import {useRef} from 'react';

//property
//애니메이션을 줄 수 있는 스타일 속성들을 말합니다.
//일반적으로 opacity, transform - translateX, translateY, scale .. 정도만 지원합니다.
//property의 쓸수 있는 범위를 늘리려면 useNativeDriver를 false로 주면된다.

//height 100 > 200 timing
//height의 경우 animated value값을 넣으려고 하면 에러가 발생한다 useNativeDriver로 프로퍼티 영역을 확장해준다.
//interpolate를 사용하여 보간법을 사용한다. 100 -> 200으로 변할때 outputRage 뭐가 뭐에서 바뀔지 중간 단계를 몇개더 추가해줄수있다.
//backgroundColor: heightAnim.interpolate({
//             inputRange: [100, 200],
//             outputRange: ['#ffa100', '#aff100'],
//           }),
const AnimatedProperty = () => {
  const heightAnim = useRef(new Animated.Value(100)).current;
  const onButtonPress = () => {
    Animated.timing(heightAnim, {
      toValue: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <Button title={'커져라!'} onPress={onButtonPress} />
      <Animated.View
        style={{
          width: 100,
          height: heightAnim,
          backgroundColor: heightAnim.interpolate({
            inputRange: [100, 200],
            outputRange: ['#ffa100', '#aff100'],
          }),
          transform: [
            {
              rotate: heightAnim.interpolate({
                inputRange: [100, 200],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
    </>
  );
};

export default AnimatedProperty;
