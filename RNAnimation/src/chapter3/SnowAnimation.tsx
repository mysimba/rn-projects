import * as React from 'react';
import {Animated, SafeAreaView, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useEffect, useRef} from 'react';

const SnowAnimation = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#121723', flex: 1}}>
      {[...Array(100)].map((value, index) => {
        const interpolateAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.loop(
            Animated.timing(interpolateAnim, {
              toValue: 1,
              delay: index * 100,
              duration: 5000,
              useNativeDriver: false,
            }),
          ).start();
        }, []);

        return (
          <Animated.View
            key={`snow${index}`}
            style={{
              position: 'absolute',
              top: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['-10%', '120%'],
              }),
              left: `${Math.floor(Math.random() * 100)}%`,
            }}>
            <Icon name={'snowflake-2'} size={16} color={'#fff'} />
          </Animated.View>
        );
      })}
    </SafeAreaView>
  );
};

export default SnowAnimation;
