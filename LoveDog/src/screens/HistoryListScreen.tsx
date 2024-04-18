import * as React from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {useRootStackNavigation} from '../navigation/RootStackNavigation.tsx';
import {useAppDispatch, useAppSelector} from '../redux';
import {useEffect, useState} from 'react';
import {getUserLikedHistory} from '../redux/features/userSlice.ts';
import {TypeDog} from '../data/TypeDog.ts';
import {Button} from '../components/Button.tsx';
import {RemoteImage} from '../components/RemoteImage.tsx';
import ImageView from 'react-native-image-viewing';

const HistoryListScreen = () => {
  const likedList = useAppSelector(state => state.user.history);
  const {width} = useWindowDimensions();
  const rootNavigation = useRootStackNavigation<'HistoryList'>();
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  useEffect(() => {
    dispatch(getUserLikedHistory());
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'HistoryListScreen'} />
        <Header.Icon iconName={'close'} onPress={rootNavigation.goBack} />
      </Header>
      <FlatList<TypeDog>
        data={likedList}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <Button
              key={`imageBtn${index}`}
              onPress={() => {
                setVisible(true);
                setSelectedIdx(index);
              }}>
              <RemoteImage
                testID={'image'}
                url={item.photoUrl}
                width={width * 0.5}
                height={width * 0.5}
              />
            </Button>
          );
        }}
      />
      <ImageView
        images={likedList.map(item => ({uri: item.photoUrl}))}
        imageIndex={selectedIdx}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      />
    </View>
  );
};

export default HistoryListScreen;
