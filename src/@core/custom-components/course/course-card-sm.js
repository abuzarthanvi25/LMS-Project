import { Typography, Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { truncateString } from 'src/@core/utils/helpers'

const CourseCardSmall = ({ course, id = '' }) => {
  const router = useRouter()

  const handleDetails = text => {
    if (!text || typeof text !== 'string') return

    if (text.length > 66) {
      return text.slice(0, 40) + '...'
    }

    return text
  }

  const theme = useTheme()

  const activeStyles = {
    backgroundColor: theme.palette.grey[600],
    borderRadius: '20px'
  }

  return (
    <Grid
      style={id == course?._id ? { ...activeStyles } : {}}
      onClick={() => router.push(`/courses/${course?._id}`)}
      container
      sx={{ marginY: '10px', padding: '10px', cursor: 'pointer' }}
    >
      <Grid item md={6}>
        <Box style={{ height: '90px' }}>
          <img
            style={{ borderRadius: '10px', objectFit: 'cover', maxWidth: '100%', height: '100%', width: '100%' }}
            src={course?.courseThumbnail}
            alt={course?.courseTitle}
          />
        </Box>
      </Grid>
      <Grid sx={{ padding: '10px' }} item md={6}>
        <Typography style={{ fontSize: '0.9rem', fontWeight: 'bolder' }} variant={'body'}>
          {course?.courseTitle}
        </Typography>
        <Box>
          <Typography style={{ fontWeight: '600' }} variant='caption'>
            {truncateString(course?.courseDescription, 20)}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CourseCardSmall
