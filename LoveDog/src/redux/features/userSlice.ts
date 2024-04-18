import {TypeUser} from '../../data/TypeUser.ts';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TypeDog} from '../../data/TypeDog.ts';
import {api} from '../../utils/axiosUtils.ts';
import {RootState} from '../index.ts';
import database from '@react-native-firebase/database';

export type TypeUserReducer = {
  user: TypeUser | null;
  history: TypeDog[];
};

const initialState: TypeUserReducer = {
  user: null,
  history: [],
};

export const getUserLikedHistory = createAsyncThunk(
  'user/getLikedHistory',
  async (_, {rejectWithValue, getState, dispatch}) => {
    const state = getState() as RootState;
    const user = state.user.user;

    if (!user) {
      return rejectWithValue('유저 정보를 찾을 수 없습니다.');
    }

    try {
      const ref = `history/${user.uid}`;
      const currentHistory = await database()
        .ref(ref)
        .once('value')
        .then(snapshot => snapshot.val());

      const dogList = Object.keys(currentHistory).map(key => {
        const item = currentHistory[key];

        return {
          photoUrl: item.url,
        } as TypeDog;
      });

      dispatch(setUserHistory(dogList));
    } catch (error) {
      return rejectWithValue('Failed to fetch dog');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TypeUser | null>) => {
      if (action.payload) state.user = action.payload;
    },
    setUserHistory: (state, action: PayloadAction<TypeDog[] | null>) => {
      if (action.payload) state.history = action.payload;
    },
  },
});

export const {setUser, setUserHistory} = userSlice.actions;
export default userSlice.reducer;
