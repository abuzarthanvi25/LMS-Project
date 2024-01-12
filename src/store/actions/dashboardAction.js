import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

const requestHeaders = token => {
    const config = {
        headers: {
            'x-access-token': token
        }
    }

    return config
}

async function getTeacherStatistics(payload, thunkAPI) {
    try {
        const response = await ApiResource.get(ApiConstants.getTeacherStatistics, requestHeaders(payload.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function getAdminStatistics(payload, thunkAPI) {
    try {
        const response = await ApiResource.get(ApiConstants.getAdminStatistics, requestHeaders(payload.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

export const DashboardApiServices = {
    getTeacherStatistics,
    getAdminStatistics,
}
