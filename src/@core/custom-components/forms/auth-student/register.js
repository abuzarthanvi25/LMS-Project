import React, { Fragment } from 'react'
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
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const StudentRegisterForm = ({
  onSubmit,
  RegisterTitle = `Adventure starts here 🚀`,
  RegisterSubtitle = 'Make your learning easy and fun!'
}) => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: values => {
      onSubmit(values)
    }
  })

  const handleClickShowPassword = () => {
    formik.setValues({ ...formik.values, showPassword: !formik.values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Fragment>
      <Box sx={{ mb: 6 }}>
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
          {RegisterTitle}
        </Typography>
        <Typography variant='body2'>{RegisterSubtitle}</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          fullWidth
          id='fullName'
          label='Full Name'
          variant='outlined'
          sx={{ marginBottom: 4 }}
          {...formik.getFieldProps('fullName')}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />
        <TextField
          autoFocus
          fullWidth
          id='email'
          label='Email'
          variant='outlined'
          sx={{ marginBottom: 4 }}
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <FormControl fullWidth>
          <InputLabel
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
            type={formik.values.showPassword ? 'text' : 'password'}
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
                  {formik.values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
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
          label={
            <Fragment>
              <span>I agree to </span>
              <Link href='#' passHref>
                <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
              </Link>
            </Fragment>
          }
        />
        <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7, marginTop: 3 }} type='submit'>
          Register
        </Button>
      </form>
    </Fragment>
  )
}

export default StudentRegisterForm
