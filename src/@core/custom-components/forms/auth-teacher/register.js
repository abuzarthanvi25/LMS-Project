import React, { Fragment, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
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
import { Box, Typography, Grid, MenuItem, Select, Chip } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const TeacherRegisterForm = ({
  onSubmit,
  loginTitle = `Welcome to ${themeConfig.templateName}! 👋🏻`,
  loginSubtitle = 'Create a teacher account and start the adventure',
  handleTeacherRegistration
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      subjects: [],
      uploadCV: null
    },
    validationSchema: Yup.object({
      fullName: isRegisterMode ? Yup.string().required('Required') : Yup.string(),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      subjects: Yup.array().min(1, 'Select at least one subject'),
      uploadCV: Yup.mixed()
        .required('Upload CV is required')
        .test('fileSize', 'File size is too large (max 5 MB)', value => value && value.size <= 5 * 1024 * 1024)
    }),
    onSubmit: values => {
      const formData = new FormData()
      formData.append('uploadCV', values.uploadCV)

      console.log(formData.get('uploadCV'))

      onSubmit({ isRegisterMode, data: { ...values, uploadCV: formData } })
    }
  })

  const handleClickShowPassword = () => {
    formik.setValues({ ...formik.values, showPassword: !formik.values.showPassword })
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
        <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
          {loginTitle}
        </Typography>
        <Typography variant='body2'>{loginSubtitle}</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
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
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                id='auth-login-password'
                type={formik.values.showPassword ? 'text' : 'password'}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor='subjects'>Subjects</InputLabel>
              <Select
                id='subjects'
                name='subjects'
                multiple
                value={formik.values.subjects}
                onChange={formik.handleChange}
                renderValue={selected => (
                  <div>
                    {selected.map(value => (
                      <Chip key={value} label={value} style={{ margin: '2px' }} />
                    ))}
                  </div>
                )}
                label='Subjects'
                error={formik.touched.subjects && Boolean(formik.errors.subjects)}
              >
                {/* Replace the items with your actual list of subjects */}
                <MenuItem value='Math'>Math</MenuItem>
                <MenuItem value='Science'>Science</MenuItem>
                <MenuItem value='English'>English</MenuItem>
                {/* Add more subjects as needed */}
              </Select>
              {formik.touched.subjects && formik.errors.subjects && (
                <Typography style={{ margin: '3px 14px 0px' }} variant='caption' color='error'>
                  {formik.errors.subjects}
                </Typography>
              )}
            </FormControl>
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
              <Typography style={{ margin: '10px 0' }} variant='body2'>
                Uploaded File: {formik.values.uploadCV.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 2, marginTop: 3 }} type='submit'>
              Register as Teacher
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
