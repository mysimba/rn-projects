import * as React from 'react';
import {Button, Text, useWindowDimensions, View} from 'react-native';
import {useState} from 'react';

//View에서만 지원하는 LayoutEvent
//레이아웃 관련 정보를 콜백해주는 메서드
//<View onLayout={(e) => console.log(e.nativeEvent) } />
// {
// layout: {height: 00, width: 00, x: 00, y: 00}
// }
const ViewLayoutEvent = () => {
  const [number, setNumber] = useState(0);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View onLayout={e => console.log(e.nativeEvent)} style={{borderWidth: 1}}>
        <Text style={{width: 10}}>{number}</Text>
        <Button
          title="update state"
          onPress={() => setNumber(value => value + 1)}
        />
      </View>
    </View>
  );
};

export default ViewLayoutEvent;
