import React from 'react';
import {Provider} from 'react-redux';
import {setupStore} from './index.ts';
import {render} from '@testing-library/react-native';

export function renderWithProviders(
  children: React.ReactElement,
  {preloadedState = {}, store = setupStore(preloadedState)} = {},
) {
  return render(<Provider store={store}>{children}</Provider>);
}
