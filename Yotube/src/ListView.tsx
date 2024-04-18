import * as React from 'react';
import {FlatList} from 'react-native';
import ListItemView from './ListItemView.tsx';
import {useYotubeData} from './useYotubeData.ts';
import {useEffect} from 'react';

const ListView = () => {
  const {loadData, data, loadMoreData} = useYotubeData();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <ListItemView item={item} />}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
    />
  );
};

export default ListView;
