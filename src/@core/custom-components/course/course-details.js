import { Box, Grid, Typography } from '@mui/material'
import CourseCardSmall from './course-card-sm'
import CoursePlayer from './course-player'
import CourseBanner from './course-banner'
import { useTheme } from '@mui/material/styles'

const CourseDetails = ({ courseList, courseDetails, id }) => {
  const theme = useTheme()

  return (
    <Box>
      <Grid spacing={2} container>
        <Grid item md={8}>
          <CoursePlayer src={courseDetails?.material_1} posterImg={courseDetails?.courseThumbnail} />
          <Box sx={{ marginY: '10px' }}>
            <Typography variant='h5' fontWeight={'500'}>
              {courseDetails?.courseTitle}
            </Typography>
          </Box>
          <Box sx={{ padding: '10px', backgroundColor: theme.palette.primary.dark, borderRadius: '15px' }}>
            <Typography variant='body' style={{ fontSize: '0.9rem', lineHeight: '2px' }} fontWeight={'500'}>
              {courseDetails?.courseDescription}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={4}>
          <CourseBanner />
          {!!courseList.length &&
            courseList.map((course, index) => <CourseCardSmall id={id} key={index} course={course} />)}
        </Grid>
      </Grid>
    </Box>
  )
}

export default CourseDetails
