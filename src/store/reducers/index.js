import { combineReducers } from 'redux'
import AuthReducer from './authReducer'
import ProfileReducer from './profileReducer'
import AdminReducer from './adminReducer'
import CourseReducer from './courseReducer'
import DashboardReducer from './dashboardReducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  admin: AdminReducer,
  courses: CourseReducer,
  dashboard: DashboardReducer
})
