// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Grid, Typography } from '@mui/material'
import CourseProgress from '../../@core/custom-components/course-progress'

const ProfileBanner = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '130px',
  [theme.breakpoints.down('xs')]: {
    height: '120px'
  },
  [theme.breakpoints.down('sm')]: {
    height: '120px'
  },
  [theme.breakpoints.up('md')]: {
    height: '120px' // Adjust the height for medium and larger screens
  },
  [theme.breakpoints.up('lg')]: {
    height: '125px' // Adjust the height for large screens
  },
  [theme.breakpoints.up('xl')]: {
    height: '125px' // Adjust the height for large screens
  }
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 150,
  height: 150,
  marginRight: theme.spacing(6.25),
  borderRadius: '50%',
  position: 'absolute',
  top: 135,
  right: '50%', // Center the image horizontally
  transform: 'translateX(50%)', // Center the image horizontally
  border: '4px solid #fff',
  zIndex: 999,
  [theme.breakpoints.up('xs')]: {
    width: 120, // Adjust width for medium and larger screens
    height: 120, // Adjust height for medium and larger screens
    right: '44%',
    top: 150
  },
  [theme.breakpoints.up('md')]: {
    width: 150, // Adjust width for medium and larger screens
    height: 150, // Adjust height for medium and larger screens
    right: '50%'
  },
  [theme.breakpoints.up('lg')]: {
    width: 150, // Adjust width for large screens
    height: 150, // Adjust height for large screens
    right: '40%'
  },
  [theme.breakpoints.up('xl')]: {
    width: 150, // Adjust width for large screens
    height: 150, // Adjust height for large screens
    right: '44%'
  }
}))

const AccountSettings = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/3.png')

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
      <Grid sx={{ marginTop: '50px', padding: '15px 20px', width: '100%' }} container>
        <Grid item xs={12} sm={12} md={6} sx={{ padding: '0px 15px', marginTop: '60px' }}>
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
        <Grid xs={12} sm={12} md={6} sx={{ padding: '0px 15px', marginTop: '60px' }}>
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
        <Grid item xs={12} sm={12} md={12} sx={{ padding: '0px 15px', marginTop: '60px' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>
            Your Courses
          </Typography>

          <Grid container>
            <Grid item sm={12} md={6}>
              <CourseProgress courseName={"Database and API's Development"} progress={30} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={6}>
              <CourseProgress courseName={'Frontend Web Development'} progress={40} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={6}>
              <CourseProgress courseName={'Responsive Design'} progress={70} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} md={6}>
              <CourseProgress courseName={'Software Designing'} progress={100} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default AccountSettings
