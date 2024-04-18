import * as React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button.tsx';
import {Typography} from '../components/Typography.tsx';
import {
  useSignupNavigation,
  useSignupRoute,
} from '../navigation/SignupNavigation.tsx';
import {Header} from '../components/Header/Header.tsx';
import {Spacer} from '../components/Spacer.tsx';
import {SingleLineInput} from '../components/SingleLineInput.tsx';
import {useCallback, useMemo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EmailValidator from 'email-validator';

const InputEmailScreen = () => {
  const navigation = useSignupNavigation<'InputEmail'>();
  const routes = useSignupRoute<'InputEmail'>();
  const [inputEmail, setInputEmail] = useState<string>(
    routes.params.preInput.email,
  );

  const safeArea = useSafeAreaInsets();
  const isValid = useMemo(() => {
    if (inputEmail.length === 0) {
      return false;
    }

    return EmailValidator.validate(inputEmail);
  }, [inputEmail]);

  const onPressSubmit = useCallback(() => {
    if (!isValid) {
      return;
    }
    navigation.push('InputName', {
      preInput: routes.params.preInput,
      uid: routes.params.uid,
      inputEmail,
    });
  }, [
    isValid,
    navigation,
    routes.params.preInput,
    routes.params.uid,
    inputEmail,
  ]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Group>
          <Header.Title title={'InputEmailScreen'} />
        </Header.Group>
        <Header.Icon onPress={navigation.goBack} iconName={'close'} />
      </Header>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        }}>
        <SingleLineInput
          value={inputEmail}
          onChangeText={setInputEmail}
          placeholder={'Email을 입력해주세요.'}
          onSubmitEditing={() => {}}
          keyboardType={'email-address'}
        />
      </View>
      <Button onPress={onPressSubmit}>
        <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
          <Spacer space={16} />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={20} color={'white'}>
              다음
            </Typography>
          </View>
          <Spacer space={safeArea.bottom + 12} />
        </View>
      </Button>
    </View>
  );
};

export default InputEmailScreen;
