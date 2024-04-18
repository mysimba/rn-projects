import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../redux';
import {FlatList, useWindowDimensions} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {TypeDog} from '../data/TypeDog.ts';
import database from '@react-native-firebase/database';
import {Button} from './Button.tsx';
import {RemoteImage} from './RemoteImage.tsx';

const HistoryListView = ({
  onPressItem,
}: {
  onPressItem: (index: number) => void;
}) => {
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();
  const [likedList, setLikedList] = useState<TypeDog[]>([]);
  const user = useAppSelector(state => state.user.user);
  const loadLikedList = useCallback(async () => {
    if (user === null) return;

    const ref = `history/${user.uid}`;
    const currentHistory = await database()
      .ref(ref)
      .once('value')
      .then(snapshot => snapshot.val());

    const dogList = Object.keys(currentHistory).map(key => {
      const item = currentHistory[key];

      return {
        photoUrl: item.url,
      } as TypeDog;
    });

    setLikedList(dogList);
  }, []);

  useEffect(() => {
    try {
      loadLikedList();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <FlatList<TypeDog>
      data={likedList}
      numColumns={2}
      renderItem={({item, index}) => {
        return (
          <Button
            testID={`Button${index}`}
            key={`imageBtn${index}`}
            onPress={() => {
              onPressItem(index);
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
  );
};

export default HistoryListView;
