import * as React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header.tsx';
import {Button} from '../components/Button.tsx';
import {Typography} from '../components/Typography.tsx';
import {useRootStackNavigation} from '../navigation/RootStackNavigation.tsx';
import {Icon} from '../components/Icons.tsx';
import {RemoteImage} from '../components/RemoteImage.tsx';
import {useAppSelector} from '../redux';
import {Spacer} from '../components/Spacer.tsx';

const MyScreen = () => {
  const rootNavigation = useRootStackNavigation<'Main'>();
  const userInfo = useAppSelector(state => state.user.user);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title={'MyScreen'} />
      </Header>
      <View style={{flex: 1}}>
        {userInfo !== null && (
          <View
            style={{
              paddingVertical: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RemoteImage
              url={userInfo.profileImage}
              width={100}
              height={100}
              style={{borderRadius: 50}}
            />
            <Spacer space={20} />
            <Typography fontSize={20}>{userInfo.userName}</Typography>
          </View>
        )}
        <Button
          onPress={() => {
            rootNavigation.push('HistoryList');
          }}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 12,
              paddingHorizontal: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography fontSize={16}>히스토리 화면으로 이동</Typography>
            <Icon name={'chevron-forward'} size={16} color={'gray'} />
          </View>
        </Button>
      </View>
    </View>
  );
};

export default MyScreen;
