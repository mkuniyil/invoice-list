import React from 'react';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import { AppStoreProvider } from './components/storeManagement/AppStore';
import Dashboard from './components/pages/Dashboard/Dashboard';

const App = () => {
  return (
    <AppStoreProvider>
      <Dashboard />
    </AppStoreProvider>
  );
};

export default App;
