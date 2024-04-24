import * as React from 'react';
import {Alert, Animated, InteractionManager, Text, View} from 'react-native';
import {useEffect, useRef} from 'react';

// Interaction Manager란
// JS 스레드 위에서, 애니메이션 후 콜백을 받을 수 있는 타이머 기능
// 선언 되어있는 애니메이션을 방해하지 않고, 다음 액션을 예약하는 타이머 기능
// 특히 JS위에서 작동하는 애니메이션의 부하를 줄일 수 있음
// 애니메이션 작동 후, 콜백을 제공하기 때문에 애니메이션 이후에 액션을 줄 수 있음.

//runAfterInteractions cancel
const InteractionManagerIntro = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    const interactionManagerPromise = InteractionManager.runAfterInteractions(
      () => {
        // 애니메이션 이후 작동시킬 액션
        Alert.alert('hello interaction manager');
      },
    );

    return () => interactionManagerPromise.cancel();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.Text style={{fontSize: 50, opacity: opacityAnim}}>
        🍊
      </Animated.Text>
    </View>
  );
};

export default InteractionManagerIntro;
