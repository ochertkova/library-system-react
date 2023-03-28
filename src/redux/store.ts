import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import userReducer from './reducers/user'
import viewReducer from './reducers/view'
import bookReducer from './reducers/book'

export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    books: bookReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
