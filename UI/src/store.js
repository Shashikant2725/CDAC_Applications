import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import { configureStore } from "@reduxjs/toolkit";


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['tracking']
}

const persistedReducer = persistReducer(persistConfig, reducers)


export const store  = configureStore({
  reducer:persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [logger,thunk]
})

export const persistor = persistStore(store);