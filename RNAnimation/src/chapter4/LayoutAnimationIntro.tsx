import * as React from 'react';
import {
  Button,
  LayoutAnimation,
  Platform,
  Text,
  UIManager,
  View,
} from 'react-native';
import {useState} from 'react';

// LayoutAnimation은 useState의 set함수와 함께 호출된다.
// const animation = () => {
//     LayoutAnimation.configureNext(...);
//     setCount(value => value + 1)
// }

// ios에 비해 제대로 지원하지 않기 때문에
// android 플랫폼에서 사용하기 위해선 아래와 같은 초기 세팅이 필요
// if (Platform.OS === 'android') {
//     if (UIManager.setLayoutAnimationEnabledExperimental) {
//         UIManager.setLayoutAnimationEnabledExperimental(true);
//     }
// }

//useState로 컴포넌트가 create, update, delete 될때 작동
//LayoutAnimation은 미리 Native 코드를 전달해놓고,
//상태가 변화할 때마다 애니메이션이 발생시키는 방식
//LayoutAnimation 호출 시, 행동할 setState를 같이 핸들링 해줌으로,
//해당 state에 애니메이션을 반영할 수 있음

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

//useState update, create, delete > LayoutAnimation 어떤/어떻게 인터렉션을 줄수 있을까?
const LayoutAnimationIntro = () => {
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(true);

  const onButtonPress = () => {
    // LayoutAnimation.configureNext(
    //   {
    //     duration: 300,
    //     // type: easeIn, spring, linear
    //     // property: opacity, scaleX, scaleY, scaleXY

    //     create: {type: 'easeIn', property: 'opacity'},
    //     update: {type: 'spring', property: 'scaleX', springDamping: 0.3},
    //     delete: {type: 'linear', property: 'scaleXY'},
    //   },
    //   () => console.log('end'),
    //   () => console.log('fail'),
    // );

    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    // LayoutAnimation.configureNext(
    //   {
    //     duration: 300,
    //     // type: easeIn, spring, linear
    //     // property: opacity, scaleX, scaleY, scaleXY
    //
    //     create: {type: 'easeIn', property: 'opacity'},
    //     update: {type: 'spring', property: 'scaleX', springDamping: 0.3},
    //     delete: {type: 'linear', property: 'scaleXY'},
    //   },
    //   () => console.log('end'),
    //   () => console.log('fail'),
    // );

    setCount(value => value * 10);
    setShow(value => !value);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title={'layout animation 작동!'} onPress={onButtonPress} />
      <View style={{width: 250, height: 250}}>
        <View style={{backgroundColor: 'orange'}}>
          <Text style={{fontSize: 50}}>{count}</Text>
        </View>
        {show && (
          <View style={{backgroundColor: 'green', marginTop: 10}}>
            <Text style={{fontSize: 30}}>보이는 컴포넌트</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LayoutAnimationIntro;
