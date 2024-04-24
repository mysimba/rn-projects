import * as React from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRef, useState} from 'react';

const BOX = 50;
const CIRCLE = 20;
const FONT = [
  {
    title: {fontSize: 20, lineHeight: 32},
    body: {fontSize: 12},
  },
  {
    title: {fontSize: 24, lineHeight: 38},
    body: {fontSize: 14},
  },
  {
    title: {fontSize: 30, lineHeight: 40},
    body: {fontSize: 15},
  },
  {
    title: {fontSize: 38, lineHeight: 50},
    body: {fontSize: 19},
  },
];

const PanresponderFontSlider = () => {
  const [step, setStep] = useState<number>(0);
  const circleAnim = useRef(new Animated.Value(0)).current;

  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponder: () => true,

    onPanResponderStart: (e, gestureState) => {
      circleAnim.setValue(step * BOX);
    },
    onPanResponderMove: (e, gestureState) => {
      circleAnim.setValue(gestureState.dx + step * BOX);
    },
    onPanResponderEnd: (e, gestureState) => {
      const fontstep = step + Math.round(gestureState.dx / 50);
      const toValue = fontstep * BOX;
      setStep(fontstep);

      Animated.spring(circleAnim, {
        toValue,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }).start();
    },
  });
  const onPress = (index: number) => {
    setStep(index);
    Animated.spring(circleAnim, {
      toValue: index * BOX,
      useNativeDriver: true,
      tension: 70,
      friction: 7,
    }).start();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* text step 영역 */}
      <View
        style={{
          width: 200,
          height: 150,
          justifyContent: 'flex-end',
        }}>
        <View>
          <Text style={FONT[step].title}>Font Step {step + 1}</Text>
          <Text style={FONT[step].body}>font body style</Text>
        </View>

        {/* slider 영역 */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* 가로선 */}
          <View
            style={{
              width: BOX * 3,
              top: 24,
              borderBottomColor: '#ddd',
              borderBottomWidth: 2,
              position: 'absolute',
            }}
          />

          {/* 세로 회색 동그라미 */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            {[...Array(4)].map((value, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => onPress(index)}>
                <View
                  style={{
                    width: BOX,
                    height: BOX,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#ddd',
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}></View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <Animated.View
            {...responder.panHandlers}
            style={{
              width: CIRCLE,
              height: CIRCLE,
              backgroundColor: '#333',
              position: 'absolute',
              left: BOX / 2 - CIRCLE / 2,
              borderRadius: 10,
              transform: [{translateX: circleAnim}],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PanresponderFontSlider;
