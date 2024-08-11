import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../components/api/api'

// Thunk for adding an alert
export const addAlert = createAsyncThunk(
  'authority/addAlert',
  async ({ message, state }, { rejectWithValue }) => {
    try {
      const response = await api.post('/authority/addAlert', {
        message,
        state,
      })
      return response.data // Assuming the backend returns the newly created alert
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add alert'
      )
    }
  }
)

// Thunk for fetching alerts by state
export const fetchAlertsByState = createAsyncThunk(
  'authority/fetchAlertsByState',
  async (state, { rejectWithValue }) => {
    try {
      const response = await api.get('/authority/getAlert', { state })
      return response.data.alerts
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch alerts'
      )
    }
  }
)

const authoritySlice = createSlice({
  name: 'authority',
  initialState: {
    alerts: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages(state) {
      state.error = null
      state.successMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle addAlert
      .addCase(addAlert.pending, (state) => {
        state.loading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(addAlert.fulfilled, (state, action) => {
        state.loading = false
        state.alerts.push(action.payload)
        state.successMessage = 'Alert added successfully!'
      })
      .addCase(addAlert.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Handle fetchAlertsByState
      .addCase(fetchAlertsByState.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAlertsByState.fulfilled, (state, action) => {
        state.loading = false
        state.alerts = action.payload
      })
      .addCase(fetchAlertsByState.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearMessages } = authoritySlice.actions

export default authoritySlice.reducer
