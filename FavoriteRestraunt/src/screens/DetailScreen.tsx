import * as React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {Typography} from '../components/Typography.tsx';
import {Spacer} from '../components/Spacer.tsx';
import MapView, {Marker} from 'react-native-maps';
import {Button} from '../components/Button.tsx';
import {useCallback} from 'react';
import {
  useRootNavigation,
  useRootRoute,
} from '../navigation/RootNavigation.tsx';
import KaKaoShareLink from 'react-native-kakao-share-link';

const DetailScreen = () => {
  const routes = useRootRoute<'Detail'>();
  const navigation = useRootNavigation<'Detail'>();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPressKakaoShare = useCallback(() => {
    KaKaoShareLink.sendLocation({
      address: routes.params.address,
      addressTitle: routes.params.title,
      content: {
        title: routes.params.title,
        imageUrl:
          'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
        link: {
          webUrl: 'https://developers.kakao.com/',
          mobileWebUrl: 'https://developers.kakao.com/',
        },
        description: 'description',
      },
    });
    navigation.goBack();
  }, [routes.params.address, routes.params.title, navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'Detail'} />
        <Header.Icon iconName={'close'} onPress={onPressBack} />
      </Header>
      <View style={{flex: 1, paddingTop: 24, paddingHorizontal: 24}}>
        <Typography fontSize={16}>가게명</Typography>

        <Spacer space={8} />

        <Typography fontSize={20}>{routes.params.title}</Typography>

        <Spacer space={24} />

        <Typography fontSize={16}>주소</Typography>

        <Spacer space={8} />

        <Typography fontSize={20}>{routes.params.address}</Typography>

        <Spacer space={24} />

        <Typography fontSize={16}>위치</Typography>

        <Spacer space={8} />

        <MapView
          style={{height: 200}}
          region={{
            latitude: routes.params.latitude,
            longitude: routes.params.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.003,
          }}>
          <Marker
            coordinate={{
              latitude: routes.params.latitude,
              longitude: routes.params.longitude,
            }}
          />
        </MapView>

        <Spacer space={24} />

        <Button onPress={onPressKakaoShare}>
          <View
            style={{
              backgroundColor: 'yellow',
              paddingHorizontal: 24,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography fontSize={20} color={'black'}>
              카카오 공유하기
            </Typography>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default DetailScreen;
