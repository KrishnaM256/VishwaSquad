import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

<<<<<<< HEAD
export default store
=======
export default store
>>>>>>> 8df35dfa454f3c5b73343df482da5d350e523a61
