import * as React from 'react';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen.tsx';
import AddScreen from '../screens/AddScreen.tsx';
import DetailScreen from '../screens/DetailScreen.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type ScreenParams = {
    Main: undefined;
    Add: { latitude: number; longitude: number; address: string };
    Detail: { latitude: number; longitude: number; address: string; title: string };
};

const Stack = createNativeStackNavigator<ScreenParams>();

const RootNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                presentation: 'containedModal',
            }}>
            <Stack.Screen name={'Main'} component={MainScreen}/>
            <Stack.Screen name={'Add'} component={AddScreen}/>
            <Stack.Screen name={'Detail'} component={DetailScreen}/>
        </Stack.Navigator>
    );
};

export default RootNavigation;

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
    useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
    useRoute<RouteProp<ScreenParams, RouteName>>();
