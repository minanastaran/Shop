import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
//Redux
import {Provider} from 'react-redux';
import {ConfigureStore} from './Redux/ConfigureStore'
import {store , persisedStor} from './Redux/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react'


// const store = ConfigureStore().store;

ReactDOM.render(
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

