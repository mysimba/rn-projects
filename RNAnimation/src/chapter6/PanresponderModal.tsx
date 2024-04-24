import * as React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Animated,
  Button,
  Easing,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRef, useState} from 'react';

function ListItem({
  color = '#333',
  icon,
  title,
  onPress,
}: {
  color?: string;
  icon: string;
  title: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        height: 60,
      }}>
      <Icon name={icon} size={20} color={color} />
      <Text style={{color, fontSize: 15}}>{title}</Text>
    </View>
  );
}

const PanresponderModal = () => {
  const responder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 100) {
        hideModal();
      }
    },
  });
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);
  const hideModal = () => {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setShow(false);
      }
    });
  };

  const showModal = () => {
    setShow(true);
    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 100}}>
        <Button title={'open Modal'} onPress={showModal} />
      </View>
      {show && (
        <>
          {/* meun background */}
          <TouchableWithoutFeedback onPress={hideModal}>
            <Animated.View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#00000090',
                opacity: interpolateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              }}
            />
          </TouchableWithoutFeedback>

          {/* menu contents */}
          <Animated.View
            {...responder.panHandlers}
            style={{
              position: 'absolute',
              bottom: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-1000, 0],
              }),
              borderWidth: 1,
              backgroundColor: 'white',
              width: '100%',
              padding: 20,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottomWidth: 0,
            }}>
            <ListItem
              onPress={hideModal}
              icon={'pushpino'}
              title={'저장하기'}
            />
            <ListItem onPress={hideModal} icon={'hearto'} title={'좋아요'} />
            <ListItem onPress={hideModal} icon={'delete'} title={'삭제하기'} />
            <ListItem
              onPress={hideModal}
              color={'#999'}
              icon={'back'}
              title={'닫기'}
            />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default PanresponderModal;
