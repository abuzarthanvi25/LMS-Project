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

async function getProfile(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getProfile, requestHeaders(payload.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const ProfileApiServices = {
  getProfile
}
