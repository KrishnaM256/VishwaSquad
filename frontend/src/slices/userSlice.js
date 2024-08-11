import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../components/api/api'
export const registerUser = createAsyncThunk(
  '/users/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/registerUser', data)
      const token = response.data.data.token // Access token here
      localStorage.setItem('token', token)
      console.log(token)

      return {
        data: response.data.data.user,
        message: 'Registration successful!',
      } // Pass user data only
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || 'Failed to register user.',
      })
    }
  }
)
export const loginUser = createAsyncThunk(
  '/users/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/loginUser', data)
      const { token, user } = response.data.data // Access token here

      localStorage.setItem('token', token)

      return { user, message: 'Login successful!' }
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || 'Failed to login user.',
      })
    }
  }
)

export const forgotPassword = createAsyncThunk(
  '/users/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/forgotPassword', { email })
      console.log(response)
      return { message: 'Email sent successfully!' }
    } catch (err) {
      console.log('err.response.data')
      return rejectWithValue({
        message: err.response?.data?.message || 'Failed to send reset email.',
      })
    }
  }
)

export const resetPassword = createAsyncThunk(
  '/users/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/users/resetPassword/${token}`, {
        password,
      })
      console.log(response)
      return { message: 'Password reset successful!' }
    } catch (err) {
      console.log('err.response.data')
      return rejectWithValue({
        message: err.response?.data?.message || 'Failed to reset password.',
      })
    }
  }
)

// Other thunks remain unchanged

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    status: 'idle',
    error: null,
    success: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.success = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload.data
        state.success = action.payload.message
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.message
        state.success = null
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.success = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload.user
        state.success = action.payload.message
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.message
        state.success = null
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.success = null
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.success = action.payload.message
        state.error = null
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.message
        state.success = null
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.success = null
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.success = action.payload.message
        state.error = null
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.message
        state.success = null
      })
  },
})

export const { clearErrors, clearSuccess } = userSlice.actions
export default userSlice.reducer
