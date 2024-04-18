import * as React from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory.ts';
import {Button} from './Button.tsx';
import {View} from 'react-native';
import {Icon} from './Icons.tsx';
import {Typography} from './Typography.tsx';
import {Spacer} from './Spacer.tsx';
import {RemoteImage} from './RemoteImage.tsx';
import {covertToDateString} from '../utils/DateUtils.ts';

const AccountHistoryListItemView = ({
  item,
  onPressItem,
}: {
  item: AccountBookHistory;
  onPressItem: (item: AccountBookHistory) => void;
}) => {
  return (
    <Button onPress={() => onPressItem(item)}>
      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name={item.type === '사용' ? 'remove-circle' : 'add-circle'}
          size={24}
          color={item.type === '사용' ? 'red' : 'blue'}
        />
        <View style={{flex: 1, marginLeft: 12}}>
          <Typography fontSize={16}>{item.comment}</Typography>
          <Spacer space={4} />
          <Typography fontSize={12}>{covertToDateString(item.date)}</Typography>
        </View>
        {item.photoUrl !== null && (
          <>
            <Spacer space={12} horizontal />
            <RemoteImage
              url={item.photoUrl}
              width={100}
              height={100}
              style={{borderRadius: 10}}
            />
          </>
        )}
      </View>
    </Button>
  );
};

export default AccountHistoryListItemView;
