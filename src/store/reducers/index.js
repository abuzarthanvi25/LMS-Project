import { combineReducers } from 'redux'
import AuthReducer from './authReducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  auth: AuthReducer
})
