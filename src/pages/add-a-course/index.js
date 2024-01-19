import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useFormik } from 'formik'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'
import PreviewImage from '../../@core/custom-components/modals/preview-image'
import PreviewVideo from '../../@core/custom-components/modals/preview-video'
import { objectToFormData } from 'src/@core/utils/helpers'
import { addCourseInitialValues, addCourseValidationSchema } from 'src/@core/utils/validations/teacher'
import { uploadCourseRequest, getAllCoursesRequest } from 'src/store/reducers/courseReducer'
import { unwrapResult } from '@reduxjs/toolkit'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showFaliureToast, showSuccessToast } from 'src/configs/app-toast'
import UploadLoader from '../../@core/custom-components/loaders/upload-loader'
import CustomModal from '../../@core/custom-components/modals/custom-modal'
import { useRouter } from 'next/router'
import { ROLES } from 'src/configs/role-constants'

const AddACourse = ({ token, uploadCourseRequest, getAllCoursesRequest, isVerified, role }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [previewImageSrc, setPreviewImageSrc] = useState(null)
  const [previewVideoSrc, setPreviewVideoSrc] = useState({ file: null, videoTitle: '' })

  const handleGetCoursesList = () => {
    try {
      if (token) {
        setLoading(true)
        getAllCoursesRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
            setLoading(false)
          })
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleUploadCourse = body => {
    try {
      if (!token) return
      setLoading(true)

      uploadCourseRequest({ body, token })
        .then(unwrapResult)
        .then(res => {
          showSuccessToast(res?.data?.message)
          formik.resetForm()
          handleGetCoursesList()
          setLoading(false)
        })
        .catch(err => {
          showFaliureToast(err?.response?.data?.message)
          setLoading(false)
        })
    } catch (error) {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: addCourseInitialValues,
    validationSchema: addCourseValidationSchema,
    onSubmit: values => {
      console.log(values)

      const formData = new FormData()

      formData.append('courseTitle', values.courseTitle)
      formData.append('courseDescription', values.courseDescription)
      formData.append('price', values.price)
      formData.append('courseThumbnail', values.courseThumbnail)
      formData.append('material_1', values.material_1)

      // const formDataPayload = objectToFormData(values)

      handleUploadCourse(formData, token)
    }
  })

  const onRemoveItem = (itemKey = '', ref) => {
    formik.setFieldValue(itemKey, null)
    if (ref) {
      ref.current.click()
    }
  }

  const onPreviewFile = (file, setter) => {
    if (file && typeof setter == 'function') {
      const reader = new FileReader()

      reader.onload = () => {
        setter(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const onPreviewVideoFile = (file, videoTitle) => {
    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setPreviewVideoSrc({ file: reader.result, videoTitle: videoTitle ?? file.name })
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      {role == ROLES.teacher ? (
        <CustomModal open={!isVerified} heading={'Unauthorized Access'}>
          <div style={{ padding: '10px' }}>
            <Alert
              style={{ width: 'max-content' }}
              variant='filled'
              severity='warning'
              color='warning'
              action={
                <Button variant='contained' onClick={() => router.replace('/dashboard')}>
                  Go to Dashboard
                </Button>
              }
            >
              <Typography variant='body1' color={'red'}>
                You are not authorized for uploading a course yet{' '}
              </Typography>
            </Alert>
          </div>
        </CustomModal>
      ) : null}
      {loading ? (
        <UploadLoader />
      ) : (
        <CardContent>
          <PreviewImage
            src={previewImageSrc}
            onClose={() => setPreviewImageSrc(null)}
            imageLabel='Thumbnail Image'
            open={previewImageSrc ? true : false}
          />
          <PreviewVideo
            src={previewVideoSrc.file}
            onClose={() => setPreviewVideoSrc({ file: null, videoTitle: '' })}
            videoLabel={previewVideoSrc.videoTitle}
            open={previewVideoSrc.file ? true : false}
          />
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant='h4'>Upload A Course</Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={6} lg={12}>
                <TextField
                  fullWidth
                  id='courseTitle'
                  label='Course Title'
                  variant='outlined'
                  size='small'
                  {...formik.getFieldProps('courseTitle')}
                  error={formik.touched.courseTitle && Boolean(formik.errors.courseTitle)}
                  helperText={formik.touched.courseTitle && formik.errors.courseTitle}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  fullWidth
                  id='courseDescription'
                  label='Course Description'
                  variant='outlined'
                  multiline
                  rows={4}
                  size='small'
                  {...formik.getFieldProps('courseDescription')}
                  error={formik.touched.courseDescription && Boolean(formik.errors.courseDescription)}
                  helperText={formik.touched.courseDescription && formik.errors.courseDescription}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  fullWidth
                  id='price'
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>
                  }}
                  label='Course Price'
                  variant='outlined'
                  size='small'
                  type='number'
                  {...formik.getFieldProps('price')}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <FormControl fullWidth>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <label htmlFor='courseThumbnail'>
                      <Button
                        variant='contained'
                        component='span'
                        startIcon={<CloudUploadIcon />}
                        sx={{ marginBottom: 2 }}
                      >
                        {formik.values?.courseThumbnail
                          ? formik.values.courseThumbnail?.name?.length > 30
                            ? formik.values.courseThumbnail?.name.slice(0, 30) + '...'
                            : formik.values.courseThumbnail?.name
                          : 'Upload Thumbnail Image (JPG, PNG, WEBP)'}
                      </Button>
                    </label>
                    {formik.values?.courseThumbnail ? (
                      <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{ marginX: '10px', cursor: 'pointer' }}
                          onClick={() => onPreviewFile(formik.values.courseThumbnail, setPreviewImageSrc)}
                        >
                          <EyeOutline color='secondary' />
                        </Box>
                        {/* <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => {
                          onRemoveItem('courseThumbnail')
                        }}
                      >
                        <TrashCanOutline color='error' />
                      </Box> */}
                      </Box>
                    ) : null}
                  </Box>
                  <OutlinedInput
                    id='courseThumbnail'
                    style={{ display: 'none' }}
                    type='file'
                    inputProps={{ accept: 'image/*' }}
                    onChange={event => {
                      formik.setFieldValue('courseThumbnail', event.currentTarget.files[0])
                    }}
                  />
                  {formik.touched.courseThumbnail && Boolean(formik.errors.courseThumbnail) && (
                    <Typography variant='caption' color='error'>
                      {formik.errors.courseThumbnail}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} lg={6}>
                <FormControl fullWidth>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <label style={{ display: 'flex', alignItems: 'center' }} htmlFor='material_1'>
                      <Button
                        variant='contained'
                        component='span'
                        startIcon={<CloudUploadIcon />}
                        sx={{ marginBottom: 2 }}
                      >
                        {formik.values?.material_1
                          ? formik.values.material_1?.name?.length > 30
                            ? formik.values.material_1?.name.slice(0, 30) + '...'
                            : formik.values.material_1?.name
                          : 'Upload Course Video 1 (mp4)'}
                      </Button>
                    </label>
                    {formik.values?.material_1 ? (
                      <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                        <Box
                          onClick={() => onPreviewVideoFile(formik.values.material_1, 'Course Video 1')}
                          sx={{ marginX: '10px', cursor: 'pointer' }}
                        >
                          <EyeOutline color='secondary' />
                        </Box>
                        {/* <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => {
                          onRemoveItem('material_1', material1Ref)
                        }}
                      >
                        <TrashCanOutline color='error' />
                      </Box> */}
                      </Box>
                    ) : null}
                  </Box>
                  <OutlinedInput
                    id='material_1'
                    style={{ display: 'none' }}
                    type='file'
                    inputProps={{ accept: 'video/*' }}
                    onChange={event => {
                      formik.setFieldValue('material_1', event.target.files[0])
                    }}
                  />
                  {formik.touched.material_1 && formik.errors.material_1 && (
                    <Typography variant='caption' color='error'>
                      {formik.errors.material_1}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              disabled={loading}
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 2, marginTop: 3 }}
              type='submit'
            >
              {loading ? <CircularProgress size={20} /> : 'Upload Course'}
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.userDetails?.token,
    isVerified: state.auth.userDetails?.data?.isVerified,
    role: state.auth.userDetails?.data?.role
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      uploadCourseRequest,
      getAllCoursesRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddACourse)
