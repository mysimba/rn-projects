import * as React from 'react';
import {Header} from '../components/Header/Header.tsx';
import {View} from 'react-native';
import {useRootNavigation} from '../navigations/RootNavigation.tsx';
import {Calendar} from 'react-native-calendars';
import {covertToDateString} from '../utils/DateUtils.ts';
import {useAccount} from '../context/AccountContext.ts';

const today = new Date();

const CalendarSelectScreen = () => {
  const {setItem} = useAccount();
  const navigation = useRootNavigation<'CalendarSelect'>();

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'Calendar SCREEN'}></Header.Title>
        <Header.Icon
          iconName={'close'}
          onPress={() => navigation.goBack()}></Header.Icon>
      </Header>

      <Calendar
        onDayPress={day => {
          setItem({date: day.timestamp});
          navigation.goBack();
        }}
        maxDate={covertToDateString(today.getTime())}
      />
    </View>
  );
};

export default CalendarSelectScreen;
