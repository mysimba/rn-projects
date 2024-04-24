import * as React from 'react';
import {PanResponder, PanResponderGestureState, Text, View} from 'react-native';
import {useState} from 'react';

const PanresponderIntro = () => {
  const [status, setStatus] = useState<PanResponderGestureState>({
    _accountsForMovesUpTo: 0,
    numberActiveTouches: 0,
    stateID: 0,
    vx: 0,
    vy: 0,
    x0: 0,
    y0: 0,
    dx: 0,
    dy: 0,
    moveX: 0,
    moveY: 0,
  });

  const responder = PanResponder.create({
    // permission method
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    // response method
    onPanResponderGrant: () => {},
    onPanResponderReject: () => {},
    // handler method
    onPanResponderStart: (e, gestureState) => {
      setStatus({...status, x0: gestureState.x0, y0: gestureState.y0});
    },
    onPanResponderMove: (e, gestureState) => {
      setStatus({...gestureState, x0: status.x0, y0: status.y0});
    },
    onPanResponderEnd: () => {},
    onPanResponderRelease: () => {},
  });

  const moveXSize = Math.floor(status.moveX - status.x0);
  const moveYSize = Math.floor(status.moveY - status.y0);

  return (
    <View
      {...responder.panHandlers}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
      }}>
      <View>
        {moveXSize > 0 ? (
          <Text>{moveXSize} 만큼 오른쪽으로 가는 중</Text>
        ) : (
          <Text>{-moveXSize} 만큼 왼쪽으로 가는 중</Text>
        )}
        {moveYSize > 0 ? (
          <Text>{moveYSize} 만큼 아래로 가는 중</Text>
        ) : (
          <Text>{-moveYSize} 만큼 위로 가는 중</Text>
        )}
      </View>
      <View style={{position: 'absolute', bottom: 70, left: 10}}>
        <Text>dx: {status.dx}</Text>
        <Text>dy: {status.dy}</Text>
        <Text>moveX: {status.moveX}</Text>
        <Text>moveY: {status.moveY}</Text>
        <Text>vx: {status.vx}</Text>
        <Text>vy: {status.vy}</Text>
        <Text>x0: {status.x0}</Text>
        <Text>y0: {status.y0}</Text>
      </View>
    </View>
  );
};

export default PanresponderIntro;
