import {TypeDog} from '../../data/TypeDog.ts';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../utils/axiosUtils.ts';
import {RootState} from '../index.ts';
import database from '@react-native-firebase/database';

export type TypeDogReducer = {
  currentDog: TypeDog | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null | undefined;
};

const initialState: TypeDogReducer = {
  currentDog: null,
  loading: 'idle',
  error: '',
};

export const getDog = createAsyncThunk(
  'dog/getDog',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get<{message: string; status: string}>(
        'breeds/image/random',
      );
      return {photoUrl: response.data.message};
    } catch (error) {
      return rejectWithValue('Failed to fetch dog');
    }
  },
);

export const likeDog = createAsyncThunk(
  'dog/likeDog',
  async (dog: TypeDog, {getState, rejectWithValue, dispatch}) => {
    const state = getState() as RootState;
    const user = state.user.user;

    if (!user) {
      return rejectWithValue('Like Today Count is Over or User not logged in');
    }

    try {
      const now = new Date().getTime();
      const ref = `history/${user.uid}`;
      const pushRef = database().ref(ref).push();
      await pushRef.set({
        url: dog.photoUrl,
        regeditAt: now,
      });

      dispatch(getDog());
    } catch (e) {
      return rejectWithValue('Failed to like dog');
    }
  },
);

const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {
    getDogSuccess: (state, action: PayloadAction<TypeDog>) => {
      state.currentDog = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getDog.pending, (state, action) => {
        state.loading = 'pending';
      })
      .addCase(getDog.fulfilled, (state, action: PayloadAction<TypeDog>) => {
        state.loading = 'succeeded';
        state.currentDog = action.payload;
      })
      .addCase(getDog.rejected, (state, action: PayloadAction<any>) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

export const {getDogSuccess} = dogSlice.actions;
export default dogSlice.reducer;
