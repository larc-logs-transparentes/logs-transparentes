import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import electionReducer from '../api/section/infra/electionSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  election: electionReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};
