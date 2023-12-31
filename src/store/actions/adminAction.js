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

const getAllStudents = async (payload, thunkAPI) => {
  try {
    const response = await ApiResource.get(ApiConstants.getAllStudents, requestHeaders(payload.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

const getAllTeachers = async (payload, thunkAPI) => {
  try {
    const response = await ApiResource.get(ApiConstants.getAllTeachers, requestHeaders(payload.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

const verifyTeacher = async (payload, thunkAPI) => {
  try {
    const response = await ApiResource.patch(
      `${ApiConstants.verifyTeacher}?teacherId=${payload?.id}`,
      {},
      requestHeaders(payload.token)
    )

    return { token: payload.token, ...response }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const AdminApiServices = {
  getAllStudents,
  getAllTeachers,
  verifyTeacher
}
