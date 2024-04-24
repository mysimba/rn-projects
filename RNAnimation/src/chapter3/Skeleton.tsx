import * as React from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Skeleton = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
      }}>
      {[...Array(8)].map((value, index) => {
        return (
          <View
            style={{flexDirection: 'row', marginVertical: 8}}
            key={`skel${index}`}>
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: '#dfdfdf',
                borderRadius: 4,
              }}
            />
            <View style={{marginLeft: 10, flex: 1}}>
              <View
                style={{
                  width: '80%',
                  height: 14,
                  backgroundColor: '#dfdfdf',
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: '100%',
                  height: 14,
                  backgroundColor: '#dfdfdf',
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 80,
                  height: 8,
                  backgroundColor: '#dfdfdf',
                  borderRadius: 4,
                }}
              />
            </View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#ffffff00', '#ffffff90', '#ffffff00']}>
              <View style={{width: 40, height: 100}} />
            </LinearGradient>
          </View>
        );
      })}
    </View>
  );
};

export default Skeleton;
