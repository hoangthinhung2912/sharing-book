import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configStore from "./store";
import App from './modules/App';

import 'antd/dist/antd.css';
import './styles/main.scss';

const { store: storeEnhancer, persistor } = configStore();

export const store = storeEnhancer;

const {whyDidYouUpdate} = require('why-did-you-update');
whyDidYouUpdate(React);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={(<h1>Loading...</h1>)} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);

serviceWorker.unregister();