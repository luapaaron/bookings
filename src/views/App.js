import React from 'react';
import { Provider } from 'react-redux';
import store from '@reduxModules/configureStore';

// root views
import ThemeRoot from './rootViews/ThemeRoot';
import AppRoot from './rootViews/AppRoot';

const App = () => (
  <Provider store={store}>
    <ThemeRoot>
      <AppRoot />
    </ThemeRoot>
  </Provider>
);

export default App;
