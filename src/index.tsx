import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import reducer from './reducers';

const logger = createLogger({ collapsed: true });
const store = createStore(reducer, applyMiddleware(thunk, logger));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
