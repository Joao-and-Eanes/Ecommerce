import React from 'react';
import ReactDOM from 'react-dom';

import Provider from './store'

import App from './App';

import './styles/index.scss'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
