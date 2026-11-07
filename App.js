import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import UserList from './src/components/UserList';

export default function App() {
  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  );
}