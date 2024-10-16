import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

const initialState = {}; // Set any initial state if needed

// Create the store using configureStore
const store = configureStore({
  reducer: rootReducer,
  // preloadedState: initialState, // Set initial state if needed
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // This includes redux-thunk by default
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
