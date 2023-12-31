import React, { Fragment, useState } from 'react'
import { useFormik } from 'formik'
import themeConfig from 'src/configs/themeConfig'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Button from '@mui/material/Button'
import { Box, Typography, Grid, MenuItem, Select, Chip, CircularProgress } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { teacherRegisterInitialValues, teacherRegisterValidationSchema } from 'src/@core/utils/validations/teacher'
import { useDispatch } from 'react-redux'
import { registerUserRequestWithFiles } from 'src/store/reducers/authReducer'
import { showFaliureToast, showSuccessToast } from 'src/configs/app-toast'

const TeacherRegisterForm = ({
  loginTitle = `Welcome to ${themeConfig.templateName}! 👋🏻`,
  loginSubtitle = 'Create a teacher account and start the adventure',
  handleTeacherRegistration
}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    showPassword: false
  })

  const formik = useFormik({
    initialValues: teacherRegisterInitialValues,
    validationSchema: teacherRegisterValidationSchema,
    onSubmit: values => {
      const formData = new FormData()

      if (values.uploadCV) {
        formData.append('cvImage', values.uploadCV)
        formData.append('fullName', values.fullName)
        formData.append('bankAccount', values.bankAccount)
        formData.append('emailAddress', values.email)
        formData.append('password', values.password)
        formData.append('education', values.education)
        formData.append('subject', values.subject)
        formData.append('role', 'Teacher')

        setLoading(true)

        dispatch(registerUserRequestWithFiles({ body: formData }))
          .then(res => {
            if (res.error) {
              showFaliureToast(res?.payload?.response?.data?.message)
            } else {
              showSuccessToast(res?.message)
              handleTeacherRegistration()
            }
            setLoading(false)
          })
          .catch(err => {
            setLoading(false)
            console.log(err)
          })
      }
    }
  })

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Fragment>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
          {loginTitle}
        </Typography>
        <Typography variant='body2'>{loginSubtitle}</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name='fullName'
              id='fullName'
              label='Full Name'
              variant='outlined'
              size='small'
              {...formik.getFieldProps('fullName')}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='email'
              label='Email'
              variant='outlined'
              size='small'
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                size='small'
                error={formik.touched.password && Boolean(formik.errors.password)}
                htmlFor='auth-login-password'
              >
                Password
              </InputLabel>
              <OutlinedInput
                label='Password'
                id='auth-login-password'
                type={values.showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                size='small'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formik.touched.password && formik.errors.password && (
                <Typography style={{ margin: '3px 14px 0px' }} variant='caption' color='error'>
                  {formik.errors.password}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                size='small'
                error={formik.touched.education && Boolean(formik.errors.education)}
                htmlFor='education'
              >
                Education
              </InputLabel>
              <Select
                id='education'
                name='education'
                size='small'
                defaultValue=''
                value={formik.values.education}
                onChange={formik.handleChange}
                label='Education'
                error={formik.touched.education && Boolean(formik.errors.education)}
              >
                <MenuItem value=''>Select Education</MenuItem>
                <MenuItem value='Intermediate/Diploma Holder'>Intermediate/Diploma Holder</MenuItem>
                <MenuItem value='Bachelors'>Bachelors</MenuItem>
                <MenuItem value='Masters'>Masters</MenuItem>
                <MenuItem value='M.phil'>M.phil</MenuItem>
                <MenuItem value='PHD/Doctrate'>PHD/Doctrate</MenuItem>
              </Select>
              {formik.touched.education && formik.errors.education && (
                <Typography style={{ margin: '3px 14px 0px' }} variant='caption' color='error'>
                  {formik.errors.education}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                size='small'
                htmlFor='subject'
              >
                Subjects
              </InputLabel>
              <Select
                id='subject'
                name='subject'
                size='small'
                defaultValue=''
                value={formik.values.subject}
                onChange={formik.handleChange}
                label='Subjects'
                error={formik.touched.subject && Boolean(formik.errors.subject)}
              >
                {/* Replace the items with your actual list of subjects */}
                <MenuItem value=''>Select Subject</MenuItem>
                <MenuItem value='Math'>Math</MenuItem>
                <MenuItem value='Science'>Science</MenuItem>
                <MenuItem value='English'>English</MenuItem>
                {/* Add more subjects as needed */}
              </Select>
              {formik.touched.subject && formik.errors.subject && (
                <Typography style={{ margin: '3px 14px 0px' }} variant='caption' color='error'>
                  {formik.errors.subject}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id='bankAccount'
              label='Bank Account Number'
              variant='outlined'
              size='small'
              {...formik.getFieldProps('bankAccount')}
              error={formik.touched.bankAccount && Boolean(formik.errors.bankAccount)}
              helperText={formik.touched.bankAccount && formik.errors.bankAccount}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept='.jpg,.pdf,.doc'
              type='file'
              style={{ display: 'none' }}
              id='upload-cv'
              onChange={event => formik.setFieldValue('uploadCV', event.currentTarget.files[0])}
            />
            <label htmlFor='upload-cv'>
              <Button variant='contained' component='span' startIcon={<CloudUploadIcon />} sx={{ marginBottom: 2 }}>
                Upload CV (JPG, PDF, DOC)
              </Button>
            </label>
            {formik.touched.uploadCV && formik.errors.uploadCV && (
              <Typography style={{ margin: '3px 14px 0px' }} variant='caption' color='error'>
                {formik.errors.uploadCV}
              </Typography>
            )}
            {formik.values.uploadCV && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                <Typography style={{ margin: '10px 0', fontWeight: 'bold' }} variant='body2'>
                  Uploaded File: {formik.values.uploadCV.name}
                </Typography>
                <Button
                  size='small'
                  onClick={() => {
                    formik.setFieldValue('uploadCV', null)
                    setPreviewImage(null)
                  }}
                  variant='contained'
                  color='error'
                >
                  Remove
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={loading}
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 2, marginTop: 3 }}
              type='submit'
            >
              {loading ? <CircularProgress size={20} /> : 'Register as Teacher'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant='body2'>
                Already have an account?{' '}
                <Button color='primary' onClick={handleTeacherRegistration}>
                  Login as a teacher now
                </Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  )
}

export default TeacherRegisterForm
