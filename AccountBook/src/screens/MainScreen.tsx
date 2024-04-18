import * as React from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {useCallback, useState} from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory.ts';
import AccountHistoryListItemView from '../components/AccountHistoryListItemView.tsx';
import {useRootNavigation} from '../navigations/RootNavigation.tsx';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button.tsx';
import {Icon} from '../components/Icons.tsx';
import {useAccountBookHistoryItem} from '../hooks/useAccountBookHistoryItem.ts';
import {useFocusEffect} from '@react-navigation/native';
import {StackedBarChart} from 'react-native-chart-kit';

const now = new Date().getTime();

const MainScreen = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const {getList, getMonthlyAverage} = useAccountBookHistoryItem();
  const {width} = useWindowDimensions();

  const [list, setList] = useState<AccountBookHistory[]>([]);
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);

  const fetchList = useCallback(async () => {
    const data = await getList();

    if (data.length > 0) {
      setList(data);
    }

    const monthlyAverage = await getMonthlyAverage();
    setAverage(monthlyAverage);
  }, [getList, getMonthlyAverage]);

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [fetchList]),
  );

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'Main SCREEN'}></Header.Title>
      </Header>
      <FlatList
        data={list}
        ListHeaderComponent={
          <View>
            <StackedBarChart
              data={{
                labels: average.map(item => `${item.month + 1}월`),
                legend: ['사용', '수입'],
                data: average.map(item => item.data),
                barColors: [`#dfe4ea`, `#a4b0be`],
              }}
              width={width}
              height={220}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'gray',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              hideLegend
            />
          </View>
        }
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={item => {
                navigation.push('Detail', {item});
              }}
            />
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12 + safeAreaInset.bottom,
        }}>
        <Button
          onPress={() => {
            navigation.push('Add');
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
            }}>
            <Icon name={'add'} size={30} color={'white'} />
          </View>
        </Button>
      </View>
    </View>
  );
};

export default MainScreen;
