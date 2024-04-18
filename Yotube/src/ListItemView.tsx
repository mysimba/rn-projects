import * as React from 'react';
import {TypeListItem} from './TypeListItem.ts';
import {Image, Text, View} from 'react-native';

const ListItemView = ({item}: {item: TypeListItem}) => {
  return (
    <View>
      <Image style={{height: 200}} source={{uri: item.thumbnail}} />
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 12,
          flexDirection: 'column',
        }}>
        <Text style={{fontSize: 16}}>{item.title}</Text>
        <Text style={{fontSize: 12}}>
          {item.channelTitle} / 조회수 {item.viewCount} / {'  '}{' '}
          {item.publishedAt}
        </Text>
      </View>
    </View>
  );
};

export default ListItemView;
