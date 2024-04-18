import * as React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {useAppDispatch, useAppSelector} from '../redux';
import {useCallback, useEffect} from 'react';
import {getDog, likeDog} from '../redux/features/dogSlice.ts';
import {Typography} from '../components/Typography.tsx';
import {Spacer} from '../components/Spacer.tsx';
import {Button} from '../components/Button.tsx';
import {Icon} from '../components/Icons.tsx';
import {RemoteImage} from '../components/RemoteImage.tsx';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const MainScreen = () => {
  const {width} = useWindowDimensions();

  const dog = useAppSelector(state => state.dog.currentDog);
  const dispatch = useAppDispatch();

  const onPressLike = useCallback(() => {
    if (!dog) return;
    dispatch(likeDog(dog));
  }, [dog, dispatch]);

  const onPressNotLike = useCallback(() => {
    dispatch(getDog());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDog());
  }, []);

  const start = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {})
    .onUpdate(event => {
      offset.value = {
        x: event.translationX + start.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      if (offset.value.x < -150) {
        runOnJS(onPressLike)();
      }

      if (offset.value.x > 150) {
        runOnJS(onPressNotLike)();
      }

      offset.value = {
        x: 0,
        y: 0,
      };
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            offset.value.x,
            [-200, 0, 200],
            [-100, 0, 100],
          ),
        },

        {
          translateY: interpolate(
            offset.value.x,
            [-200, 0, 200],
            [-50, 0, -50],
          ),
        },
        {
          rotate: `${interpolate(
            offset.value.x,
            [-200, 0, 200],
            [30, 0, -30],
          )}deg`,
        },
      ],
    };
  });

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'MainScreen'} />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {dog !== null && (
          <View style={{width: width * 0.85}}>
            <GestureDetector gesture={gesture}>
              <Animated.View
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Animated.View style={animatedStyle}>
                  <RemoteImage
                    url={dog.photoUrl}
                    width={width * 0.7}
                    height={width * 0.7}
                  />
                </Animated.View>
              </Animated.View>
            </GestureDetector>

            <Spacer space={64} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 4}}>
                <Button onPress={onPressLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon name="thumbs-up" color="white" size={16} />
                    <Typography fontSize={20} color="white">
                      LIKE
                    </Typography>
                  </View>
                </Button>
              </View>

              <View style={{flex: 1, marginLeft: 4}}>
                <Button onPress={onPressNotLike}>
                  <View
                    style={{
                      paddingVertical: 12,
                      backgroundColor: 'blue',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                    }}>
                    <Icon name="thumbs-down" color="white" size={16} />
                    <Typography fontSize={20} color="white">
                      NOT LIKE
                    </Typography>
                  </View>
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MainScreen;
