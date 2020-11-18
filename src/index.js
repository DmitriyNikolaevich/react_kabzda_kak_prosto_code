import store from './redux/reduxStore';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>,    document.getElementById('root')
  );


serviceWorker.unregister();
