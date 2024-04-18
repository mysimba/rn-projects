import React, {ReactNode, useState} from 'react';
import {AccountBookHistory} from '../data/AccountBookHistory.ts';
import {AccountContext} from '../context/AccountContext.ts';

const AccountProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [item, setItemState] = useState<AccountBookHistory>({
    type: '사용',
    price: 0,
    comment: '',
    updatedAt: 0,
    createAt: 0,
    photoUrl: null,
    date: 0,
  });

  const setItem = (props: Partial<AccountBookHistory>) => {
    setItemState(currentItem => ({...currentItem, ...props}));
  };

  return (
    <AccountContext.Provider value={{item, setItem}}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
