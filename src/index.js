import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cartReducer from "./reducers/cartReducer" 
import  tokenSlice  from './reducers/TokenReducer';

const store = configureStore({
  reducer: {
    cart:cartReducer,
    token:tokenSlice
  },
});
ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
     <Provider store={store}>
    < App/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


