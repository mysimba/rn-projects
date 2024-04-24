import * as React from 'react';
import {Animated, Button, Easing, SafeAreaView, View} from 'react-native';
import {useRef} from 'react';

const ProgressBar = () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  let clickCount = 0;

  // 수동으로 20%씩 채워 100%까지 채워주는 역할
  const onRunPress = () => {
    if (clickCount < 5) {
      clickCount = clickCount + 1;
      interpolateAnim.extractOffset();

      Animated.spring(interpolateAnim, {
        toValue: 20,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }).start();
    }
  };

  //자동으로 100%까지 채워주는 역할 , 중간중간 멈추는 액션 추가
  // const onAutoRunPress = () => {
  //   Animated.sequence([
  //     Animated.spring(interpolateAnim, {
  //       toValue: 20,
  //       friction: 7,
  //       tension: 40,
  //       useNativeDriver: false,
  //     }),
  //     Animated.spring(interpolateAnim, {
  //       toValue: 70,
  //       friction: 7,
  //       tension: 40,
  //       delay: 150,
  //       useNativeDriver: false,
  //     }),
  //     Animated.spring(interpolateAnim, {
  //       toValue: 100,
  //       friction: 7,
  //       tension: 40,
  //       delay: 150,
  //       useNativeDriver: false,
  //     }),
  //   ]).start();
  // };
  const onAutoRunPress = () => {
    Animated.stagger(150 + 500, [
      Animated.timing(interpolateAnim, {
        toValue: 30,
        easing: Easing.in(Easing.bounce),
        useNativeDriver: false,
      }),
      Animated.timing(interpolateAnim, {
        toValue: 70,
        easing: Easing.in(Easing.bounce),
        useNativeDriver: false,
      }),
      Animated.timing(interpolateAnim, {
        toValue: 100,
        easing: Easing.in(Easing.bounce),
        useNativeDriver: false,
      }),
    ]).start();
  };

  //맨 처음 값으로 되돌아가는 액션
  const onResetPress = () => {
    clickCount = 0;
    interpolateAnim.flattenOffset();
    Animated.timing(interpolateAnim, {
      toValue: 0,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={{flex: 1, marginTop: 300}}>
      <Button title={'run'} onPress={onRunPress} />
      <Button title={'auto run'} onPress={onAutoRunPress} />
      <Button title={'reset'} onPress={onResetPress} />

      <View
        style={{position: 'relative', margin: 30, justifyContent: 'center'}}>
        {/* progressbar 바닥 */}
        <View
          style={{
            backgroundColor: '#222',
            height: 10,
            borderRadius: 10,
          }}></View>

        {/* progressbar 움직이는 부분 */}
        <Animated.View
          style={{
            backgroundColor: 'blue',
            height: 16,
            position: 'absolute',
            width: interpolateAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            borderRadius: 100,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProgressBar;
