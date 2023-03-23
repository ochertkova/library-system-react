import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './reducers/counter'
import userReducer from './reducers/user'

export const store = configureStore({
  reducer: {
    count: counterReducer,
    user: userReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
