import * as React from 'react';
import {Header} from '../components/Header/Header.tsx';
import {View} from 'react-native';

const MonthlyScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'Monthly SCREEN'}></Header.Title>
        <Header.Icon iconName={'close'} onPress={() => {}}></Header.Icon>
      </Header>
    </View>
  );
};

export default MonthlyScreen;
