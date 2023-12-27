import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { AuthApiServices } from '../actions/authAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  error: null,
  loading: loadingStates.idle,
  userDetails: null,
  registrationDetails: null
}

export const loginUserRequest = createAsyncThunk('AuthReducer/loginUserRequest', async (payload, thunkApi) => {
  const response = await AuthApiServices.login(payload, thunkApi)

  return response
})

export const logoutUserRequest = createAsyncThunk('AuthReducer/logoutUserRequest', async () => {})

export const registerUserRequest = createAsyncThunk('AuthReducer/registerUserRequest', async (payload, thunkApi) => {
  const response = await AuthApiServices.register(payload, thunkApi)

  return response
})

const AuthReducer = createReducer(initialState, {
  [loginUserRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [loginUserRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      userDetails: { ...action.payload.data }
    }
  },

  [loginUserRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle,
      userDetails: null
    }
  },

  [registerUserRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [registerUserRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      registrationDetails: { ...action.payload.data }
    }
  },

  [registerUserRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle,
      registrationDetails: null
    }
  },

  [logoutUserRequest.fulfilled]: (state, action) => {
    return {
      ...initialState
    }
  }
})

export default AuthReducer
