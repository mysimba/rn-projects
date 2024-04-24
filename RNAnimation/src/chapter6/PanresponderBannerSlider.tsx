import * as React from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {useRef, useState} from 'react';

const PanresponderBannerSlider = () => {
  const {width} = useWindowDimensions();
  const [focus, setFocus] = useState(0);
  const bannerAnim = useRef(new Animated.Value(0)).current;
  const pendingRef = useRef(true);

  const onButtonNavigation = (index: number) => {
    setFocus(index);
    Animated.timing(bannerAnim, {
      toValue: -index * width,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const {dy, dx} = gestureState;

      const toRight = dx < -80;
      const toLeft = dx > 80;

      if (toRight && pendingRef.current && focus < 3) {
        pendingRef.current = false;
        setFocus(focus + 1);
        Animated.timing(bannerAnim, {
          toValue: -(focus + 1) * width,
          duration: 500,
          useNativeDriver: true,
        }).start(({finished}) => {
          if (finished) {
            pendingRef.current = true;
          }
        });
      }

      if (toLeft && pendingRef.current && focus > 0) {
        pendingRef.current = false;
        setFocus(focus - 1);
        Animated.timing(bannerAnim, {
          toValue: -(focus - 1) * width,
          duration: 500,
          useNativeDriver: true,
        }).start(({finished}) => {
          if (finished) {
            pendingRef.current = true;
          }
        });
      }
    },
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        {...responder.panHandlers}
        style={{
          position: 'absolute',
          left: 0,
          flexDirection: 'row',
          transform: [{translateX: bannerAnim}],
        }}>
        {[...Array(4)].map((value, index) => (
          <View
            key={`banner${index}`}
            style={{
              width,
              height: width,
              backgroundColor: '#ffa100',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 50, color: '#ffffff'}}>{index}</Text>
          </View>
        ))}
      </Animated.View>
      <View
        style={{
          height: width,
          justifyContent: 'flex-end',
          marginTop: 60,
        }}>
        <View style={{flexDirection: 'row', gap: 8}}>
          {[...Array(4)].map((value, index) => {
            return (
              <TouchableWithoutFeedback
                key={`button${index}`}
                onPress={() => onButtonNavigation(index)}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: focus === index ? '#ffa100' : '#ffa10050',
                  }}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PanresponderBannerSlider;
