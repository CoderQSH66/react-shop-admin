import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './moudles/user'

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export type StateType = ReturnType<typeof store.getState>

export default store
