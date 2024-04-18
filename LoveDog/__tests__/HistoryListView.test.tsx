import {screen, waitFor} from '@testing-library/react-native';
import HistoryListView from '../src/components/HistoryListView.tsx';
import {RootState, setupStore} from '../src/redux';
import {renderWithProviders} from '../src/redux/ReduxTest.tsx';

jest.mock('@react-native-firebase/database', () => {
  return () => ({
    ref: jest.fn().mockImplementation(() => ({
      once: jest.fn().mockReturnValue(
        Promise.resolve({
          val: jest.fn().mockReturnValue({
            TEST: {
              url: 'test',
            },
          }),
        }),
      ),
    })),
  });
});

describe('HistoryListView Render Test', () => {
  const initialState: Partial<RootState> = {
    user: {
      user: {
        uid: 'TEST',
        userName: '심명보',
        userEmail: '',
        profileImage: '',
      },
      history: [],
    },
  };

  test('HistoryListView Render Snapshot Test', async () => {
    const onPressItem = jest.fn();

    const component = renderWithProviders(
      <HistoryListView onPressItem={onPressItem} />,
      {
        preloadedState: initialState,
      },
    );

    await waitFor(() => component.findByTestId('Button0'), {timeout: 2000});

    expect(component.toJSON()).toMatchSnapshot();
  });
});
