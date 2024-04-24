import * as React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {faker} from '@faker-js/faker';
import {useRef} from 'react';

//렌더링되는 데이터를 감지하는 기능
//flatlist 컴포넌트와 Fake Data를 이용해 간단한 리스트 구현 @faker-js/faker
//viewabilityConfigCallbackParis 메서드를 이요해서 화면에 띄어지는 데이터 확인

export default function FlatlistCheckRenderItems() {
  const renderedItems = useRef([]);
  const onViewableItemsChanged = ({viewableItems}) => {
    const ViewavleItems = viewableItems.map(value => JSON.stringify(value));
    ViewavleItems.forEach(item => {
      if (renderedItems.current.findIndex(value => value === item) === -1) {
        renderedItems.current = renderedItems.current.concat(item);
        console.log(item);
      }
    });
  };

  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);
  return (
    <SafeAreaView>
      <FlatList
        data={faker.datatype.array(40)}
        renderItem={renderItem}
        keyExtractor={item => item}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </SafeAreaView>
  );
}

function renderItem({item, index}) {
  return (
    <View
      style={{padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
      <Text>
        {index}. {item}
      </Text>
    </View>
  );
}
