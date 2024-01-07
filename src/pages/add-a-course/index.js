import { useState } from 'react'
import {
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

const AddACourse = ({ token, uploadCourseRequest, getAllCoursesRequest }) => {
  const [loading, setLoading] = useState(false)

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
      // Handle form submission logic here
      const formDataPayload = objectToFormData(values)

      // handleUploadCourse(formDataPayload, token);
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
                  <label htmlFor='thumbnailImage'>
                    <Button
                      variant='contained'
                      component='span'
                      startIcon={<CloudUploadIcon />}
                      sx={{ marginBottom: 2 }}
                    >
                      {formik.values?.thumbnailImage
                        ? formik.values.thumbnailImage?.name?.length > 30
                          ? formik.values.thumbnailImage?.name.slice(0, 30) + '...'
                          : formik.values.thumbnailImage?.name
                        : 'Upload Thumbnail Image (JPG, PNG, WEBP)'}
                    </Button>
                  </label>
                  {formik.values?.thumbnailImage ? (
                    <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => onPreviewFile(formik.values.thumbnailImage, setPreviewImageSrc)}
                      >
                        <EyeOutline color='secondary' />
                      </Box>
                      {/* <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => {
                          onRemoveItem('thumbnailImage')
                        }}
                      >
                        <TrashCanOutline color='error' />
                      </Box> */}
                    </Box>
                  ) : null}
                </Box>
                <OutlinedInput
                  id='thumbnailImage'
                  style={{ display: 'none' }}
                  type='file'
                  inputProps={{ accept: 'image/*' }}
                  onChange={event => {
                    formik.setFieldValue('thumbnailImage', event.currentTarget.files[0])
                  }}
                />
                {formik.touched.thumbnailImage && formik.errors.thumbnailImage && (
                  <Typography variant='caption' color='error'>
                    {formik.errors.thumbnailImage}
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
            <Grid item xs={12} sm={6} lg={6}>
              <FormControl fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <label htmlFor='material_2'>
                    <Button
                      variant='contained'
                      component='span'
                      startIcon={<CloudUploadIcon />}
                      sx={{ marginBottom: 2 }}
                    >
                      {formik.values?.material_2
                        ? formik.values.material_2?.name?.length > 30
                          ? formik.values.material_2?.name.slice(0, 30) + '...'
                          : formik.values.material_2?.name
                        : 'Upload Course Video 2 (mp4)'}
                    </Button>
                  </label>
                  {formik.values?.material_2 ? (
                    <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => onPreviewVideoFile(formik.values.material_2, 'Course Video 2')}
                      >
                        <EyeOutline color='secondary' />
                      </Box>
                      {/* <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => {
                          onRemoveItem('material_2', material2Ref)
                        }}
                      >
                        <TrashCanOutline color='error' />
                      </Box> */}
                    </Box>
                  ) : null}
                </Box>
                <OutlinedInput
                  id='material_2'
                  style={{ display: 'none' }}
                  type='file'
                  inputProps={{ accept: 'video/*' }}
                  onChange={event => formik.setFieldValue('material_2', event.currentTarget.files[0])}
                />
                {formik.touched.material_2 && formik.errors.material_2 && (
                  <Typography variant='caption' color='error'>
                    {formik.errors.material_2}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <FormControl fullWidth>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <label htmlFor='material_3'>
                    <Button
                      variant='contained'
                      component='span'
                      startIcon={<CloudUploadIcon />}
                      sx={{ marginBottom: 2 }}
                    >
                      {formik.values?.material_3
                        ? formik.values.material_3?.name?.length > 30
                          ? formik.values.material_3?.name.slice(0, 30) + '...'
                          : formik.values.material_3?.name
                        : 'Upload Course Video 3 (mp4)'}
                    </Button>
                  </label>
                  {formik.values?.material_3 ? (
                    <Box sx={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => onPreviewVideoFile(formik.values.material_3, 'Course Video 3')}
                      >
                        <EyeOutline color='secondary' />
                      </Box>
                      {/* <Box
                        sx={{ marginX: '10px', cursor: 'pointer' }}
                        onClick={() => {
                          onRemoveItem('material_3', material3Ref)
                        }}
                      >
                        <TrashCanOutline color='error' />
                      </Box> */}
                    </Box>
                  ) : null}
                </Box>
                <OutlinedInput
                  id='material_3'
                  style={{ display: 'none' }}
                  type='file'
                  inputProps={{ accept: 'video/*' }}
                  onChange={event => formik.setFieldValue('material_3', event.currentTarget.files[0])}
                />
                {formik.touched.material_3 && formik.errors.material_3 && (
                  <Typography variant='caption' color='error'>
                    {formik.errors.material_3}
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
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.userDetails?.token
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
