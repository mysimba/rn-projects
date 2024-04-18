import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {
  useRootNavigation,
  useRootRoute,
} from '../navigations/RootNavigation.tsx';
import {Button} from '../components/Button.tsx';
import {useCallback, useEffect, useState} from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory.ts';
import {Typography} from '../components/Typography.tsx';
import {Spacer} from '../components/Spacer.tsx';
import {SingleLineInput} from '../components/SingleLineInput.tsx';
import {Icon} from '../components/Icons.tsx';
import {covertToDateString} from '../utils/DateUtils.ts';
import {MultiLineInput} from '../components/MultiLineInput.tsx';
import {useAccount} from '../context/AccountContext.ts';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem.ts';
import {RemoteImage} from '../components/RemoteImage.tsx';

const AddUpdateScreen = () => {
  const {item, setItem} = useAccount();
  const navigation = useRootNavigation();
  const routes = useRootRoute<'Add' | 'Update'>();
  const {insertItem, updateItem} = useAccountBookHistoryItem();

  useEffect(() => {
    if (routes.params?.item) {
      setItem({...item});
    }
  }, []);

  const onPressType = useCallback<(type: AccountBookHistory['type']) => void>(
    type => {
      if (routes.name === 'Update') {
        return;
      }
      setItem({type});
    },
    [routes.name, setItem],
  );

  const onChangePrice = useCallback<(text: string) => void>(
    text => {
      setItem({price: parseInt(text)});
    },
    [setItem],
  );

  const onPressPhoto = useCallback<() => void>(() => {
    navigation.push('TakePhoto');
  }, []);

  const onPressCalendar = useCallback<() => void>(() => {
    navigation.push('CalendarSelect');
  }, [navigation]);

  const onChangeComment = useCallback<(text: string) => void>(
    text => {
      setItem({comment: text});
    },
    [setItem],
  );

  const onPressSave = useCallback(async () => {
    if (routes.name === 'Add') {
      insertItem(item);
    }

    if (routes.name === 'Update') {
      const result = await updateItem(item);
      setItem({...result});
    }

    navigation.goBack();
  }, [routes.name, insertItem, item, navigation, updateItem, setItem]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'Add/Update SCREEN'}></Header.Title>
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
            <Button onPress={() => onPressType('사용')}>
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
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button onPress={() => onPressType('수입')}>
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
            </Button>
          </View>
        </View>

        <Spacer space={20} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <SingleLineInput
              value={item.price === 0 ? '' : item.price.toString()}
              onChangeText={onChangePrice}
              placeholder={'금액을 입력해주세요.'}
              keyboardType={'number-pad'}
              fontSize={16}
            />

            <Spacer space={24} />

            <Button onPress={onPressCalendar}>
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
                  {item.date !== 0
                    ? covertToDateString(item.date)
                    : '날짜를 선택하세요.'}
                </Typography>
              </View>
            </Button>
          </View>
          <View style={{marginLeft: 24}}>
            <Button onPress={onPressPhoto}>
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
                  }}>
                  <Icon name={'add'} size={24} color={'grey'} />
                </View>
              )}
            </Button>
          </View>
        </View>
        <Spacer space={12} />
        <MultiLineInput
          value={item.comment}
          height={100}
          onChangeText={onChangeComment}
          placeholder={'어떤 일인가요?'}
          onSubmitEditing={() => {}}
        />

        <Spacer space={64} />
        <Button onPress={onPressSave}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Typography color={'white'} fontSize={16}>
              {routes.name === 'Add' ? '저장하기' : '수정하기'}
            </Typography>
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddUpdateScreen;
