import * as React from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRef} from 'react';

const DrawerMenu = () => {
  const {width} = useWindowDimensions();
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  const onOpenPress = () => {
    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  };

  const onHidePress = () => {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.in(Easing.circle),
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* HOME */}
      <View style={{backgroundColor: '#aff100', flex: 1}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableHighlight
            underlayColor={'#ffffff50'}
            onPress={onOpenPress}
            style={{borderRadius: 100}}>
            <View style={{padding: 14}}>
              <Icon name={'menu'} size={30} color={'#222'} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
      {/* MENU BG */}
      <TouchableNativeFeedback onPress={onHidePress}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            width: interpolateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '300%'], //Dimension
            }),
            height: '100%',
            backgroundColor: interpolateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['#00000000', '#00000090'], //Dimension
            }),
          }}
        />
      </TouchableNativeFeedback>

      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          width: '90%',
          height: '100%',
          backgroundColor: '#ffffff',
          zIndex: 10,
          transform: [
            {
              translateX: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [Math.round(-width * 0.9), 0], //Dimension
              }),
            },
          ],
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{padding: 10, fontSize: 22}}>menu</Text>
            <Text style={{padding: 10, fontSize: 22}}>menu</Text>
            <Text style={{padding: 10, fontSize: 22}}>menu</Text>
          </View>
          <View>
            <TouchableHighlight
              underlayColor={'#aff10050'}
              onPress={onHidePress}
              style={{borderRadius: 100}}>
              <View style={{padding: 14}}>
                <Icon name={'close'} size={30} color={'#222'} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default DrawerMenu;
