// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Grid, Typography, Skeleton, Button } from '@mui/material'
import CourseProgress from '../../@core/custom-components/course-progress'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProfileDetailsRequest } from '../../store/reducers/profileReducer'
import { unwrapResult } from '@reduxjs/toolkit'
import { showFaliureToast } from 'src/configs/app-toast'
import get from 'lodash/get'
import PreviewImage from '../../@core/custom-components/modals/preview-image'
import { ROLES } from 'src/configs/role-constants'

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

// Define the skeleton styles
const SkeletonBanner = styled('div')(({ theme }) => ({
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
    height: '120px'
  },
  [theme.breakpoints.up('lg')]: {
    height: '125px'
  },
  [theme.breakpoints.up('xl')]: {
    height: '125px'
  }
}))

const SkeletonImg = styled(Skeleton)(({ theme }) => ({
  width: 150,
  height: 150,
  marginRight: theme.spacing(6.25),
  borderRadius: '50%',
  position: 'absolute',
  top: 135,
  right: '50%',
  transform: 'translateX(50%)',
  border: '4px solid #fff',
  zIndex: 999,
  [theme.breakpoints.up('xs')]: {
    width: 120,
    height: 120,
    right: '44%',
    top: 150
  },
  [theme.breakpoints.up('md')]: {
    width: 150,
    height: 150,
    right: '50%'
  },
  [theme.breakpoints.up('lg')]: {
    width: 150,
    height: 150,
    right: '40%'
  },
  [theme.breakpoints.up('xl')]: {
    width: 150,
    height: 150,
    right: '44%'
  }
}))

const ProfileDetails = ({ profileDetails, token, getProfileDetailsRequest, courses = [] }) => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/3.png')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fullName = get(profileDetails, 'data.fullName', '')
  const emailAddress = get(profileDetails, 'data.emailAddress', '')
  const role = get(profileDetails, 'data.role', 'Student')
  const education = get(profileDetails, 'data.education', '')
  const subject = get(profileDetails, 'data.subject', '')
  const cvImage = get(profileDetails, 'data.cvImage', '')
  const isVerified = get(profileDetails, 'data.isVerified', false)

  useEffect(() => {
    handleGetProfileDetails()
  }, [])

  const handleGetProfileDetails = () => {
    try {
      if (token) {
        setLoading(true)
        getProfileDetailsRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => showFaliureToast(error?.response?.data?.message))
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Card style={{ boxShadow: '10px 10px 5px 0px #EBEDEF' }}>
      <PreviewImage open={open} src={cvImage} imageLabel='CV Image' onClose={() => setOpen(false)} />
      {loading ? (
        <SkeletonBanner>
          <Skeleton animation='wave' variant='rectangular' width='100%' height='100%' />
        </SkeletonBanner>
      ) : (
        <ProfileBanner>
          <img
            style={{ width: '100%', objectFit: 'cover', height: '100%' }}
            alt='banner'
            src='/images/custom-images/banner.jpg'
          />
        </ProfileBanner>
      )}

      <Box>{loading ? <SkeletonImg /> : <ImgStyled src={imgSrc} alt='Profile Pic' />}</Box>
      <Box style={{ position: 'absolute', top: '100px', marginLeft: '20px' }}>
        {loading ? (
          <>
            <Skeleton animation='wave' variant='text' width={200} height={80} />
            <Skeleton animation='wave' variant='text' width={200} height={20} />
          </>
        ) : (
          <>
            <Typography color={'white'} variant='h2'>
              {fullName}
            </Typography>
            <Typography color={'white'} sx={{ fontSize: '15px', letterSpacing: '2px', fontWeight: 600 }}>
              {role}
            </Typography>
          </>
        )}
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
            {loading ? (
              <Skeleton animation='wave' variant='text' width={200} height={40} />
            ) : (
              <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                {fullName}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Email Address
            </Typography>
            {loading ? (
              <Skeleton animation='wave' variant='text' width={200} height={40} />
            ) : (
              <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                {emailAddress}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
            <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
              Account Type
            </Typography>
            {loading ? (
              <Skeleton animation='wave' variant='text' width={200} height={40} />
            ) : (
              <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                {role}
              </Typography>
            )}
          </Box>
        </Grid>
        {role == ROLES.teacher ? (
          <Grid item xs={12} sm={12} md={6} sx={{ padding: '0px 15px', marginTop: '60px' }}>
            <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>
              Educational Details
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
              <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                Education Level
              </Typography>
              {loading ? (
                <Skeleton animation='wave' variant='text' width={200} height={40} />
              ) : (
                <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                  {education ?? 'Bachelors'}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
              <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                Subject
              </Typography>
              {loading ? (
                <Skeleton animation='wave' variant='text' width={200} height={40} />
              ) : (
                <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                  {subject ?? 'Maths'}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
              <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                Verification Status
              </Typography>
              {loading ? (
                <Skeleton animation='wave' variant='text' width={200} height={40} />
              ) : (
                <Typography variant='body' color={isVerified ? 'green' : 'error'} sx={{ fontWeight: 'bolder' }}>
                  {isVerified ? 'Verified' : 'Not Verified'}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap' }}>
              <Typography variant='body' sx={{ fontWeight: 'bolder' }}>
                CV Image
              </Typography>
              {loading ? (
                <Skeleton animation='wave' variant='text' width={200} height={40} />
              ) : (
                <Button
                  onClick={() => setOpen(true)}
                  variant='contained'
                  sx={{ fontWeight: 'bolder', cursor: 'pointer' }}
                >
                  View Image
                </Button>
              )}
            </Box>
          </Grid>
        ) : null}
        {role == ROLES.student && (
          <Grid
            item
            xs={12}
            sm={12}
            md={role == ROLES.teacher ? 12 : 6}
            lg={role == ROLES.teacher ? 12 : 6}
            sx={{ padding: '0px 15px', marginTop: '60px' }}
          >
            <Typography variant='h5' sx={{ fontWeight: 'bolder' }}>
              Your Courses
            </Typography>

            <Grid container spacing={3}>
              {courses.length ? (
                courses.slice(0, 4).map(({ courseTitle }, _) => (
                  <Grid key={_} item sm={12} md={role == ROLES.teacher ? 6 : 12} lg={role == ROLES.teacher ? 6 : 12}>
                    <CourseProgress
                      loading={loading}
                      courseName={courseTitle}
                      progress={Math.round(Math.random() * 100)}
                    />
                  </Grid>
                ))
              ) : (
                <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} item>
                  <Typography color={'gray'} variant='body'>
                    You are not enrolled in any courses yet
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.userDetails?.token,
    profileDetails: state.profile.profileDetails,
    courses: state.courses.allCoursesStudent,
    rehydrated: state._persist.rehydrated
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getProfileDetailsRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)
