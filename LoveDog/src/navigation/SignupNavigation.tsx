import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import InputEmailScreen from '../screens/InputEmailScreen.tsx';
import InputNameScreen from '../screens/InputNameScreen.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type TypeSignupNavigation = {
  InputEmail: {
    uid: string;
    preInput: {
      email: string;
      name: string;
      profileImage: string;
    };
  };
  InputName: {
    uid: string;
    preInput: {
      email: string;
      name: string;
      profileImage: string;
    };
    inputEmail: string;
  };
};

const Stack = createNativeStackNavigator();

const SignupNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'InputEmail'} component={InputEmailScreen} />
      <Stack.Screen name={'InputName'} component={InputNameScreen} />
    </Stack.Navigator>
  );
};

export default SignupNavigation;

export const useSignupNavigation = <
  RouteName extends keyof TypeSignupNavigation,
>() =>
  useNavigation<NativeStackNavigationProp<TypeSignupNavigation, RouteName>>();

export const useSignupRoute = <
  RouteName extends keyof TypeSignupNavigation,
>() => useRoute<RouteProp<TypeSignupNavigation, RouteName>>();
