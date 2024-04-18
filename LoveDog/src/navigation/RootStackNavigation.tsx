// @flow
import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import IntroScreen from '../screens/IntroScreen.tsx';
import SignupNavigation, {TypeSignupNavigation} from './SignupNavigation.tsx';
import BottomTabNavigation from './BottomTabNavigation.tsx';
import HistoryListScreen from '../screens/HistoryListScreen.tsx';
import {
  RouteProp,
  useNavigation,
  useRoute,
  NavigatorScreenParams,
} from '@react-navigation/native';
import TakePhotoScreen from '../screens/TakePhotoScreen.tsx';
import {useAppSelector} from '../redux';

export type TypeRootStackNavigation = {
  Intro: undefined;
  Signup: NavigatorScreenParams<TypeSignupNavigation>;
  Main: undefined;
  HistoryList: undefined;
  TakePhoto: {onTakePhoto: (uri: string) => void};
};

const Stack = createNativeStackNavigator();

const RootStackNavigation = () => {
  const isSignIn = useAppSelector(state => state.user.user) !== null;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Intro'} component={IntroScreen} />

      {!isSignIn && (
        <Stack.Screen name={'Signup'} component={SignupNavigation} />
      )}
      {isSignIn && (
        <>
          <Stack.Screen name={'Main'} component={BottomTabNavigation} />
          <Stack.Screen name={'HistoryList'} component={HistoryListScreen} />
        </>
      )}
      <Stack.Screen name={'TakePhoto'} component={TakePhotoScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;

export const useRootStackNavigation = <
  RouteName extends keyof TypeRootStackNavigation,
>() =>
  useNavigation<
    NativeStackNavigationProp<TypeRootStackNavigation, RouteName>
  >();

export const useRootStackRoute = <
  RouteName extends keyof TypeRootStackNavigation,
>() => useRoute<RouteProp<TypeRootStackNavigation, RouteName>>();
