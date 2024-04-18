// @flow
import * as React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {useRootStackNavigation} from '../navigation/RootStackNavigation.tsx';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useAppDispatch} from '../redux';
import {setUser} from '../redux/features/userSlice.ts';

const IntroScreen = () => {
  const rootNavigation = useRootStackNavigation<'Intro'>();
  const safeArea = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [visibleGoogleBtn, setVisibleGoogleBtn] = useState<boolean>(true);

  const checkUserLoginOnce = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();

    if (!isSignIn) return;

    const result = await GoogleSignin.signInSilently();
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);
    const uid = authResult.user.uid;
    const currentTime = new Date();
    const reference = database().ref(`member/${uid}`);
    await reference.update({
      lastLoginAt: currentTime.toISOString(),
    });

    const userInfo = await reference
      .once('value')
      .then(snapshot => snapshot.val());

    dispatch(
      setUser({
        uid,
        userEmail: userInfo.email,
        userName: userInfo.name,
        profileImage: userInfo.profile,
      }),
    );

    rootNavigation.reset({
      routes: [{name: 'Main'}],
    });
  }, [rootNavigation, dispatch]);

  const onPressGoogleSignIn = useCallback(async () => {
    const isSignIn = await GoogleSignin.isSignedIn();
    if (isSignIn) {
      setVisibleGoogleBtn(true);
      await GoogleSignin.signOut();
    }

    setVisibleGoogleBtn(false);

    const result = await GoogleSignin.signIn({});
    const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
    const authResult = await auth().signInWithCredential(googleCredential);

    const uid = authResult.user.uid;

    const currentTime = new Date();
    const reference = database().ref(`member/${uid}`);
    const user = await reference
      .once('value')
      .then(snapshots => snapshots.val());
    await reference.update({
      lastLoginAt: currentTime.toISOString(),
    });

    if (user !== null) {
      const userInfo = await reference
        .once('value')
        .then(snapshot => snapshot.val());

      dispatch(
        setUser({
          uid: uid,
          userEmail: userInfo.email,
          userName: userInfo.name,
          profileImage: userInfo.profile,
        }),
      );

      rootNavigation.reset({
        routes: [{name: 'Main'}],
      });

      return;
    }

    rootNavigation.push('Signup', {
      screen: 'InputEmail',
      params: {
        preInput: {
          email: result.user.email,
          name: result.user.name ?? 'Unknown',
          profileImage: result.user.photo ?? '',
        },
        uid: authResult.user.uid,
      },
    });
  }, [rootNavigation, dispatch]);

  useEffect(() => {
    checkUserLoginOnce();
  }, [checkUserLoginOnce]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'IntroScreen'} />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 32 + safeArea.bottom,
        }}>
        {visibleGoogleBtn && (
          <GoogleSigninButton onPress={onPressGoogleSignIn} />
        )}
      </View>
    </View>
  );
};

export default IntroScreen;
