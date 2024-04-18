import {AccountBookHistory} from '../data/AccountBookHistory.ts';
import {createContext, useContext} from 'react';

type AccountContextType = {
  item: AccountBookHistory;
  setItem: (props: Partial<AccountBookHistory>) => void;
};

const AccountContext = createContext<AccountContextType>({
  item: {
    type: '사용',
    price: 0,
    comment: '',
    updatedAt: 0,
    createAt: 0,
    photoUrl: null,
    date: 0,
  },
  setItem: props => {},
});

const useAccount = () => useContext(AccountContext);

export {AccountContext, useAccount};
