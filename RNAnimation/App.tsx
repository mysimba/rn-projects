/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import PanresponderBannerSlider from './src/chapter6/PanresponderBannerSlider.tsx';
import PanresponderFontSlider from './src/chapter6/PanresponderFontSlider.tsx';
import ViewLayoutEvent from './src/chapter7/ViewLayoutEvent.tsx';

function App(): React.JSX.Element {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ViewLayoutEvent />
    </SafeAreaView>
  );
}

export default App;
