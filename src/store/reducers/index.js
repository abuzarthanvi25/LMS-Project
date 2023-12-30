import { combineReducers } from 'redux'
import AuthReducer from './authReducer'
import ProfileReducer from './profileReducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer
})
