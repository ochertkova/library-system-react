import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/user'
import viewReducer from './reducers/view'
import bookReducer from './reducers/book'

export const store = configureStore({
  reducer: {
    user: userReducer,
    view: viewReducer,
    books: bookReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
