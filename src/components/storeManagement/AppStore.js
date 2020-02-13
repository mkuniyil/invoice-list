import React, { createContext, useContext, useReducer } from 'react';
import { appReducer } from './reducers/appReducer';

const INITIAL_STATE = {
  showModal: false,
  invoiceList: [],
  invoiceData: { date: '', subject: '', amount: '', account: '' },
};

const StoreContext = createContext({});
const { Provider } = StoreContext;

const AppStoreProvider = (props) => {
  const store = props.store || INITIAL_STATE;

  const [state, dispatch] = useReducer(appReducer, store);

  return (
    <Provider value={{ state, dispatch }} {...props}>
      {props.children}
    </Provider>
  );
};

const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('Cannot use `useStore` outside of a StoreProvider');
  }

  return store;
};

export { AppStoreProvider, useStore };
