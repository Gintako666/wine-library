import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { GlobalContextProvider } from './components/GlobalContext';
import { UserContextProvider } from './components/UserContext';

ReactDOM.render(
  <GlobalContextProvider>
    <UserContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </UserContextProvider>
  </GlobalContextProvider>,
  document.getElementById('root'),
);
