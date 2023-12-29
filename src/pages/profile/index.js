// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Grid, Typography, useTheme } from '@mui/material'
import CourseProgress from '../../@core/custom-components/course-progress'

const ProfileBanner = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '130px',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 150,
  height: 150,
  marginRight: theme.spacing(6.25),
  borderRadius: '50%',
  position: 'absolute',
  top: 135,
  right: '556px',
  border: '4px solid #fff',
  zIndex: 999
}))

const AccountSettings = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/3.png')
  const theme = useTheme()

  return (
    <Card style={{ boxShadow: '10px 10px 5px 0px #EBEDEF' }}>
      <ProfileBanner>
        <img
          style={{ width: '100%', objectFit: 'cover', height: '100%' }}
          alt='banner'
          src='/images/custom-images/banner.jpg'
        />
      </ProfileBanner>
      <Box>
        <ImgStyled src={imgSrc} alt='Profile Pic' />
      </Box>
      <Box style={{ position: 'absolute', top: '100px', marginLeft: '20px' }}>
        <Typography color={'white'} variant='h2'>
          John Doe
        </Typography>
        <Typography color={'white'} sx={{ fontSize: '15px', letterSpacing: '2px', fontWeight: 600 }}>
          Student
        </Typography>
      </Box>
      <Grid sx={{ marginTop: '50px', padding: '15px 20px' }} container>
        <Grid item md={6} sx={{ padding: '0px 15px', marginTop: '60px' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>
            Personal Details
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Full Name
            </Typography>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Kumail Zaidi
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Email Address
            </Typography>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              kumail@gmail.com
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Account Type
            </Typography>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Student
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6} sx={{ padding: '0px 15px', marginTop: '60px' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>
            Educational Details
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Education Level
            </Typography>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Bachelors
            </Typography>
          </Box>
        </Grid>
        <Grid item md={12} sx={{ padding: '0px 15px', marginTop: '60px' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>
            Your Courses
          </Typography>

          <Grid container>
            <Grid item md={6}>
              <CourseProgress courseName={"Database and API's Development"} progress={30} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6}>
              <CourseProgress courseName={'Frontend Web Development'} progress={40} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6}>
              <CourseProgress courseName={'Responsive Design'} progress={70} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6}>
              <CourseProgress courseName={'Software Designing'} progress={100} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default AccountSettings
