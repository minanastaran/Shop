import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
//Redux
import {Provider} from 'react-redux';
import {store , persisedStor} from './Redux/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.hydrate(
  <React.StrictMode>
    <Provider store={store}>
   <PersistGate loading={null} persistor={persisedStor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
