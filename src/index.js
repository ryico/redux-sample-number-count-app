import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let state_value = {
  counter: 0,
  message: 'COUNTER'
}

// Rducer
function counter(state = state_value, action) {
  switch (action.type) {
    case 'INCREMENT':
    return {
      counter: state.counter + 1,
      message: 'INCREMENT'
    };
    case 'DECREMENT':
    return {
      counter: state.counter - 1,
      message: 'DECREMENT'
    };
    case 'RESET':
    return {
      counter: 0,
      message: 'RESET'
    };
    default:
    return state;
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, counter);

// store and persister create
let store = createStore(persistedReducer);
let pstore = persistStore(store);

// rendering
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<p>loading...</p>} persistor={pstore}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
