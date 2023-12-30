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
import { Box, CircularProgress, Typography } from '@mui/material'
import { teacherLoginInitialValues, teacherLoginValidationSchema } from 'src/@core/utils/validations/teacher'
import { useDispatch } from 'react-redux'
import { loginUserRequest } from 'src/store/reducers/authReducer'
import { showFaliureToast, showSuccessToast } from 'src/configs/app-toast'
import { useRouter } from 'next/router'
import { unwrapResult } from '@reduxjs/toolkit'

const TeacherLoginForm = ({
  loginTitle = `Welcome to ${themeConfig.templateName}! 👋🏻`,
  loginSubtitle = 'Please sign-in to your account and start the adventure',
  handleTeacherRegistration
}) => {
  const dispatch = useDispatch()

  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    showPassword: false
  })

  const router = useRouter()

  const formik = useFormik({
    initialValues: teacherLoginInitialValues,
    validationSchema: teacherLoginValidationSchema,
    onSubmit: values => {
      setLoading(true)

      const payload = {
        emailAddress: values.email,
        password: values.password
      }

      dispatch(loginUserRequest({ body: payload }))
        .then(unwrapResult)
        .then(res => {
          showSuccessToast(res?.data?.message)
          router.push('/dashboard')
          setLoading(false)
        })
        .catch(err => {
          showFaliureToast(err?.response?.data?.message)
          setLoading(false)
        })
    }
  })

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRegisterClick = () => {
    setIsRegisterMode(true)
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
        <TextField
          fullWidth
          id='email'
          label='Email'
          variant='outlined'
          size='small' // Added to make the field smaller
          sx={{ marginBottom: 4 }}
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <FormControl fullWidth>
          <InputLabel
            size='small'
            error={formik.touched.password && Boolean(formik.errors.password)}
            style={{
              color: theme => (formik.touched.password && formik.errors.password ? theme.palette.error.main : undefined)
            }}
            htmlFor='auth-login-password'
          >
            Password
          </InputLabel>
          <OutlinedInput
            label='Password'
            id='auth-login-password'
            type={values.showPassword ? 'text' : 'password'}
            error={formik.touched.password && Boolean(formik.errors.password)}
            {...formik.getFieldProps('password')}
            size='small' // Added to make the field smaller
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
        <Button
          disabled={loading}
          fullWidth
          size='large'
          variant='contained'
          sx={{ marginBottom: 2, marginTop: 3 }}
          type='submit'
        >
          {loading ? <CircularProgress size={20} /> : 'Login'}
        </Button>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Typography variant='body2'>
            {isRegisterMode ? 'Already have an account? ' : "Don't have an account yet? "}
            <Button color='primary' onClick={handleTeacherRegistration}>
              {'Register as a teacher now'}
            </Button>
          </Typography>
        </Box>
      </form>
    </Fragment>
  )
}

export default TeacherLoginForm
