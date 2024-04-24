import * as React from 'react';
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackComponent,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {collapseData} from '../utils/data.ts';
import {useRef} from 'react';

const Collapse = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {collapseData.map((value, index) => {
        const interpolateAnim = useRef(new Animated.Value(0)).current;
        let isOpened = false;

        const onPress = () => {
          Animated.timing(interpolateAnim, {
            toValue: isOpened ? 0 : 1,
            useNativeDriver: false,
            duration: 200,
          }).start(() => {
            isOpened = !isOpened;
          });
        };

        return (
          <View key={`collapse${index}`}>
            <TouchableWithoutFeedback onPress={onPress}>
              {/*질문영역*/}
              <View
                style={{
                  backgroundColor: '#d646f0',
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                    flexShrink: 1,
                  }}>
                  {value.q}
                </Text>
                <Animated.View
                  style={{
                    flexShrink: 1,
                    marginLeft: 10,
                    transform: [
                      {
                        rotate: interpolateAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '180deg'],
                        }),
                      },
                    ],
                  }}>
                  <Icon name="expand-more" size={24} color="yellow" />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>

            {/*답변 영역*/}
            <Animated.View
              style={{
                height: interpolateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100],
                }),
                paddingHorizontal: 40,
                justifyContent: 'center',
                borderBottomColor: '#d646f0',
                borderBottomWidth: 0.5,
              }}>
              <Text style={{fontSize: 14}}>{value.a}</Text>
            </Animated.View>
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default Collapse;
