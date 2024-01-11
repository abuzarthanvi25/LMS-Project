import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { CourseApiServices } from '../actions/courseAction'
import { logoutUserRequest } from '../reducers/authReducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  allCourses: []
}

export const uploadCourseRequest = createAsyncThunk('CourseReducer/uploadCourseRequest', async (payload, thunkApi) => {
  const response = await CourseApiServices.uploadCourse(payload, thunkApi)

  return response
})

export const coursePaymentRequest = createAsyncThunk('CourseReducer/coursePaymentRequest', async (payload, thunkApi) => {
  const response = await CourseApiServices.coursePayment(payload, thunkApi)

  return response
})

export const getAllCoursesRequest = createAsyncThunk(
  'CourseReducer/getAllCoursesRequest',
  async (payload, thunkApi) => {
    const response = await CourseApiServices.getAllCourses(payload, thunkApi)

    return response
  }
)

const CourseReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Get Courses cases
    .addCase(getAllCoursesRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getAllCoursesRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.allCourses = [...action.payload.data?.data]
    })
    .addCase(getAllCoursesRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.allCourses = null
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default CourseReducer
