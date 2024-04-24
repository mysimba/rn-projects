import * as React from 'react';
import {Animated, Button, Text} from 'react-native';
import {useRef} from 'react';

const AnimatedComponents = () => {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const onButtonPress = () => {
    //timing에는 value와 config 값이 들어간다
    Animated.timing(opacityAnim, {
      //useNativeDriver animation이 시작되기전에
      //미리 애니메이션을 native에 보내 브릿지를 거치지 않고 매프레임 동작을 가능하게 한다.
      useNativeDriver: true,
      toValue: 0,
    }).start();
  };

  return (
    <>
      <Button title={'사라져라!'} onPress={onButtonPress} />
      <Animated.Text style={{fontSize: 70, opacity: opacityAnim}}>
        🍊
      </Animated.Text>
    </>
  );
};

export default AnimatedComponents;
