import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger'
import rootReducer from './features'

const reducer = combineReducers(rootReducer);

const makeStore = () =>
  configureStore({
    reducer,
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });

export const wrapper = createWrapper(makeStore, { debug: false });
