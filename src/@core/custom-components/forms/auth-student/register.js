import React, { Fragment, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import { Box, CircularProgress, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { studentRegisterInitialValues, studentRegisterValidationSchema } from 'src/@core/utils/validations/student'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserRequest } from '../../../../store/reducers/authReducer'
import { showFaliureToast, showSuccessToast } from 'src/configs/app-toast'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const StudentRegisterForm = ({
  RegisterTitle = `Adventure starts here �`,
  RegisterSubtitle = 'Make your learning easy and fun!',
  toggleRegisterMode,
  isRegisterMode
}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const [values, setValues] = useState({
    showPassword: false
  })

  const formik = useFormik({
    initialValues: studentRegisterInitialValues,
    validationSchema: studentRegisterValidationSchema,
    onSubmit: values => {
      const formData = new FormData()

      formData.append('fullName', values.fullName)
      formData.append('emailAddress', values.email)
      formData.append('password', values.password)
      formData.append('role', 'Student')

      setLoading(true)

      dispatch(registerUserRequest({ body: formData }))
        .then(res => {
          if (res.error) {
            showFaliureToast(res?.payload?.response?.data?.message)
          } else {
            showSuccessToast(res?.message)
            toggleRegisterMode()
          }
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    }
  })

  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false)

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Fragment>
      <Box sx={{ mb: 6 }}>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
          {RegisterTitle}
        </Typography>
        <Typography variant='body2'>{RegisterSubtitle}</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='fullName'
          size='small'
          label='Full Name'
          variant='outlined'
          sx={{ marginBottom: 4 }}
          {...formik.getFieldProps('fullName')}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          fullWidth
          id='email'
          size='small'
          label='Email'
          variant='outlined'
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
            size='small'
            type={values.showPassword ? 'text' : 'password'}
            error={formik.touched.password && Boolean(formik.errors.password)}
            {...formik.getFieldProps('password')}
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
        <FormControlLabel
          control={<Checkbox />}
          onChange={e => setIsPolicyAccepted(e.target.checked)}
          label={
            <Fragment>
              <span>I agree to </span>
              <Link href='#' passHref>
                <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
              </Link>
            </Fragment>
          }
        />
        <Button
          disabled={!isPolicyAccepted || loading}
          fullWidth
          size='large'
          variant='contained'
          sx={{ marginBottom: 7, marginTop: 3 }}
          type='submit'
        >
          {loading ? <CircularProgress size={20} /> : 'Register'}
        </Button>
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Typography variant='body2'>
            {isRegisterMode ? 'Already have an account? ' : "Don't have an account yet? "}
            <Button color='primary' onClick={toggleRegisterMode}>
              {isRegisterMode ? 'Login now' : 'Register now'}
            </Button>
          </Typography>
        </Box>
      </form>
    </Fragment>
  )
}

export default StudentRegisterForm
