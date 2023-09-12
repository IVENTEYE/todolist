import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store/index.ts';
import './firebase.ts'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </Provider>
);

serviceWorkerRegistration.register();

// hostname in package https://iventeye.github.io/todolist/