import * as React from 'react';
import {
  useRootStackNavigation,
  useRootStackRoute,
} from '../navigation/RootStackNavigation.tsx';
import {useCallback, useEffect, useRef} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {Header} from '../components/Header/Header.tsx';
import {Platform, StyleSheet, View} from 'react-native';
import {Button} from '../components/Button.tsx';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const TakePhotoScreen = () => {
  const routes = useRootStackRoute<'TakePhoto'>();
  const navigation = useRootStackNavigation<'TakePhoto'>();
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

      routes.params.onTakePhoto(saveResult.node.image.uri);

      navigation.goBack();
    }
  }, [routes.params, navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title={'사진 찍기'} />
        </Header.Group>
        <Header.Icon onPress={navigation.goBack} iconName={'close'} />
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
