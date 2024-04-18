import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen.tsx';
import AddUpdateScreen from '../screens/AddUpdateScreen.tsx';
import DetailScreen from '../screens/DetailScreen.tsx';
import MonthlyScreen from '../screens/MonthlyScreen.tsx';
import {AccountBookHistory} from '../data/AccountBookHistory.ts';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import CalendarSelectScreen from '../screens/CalendarSelectScreen.tsx';
import TakePhotoScreen from '../screens/TakePhotoScreen.tsx';

type ScreenParams = {
  Add: undefined;
  Main: undefined;
  Update: {item: AccountBookHistory};
  Detail: {item: AccountBookHistory};
  MonthlyAverage: undefined;
  CalendarSelect: undefined;
  TakePhoto: undefined;
};

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'containedModal'}}>
      <Stack.Screen name={'Main'} component={MainScreen} />
      <Stack.Screen name={'Add'} component={AddUpdateScreen} />
      <Stack.Screen name={'Update'} component={AddUpdateScreen} />
      <Stack.Screen name={'MonthlyAverage'} component={MonthlyScreen} />
      <Stack.Screen name={'Detail'} component={DetailScreen} />
      <Stack.Screen name={'CalendarSelect'} component={CalendarSelectScreen} />
      <Stack.Screen name={'TakePhoto'} component={TakePhotoScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
