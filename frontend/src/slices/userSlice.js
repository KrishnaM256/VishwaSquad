import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../components/api/api'

const registerUser = createAsyncThunk('/users/registerUser', async (data) => {
  const response = await api.post('/users/registerUser', data)
  console.log(response)
  return response.data.data
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userInfo = action.payload
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to register user.'
      })
  },
})

export default userSlice.reducer
