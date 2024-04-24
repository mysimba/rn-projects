import * as React from 'react';
import {
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  UIManager,
  View,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LayoutAnimationHeader = () => {
  const [expended, setExpended] = useState(true);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (y > 10) setExpended(false);
    else setExpended(true);
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      {/* 스크롤이 되는 높이를 측정을 해야함. */}
      <ScrollView
        contentContainerStyle={{height: 1000}}
        onScroll={e => onScroll(e)}
        scrollEventThrottle={1}>
        {expended ? (
          <View style={{backgroundColor: '#333'}}>
            <SafeAreaView style={{flexDirection: 'row'}}>
              <View
                style={{
                  backgroundColor: '#222',
                  marginLeft: 20,
                  marginRight: 10,
                  marginBottom: -10,
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'person'} size={30} color={'white'} />
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: 2,
                    marginTop: 8,
                  }}>
                  개발자 심바
                </Text>
                <Text style={{color: 'white', fontSize: 13}}>
                  힘이 들면 힘들내야지!
                </Text>
              </View>
            </SafeAreaView>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#333',
              height: 250,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                bottom: -100,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#222',
                  width: 160,
                  height: 160,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="person" size={100} color="#333" />
              </View>
              <Text style={{fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>
                개발자 심바
              </Text>
              <Text style={{fontSize: 14, marginTop: 10}}>
                힘이 들면 힘들내야지!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default LayoutAnimationHeader;
