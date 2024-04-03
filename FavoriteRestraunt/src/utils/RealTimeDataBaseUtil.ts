import database from '@react-native-firebase/database';

export const saveNewRestraunt = async (params: {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}) => {
  const db = database().ref('/restraunt');
  await db.push().set({
    ...params,
  });
};

export const getRestrauntList = async (): Promise<
  {
    title: string;
    address: string;
    latitude: number;
    longitude: number;
  }[]
> => {
  const db = database().ref('/restraunt');
  const snapshotValue = await db.once('value').then(snapshot => snapshot.val());
  return Object.keys(snapshotValue).map(key => snapshotValue[key]);
};
