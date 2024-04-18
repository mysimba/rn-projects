import * as React from 'react';
import {TypeDog} from '../data/TypeDog.ts';
import {useCallback, useEffect, useState} from 'react';
import {RemoteImage} from './RemoteImage.tsx';
import {useWindowDimensions} from 'react-native';
import {api} from '../utils/axiosUtils.ts';

const DogPhotoView = () => {
  const [dog, setDog] = useState<TypeDog | null>(null);
  const {width} = useWindowDimensions();

  const loadDogPhoto = useCallback(async () => {
    const response = await api.get<{message: string; status: string}>(
      'breeds/image/random',
    );
    setDog({photoUrl: response.data.message});
  }, []);

  useEffect(() => {
    loadDogPhoto();
  }, [loadDogPhoto]);

  if (dog === null) return null;

  return (
    <RemoteImage
      testID={'image'}
      url={dog?.photoUrl}
      width={width * 0.7}
      height={width * 0.7}
    />
  );
};

export default DogPhotoView;
