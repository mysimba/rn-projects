import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  getAddressFromCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../utils/GeoUtils.ts';
import {SingleLineInput} from '../components/SingleLineInput.tsx';
import {useRootNavigation} from '../navigation/RootNavigation.tsx';
import {getRestrauntList} from '../utils/RealTimeDataBaseUtil.ts';

const MainScreen = () => {
  const navigation = useRootNavigation();
  const [query, setQuery] = useState<string>('');

  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });

  const [markerList, setMarkerList] = useState<
    {
      latitude: number;
      longitude: number;
      title: string;
      address: string;
    }[]
  >([]);

  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const onMapReady = useCallback(async () => {
    setIsMapReady(true);
    const restrauntList = await getRestrauntList();
    setMarkerList(restrauntList);
  }, []);

  const onChangeLocation = useCallback<
    (item: {latitude: number; longitude: number}) => Promise<void>
  >(async item => {
    setCurrentRegion({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    getAddressFromCoords(item.latitude, item.longitude).then(setCurrentAddress);
  }, []);

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [onChangeLocation]);

  const onFindAddress = useCallback<() => Promise<void>>(async () => {
    const keywordResult = await getCoordsFromKeyword(query);

    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);
      setCurrentRegion({
        latitude: parseFloat(keywordResult.latitude.toString()),
        longitude: parseFloat(keywordResult.longitude.toString()),
      });
      return;
    }

    const addressResult = await getCoordsFromAddress(query);
    if (addressResult === null) {
      console.error('주소값을 찾지 못했습니다.');
      return;
    }

    setCurrentAddress(addressResult.address);
    setCurrentRegion({
      latitude: parseFloat(addressResult.latitude.toString()),
      longitude: parseFloat(addressResult.longitude.toString()),
    });
  }, [query]);

  const onPressBottomAddress = useCallback(() => {
    if (currentAddress === null) {
      return;
    }

    navigation.push('Add', {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      address: currentAddress,
    });
  }, [
    currentAddress,
    navigation,
    currentRegion.latitude,
    currentRegion.longitude,
  ]);

  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        onLongPress={event => {
          onChangeLocation(event.nativeEvent.coordinate);
        }}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onMapReady={onMapReady}>
        {isMapReady && (
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }}
          />
        )}
        {isMapReady &&
          markerList.map((item, index) => {
            return (
              <Marker
                key={`marker${index}`}
                title={item.title}
                description={item.address}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                pinColor={'blue'}
                onCalloutPress={() => {
                  navigation.push('Detail', {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    title: item.title,
                    address: item.address,
                  });
                }}
              />
            );
          })}
      </MapView>
      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={query}
            onChangeText={setQuery}
            placeholder={'주소를 입력해주세요.'}
            onSubmitEditing={onFindAddress}
          />
        </View>
      </View>

      {currentAddress !== null && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            onPress={onPressBottomAddress}
            style={{
              backgroundColor: 'grey',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default MainScreen;
