import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { AdminApiServices } from '../actions/adminAction'
import { logoutUserRequest } from '../reducers/authReducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  studentsList: [],
  teachersList: []
}

export const getAllStudentsRequest = createAsyncThunk(
  'AdminReducer/getAllStudentsRequest',
  async (payload, thunkApi) => {
    const response = await AdminApiServices.getAllStudents(payload, thunkApi)

    return response
  }
)

export const getAllTeachersRequest = createAsyncThunk(
  'AdminReducer/getAllTeachersRequest',
  async (payload, thunkApi) => {
    const response = await AdminApiServices.getAllTeachers(payload, thunkApi)

    return response
  }
)

export const verifyTeacherRequest = createAsyncThunk('AdminReducer/verifyTeacherRequest', async (payload, thunkApi) => {
  const response = await AdminApiServices.verifyTeacher(payload, thunkApi)

  return response
})

const AdminReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Get All Students List cases

    .addCase(getAllStudentsRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getAllStudentsRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.studentsList = [...action.payload.data?.data]
    })
    .addCase(getAllStudentsRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.studentsList = []
    })

    //NOTE - Get All Teachers List cases

    .addCase(getAllTeachersRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getAllTeachersRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.teachersList = [...action.payload.data?.data]
    })
    .addCase(getAllTeachersRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.teachersList = []
    })

    .addCase(verifyTeacherRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(verifyTeacherRequest.fulfilled, state => {
      state.error = null
      state.loading = loadingStates.idle
    })
    .addCase(verifyTeacherRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default AdminReducer
