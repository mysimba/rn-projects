import * as React from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {
  useRootNavigation,
  useRootRoute,
} from '../navigations/RootNavigation.tsx';
import {Button} from '../components/Button.tsx';
import {Typography} from '../components/Typography.tsx';
import {Spacer} from '../components/Spacer.tsx';
import {SingleLineInput} from '../components/SingleLineInput.tsx';
import {covertToDateString} from '../utils/DateUtils.ts';
import {RemoteImage} from '../components/RemoteImage.tsx';
import {Icon} from '../components/Icons.tsx';
import {MultiLineInput} from '../components/MultiLineInput.tsx';
import {useCallback, useEffect} from 'react';
import {useAccount} from '../context/AccountContext.ts';

const DetailScreen = () => {
  const {item, setItem} = useAccount();
  const navigation = useRootNavigation<'Detail'>();
  const routes = useRootRoute<'Detail'>();

  useEffect(() => {
    if (routes.params.item.id) setItem(routes.params.item);

    return () => {
      setItem({
        type: '사용',
        price: 0,
        comment: '',
        updatedAt: 0,
        createAt: 0,
        photoUrl: null,
        date: 0,
      });
    };
  }, []);

  const onPressUpdate = useCallback(() => {
    navigation.push('Update', {item: routes.params.item});
  }, [navigation, routes.params.item]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'Detail SCREEN'}></Header.Title>
        <Header.Icon
          iconName={'close'}
          onPress={() => {
            navigation.goBack();
          }}></Header.Icon>
      </Header>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 32, paddingHorizontal: 24}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: item.type === '사용' ? 'black' : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              }}>
              <Typography
                fontSize={16}
                color={item.type === '사용' ? 'white' : 'black'}>
                사용
              </Typography>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: item.type === '수입' ? 'black' : 'white',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              }}>
              <Typography
                fontSize={16}
                color={item.type === '수입' ? 'white' : 'black'}>
                수입
              </Typography>
            </View>
          </View>
        </View>

        <Spacer space={20} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
              }}>
              <Typography
                fontSize={16}
                color={item.date === 0 ? 'lightgray' : 'gray'}>
                {item.price.toString() + '원'}
              </Typography>
            </View>

            <Spacer space={24} />

            <View
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
              }}>
              <Typography
                fontSize={16}
                color={item.date === 0 ? 'lightgray' : 'gray'}>
                {covertToDateString(item.date)}
              </Typography>
            </View>
          </View>
          <View style={{marginLeft: 24}}>
            {item.photoUrl ? (
              <RemoteImage
                url={item.photoUrl}
                width={100}
                height={100}
                style={{borderRadius: 12}}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            )}
          </View>
        </View>
        <Spacer space={12} />
        <View
          style={{
            alignSelf: 'stretch',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
            height: 100,
          }}>
          <Typography fontSize={20}>{item.comment}</Typography>
        </View>

        <Spacer space={64} />
        <Button onPress={onPressUpdate}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Typography color={'white'} fontSize={16}>
              {'수정하기'}
            </Typography>
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
