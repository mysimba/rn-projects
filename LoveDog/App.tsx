import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigation, {
  TypeRootStackNavigation,
} from './src/navigation/RootStackNavigation.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

GoogleSignin.configure({
  webClientId:
    '766418051955-b8a4lcgv830o19u1h6mbc7kd25nlf965.apps.googleusercontent.com',
});

//npx uri-scheme add lovedog --android
//npx uri-scheme open "lovedog://" --android

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer<TypeRootStackNavigation>
            linking={{
              prefixes: ['lovedog://'],
              config: {
                screens: {
                  HistoryList: '/history',
                  Main: {
                    path: '/',
                    screens: {
                      Main: '/main',
                      My: 'my',
                    },
                  },
                },
              },
            }}>
            <RootStackNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
