import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { DashboardApiServices } from '../actions/dashboardAction'
import { logoutUserRequest } from '../reducers/authReducer'

const loadingStates = {
    idle: false,
    pending: true
}

const initialState = {
    error: null,
    loading: loadingStates.idle,
    teacherStatistics: null,
    adminStatistics: null
}

export const getTeacherStatisticsRequest = createAsyncThunk('DashboardReducer/getTeacherStatisticsRequest', async (payload, thunkApi) => {
    const response = await DashboardApiServices.getTeacherStatistics(payload, thunkApi)

    return response
})

export const getAdminStatisticsRequest = createAsyncThunk('DashboardReducer/getAdminStatisticsRequest', async (payload, thunkApi) => {
    const response = await DashboardApiServices.getAdminStatistics(payload, thunkApi)

    return response
})

const DashboardReducer = createReducer(initialState, builder => {
    builder

        //NOTE - Get Teacher Statistics cases

        .addCase(getTeacherStatisticsRequest.pending, state => {
            state.error = null
            state.loading = loadingStates.pending
        })
        .addCase(getTeacherStatisticsRequest.fulfilled, (state, action) => {
            state.error = null
            state.loading = loadingStates.idle
            state.teacherStatistics = { ...action.payload.data?.data }
        })
        .addCase(getTeacherStatisticsRequest.rejected, (state, action) => {
            state.error = action.payload?.response?.data
            state.loading = loadingStates.idle
            state.teacherStatistics = null
        })

        //NOTE - Get Admin Statistics cases

        .addCase(getAdminStatisticsRequest.pending, state => {
            state.error = null
            state.loading = loadingStates.pending
        })
        .addCase(getAdminStatisticsRequest.fulfilled, (state, action) => {
            state.error = null
            state.loading = loadingStates.idle
            state.adminStatistics = { ...action.payload.data?.data }
        })
        .addCase(getAdminStatisticsRequest.rejected, (state, action) => {
            state.error = action.payload?.response?.data
            state.loading = loadingStates.idle
            state.adminStatistics = null
        })

        //NOTE - Logout case

        .addCase(logoutUserRequest.fulfilled, () => {
            return initialState
        })
})

export default DashboardReducer
