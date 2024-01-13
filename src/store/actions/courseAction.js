import { formDataInstance } from '../../services/api'
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

async function uploadCourse(payload, thunkAPI) {
  try {
    const response = await formDataInstance.post(
      ApiConstants.uploadCourse,
      payload?.body,
      requestHeaders(payload.token)
    )

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getAllCourses(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getAllCourses, requestHeaders(payload.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function coursePayment(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.coursePayment, payload?.body, requestHeaders(payload.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getAllCoursesAdmin(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getAllCoursesAdmin, requestHeaders(payload.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getCoursesStudent(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getCoursesStudent, requestHeaders(payload.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const CourseApiServices = {
  uploadCourse,
  getAllCourses,
  coursePayment,
  getAllCoursesAdmin,
  getCoursesStudent
}
