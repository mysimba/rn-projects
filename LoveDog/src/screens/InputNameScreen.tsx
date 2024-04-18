import * as React from 'react';
import {Header} from '../components/Header/Header.tsx';
import {ActivityIndicator, View} from 'react-native';
import {Button} from '../components/Button.tsx';
import {Typography} from '../components/Typography.tsx';
import {useRootStackNavigation} from '../navigation/RootStackNavigation.tsx';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation.tsx';
import {SingleLineInput} from '../components/SingleLineInput.tsx';
import {Spacer} from '../components/Spacer.tsx';
import {useCallback, useMemo, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RemoteImage} from '../components/RemoteImage.tsx';
import {Icon} from '../components/Icons.tsx';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import {uploadFile} from '../utils/FileUtils.ts';
import database from '@react-native-firebase/database';
import {setUser} from '../redux/features/userSlice.ts';
import {useAppDispatch} from '../redux';

const InputNameScreen = () => {
  const rootNavigation = useRootStackNavigation<'Signup'>();
  const navigation = useSignupNavigation<'InputName'>();
  const routes = useSignupRoute<'InputName'>();
  const safeArea = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheet | null>(null);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>(
    routes.params.preInput.name,
  );

  const [profileImage, setProfileImage] = useState(
    routes.params.preInput.profileImage,
  );

  const [selectedPhoto, setSelectedPhoto] = useState<{uri: string} | null>(
    null,
  );

  const onPressSubmit = useCallback(async () => {
    const getPhotoUrl = async () => {
      if (selectedPhoto !== null) {
        return await uploadFile(selectedPhoto.uri);
      }

      return profileImage;
    };
    const photoUrl = await getPhotoUrl();
    setIsLoading(true);

    const currentTime = new Date();
    const reference = database().ref(`member/${routes.params.uid}`);
    await reference.set({
      name: inputName,
      email: routes.params.inputEmail,
      profile: photoUrl,
      regeditAt: currentTime.toISOString(),
      lastLoginAt: currentTime.toISOString(),
    });

    const userInfo = await reference
      .once('value')
      .then(snapshot => snapshot.val());

    dispatch(
      setUser({
        uid: routes.params.uid,
        userEmail: userInfo.email,
        userName: userInfo.name,
        profileImage: userInfo.profile,
      }),
    );

    rootNavigation.reset({
      routes: [{name: 'Main'}],
    });
    setIsLoading(false);
  }, [
    selectedPhoto,
    profileImage,
    routes.params.uid,
    inputName,
    routes.params.inputEmail,
    rootNavigation,
  ]);

  const onPressProfileImage = useCallback(async () => {
    actionSheetRef.current?.show();
  }, []);

  const isValid = useMemo(() => {
    return true;
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title={'InputNameScreen'} />
        </Header.Group>
        <Header.Icon onPress={navigation.goBack} iconName={'close'} />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <Button onPress={onPressProfileImage}>
          <View style={{width: 100, height: 100}}>
            {profileImage !== '' ? (
              <>
                <RemoteImage
                  width={100}
                  height={100}
                  url={
                    selectedPhoto !== null ? selectedPhoto.uri : profileImage
                  }
                  style={{borderRadius: 50}}
                />
                <View style={{position: 'absolute', right: 0, bottom: 0}}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: 'gray',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name={'add'} size={16} color={'white'} />
                  </View>
                </View>
              </>
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name={'add'} size={32} color={'black'} />
              </View>
            )}
          </View>
        </Button>
        <Spacer space={24} />
        <SingleLineInput
          value={inputName}
          onChangeText={setInputName}
          placeholder={'이름을 입력해주세요.'}
          onSubmitEditing={() => {}}
          keyboardType={'email-address'}
        />
      </View>

      <Button onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {isLoading ? (
              <ActivityIndicator size={20} color={'white'} />
            ) : (
              <Typography fontSize={20} color={'white'}>
                회원가입
              </Typography>
            )}
          </View>
          <Spacer space={safeArea.bottom + 12} />
        </View>
      </Button>
      <ActionSheet
        ref={actionSheetRef}
        options={['사진 촬영하여 선택', '갤러리에서 선택', '취소']}
        cancelButtonIndex={2}
        onPress={async index => {
          if (index === 0) {
            rootNavigation.push('TakePhoto', {
              onTakePhoto: uri => {
                setSelectedPhoto({uri});
              },
            });
          }
          if (index === 1) {
            const photoResult = await ImagePicker.openPicker({
              width: 300,
              height: 300,
              cropping: true,
            });

            setSelectedPhoto({uri: photoResult.path});
          }
        }}
      />
    </View>
  );
};

export default InputNameScreen;
