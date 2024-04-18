import * as React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {useRootNavigation} from '../navigations/RootNavigation.tsx';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useCallback, useEffect, useRef} from 'react';
import {Button} from '../components/Button.tsx';
import {useAccount} from '../context/AccountContext.ts';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const TakePhotoScreen = () => {
  const {setItem} = useAccount();
  const navigation = useRootNavigation<'TakePhoto'>();
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const onPressTakePhoto = useCallback(async () => {
    const result = await cameraRef.current?.takePhoto();

    if (result) {
      const path = `${Platform.OS === 'android' ? 'file://' : ''}${
        result.path
      }`;

      const saveResult = await CameraRoll.saveAsset(path, {type: 'photo'});

      setItem({photoUrl: saveResult.node.image.uri});

      navigation.goBack();
    }
  }, [setItem, navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'사진 찍기'}></Header.Title>
        <Header.Icon
          iconName={'close'}
          onPress={navigation.goBack}></Header.Icon>
      </Header>
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          {device && (
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              photo
            />
          )}
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button onPress={onPressTakePhoto}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: 'white',
                }}></View>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default TakePhotoScreen;
