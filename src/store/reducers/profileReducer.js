import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { ProfileApiServices } from '../actions/profileAction'
import { logoutUserRequest } from '../reducers/authReducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  profileDetails: null
}

export const getProfileDetailsRequest = createAsyncThunk(
  'ProfileReducer/getProfileDetailsRequest',
  async (payload, thunkApi) => {
    const response = await ProfileApiServices.getProfile(payload, thunkApi)

    return response
  }
)

const ProfileReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Get Profile Details cases

    .addCase(getProfileDetailsRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getProfileDetailsRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.profileDetails = { ...action.payload.data }
    })
    .addCase(getProfileDetailsRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.profileDetails = null
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default ProfileReducer
