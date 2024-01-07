import { Typography, Box, Button, Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const CourseCard = ({ courseDetails }) => {
  const theme = useTheme()

  return (
    <Card style={{ minHeight: '500px', width: 'auto' }}>
      <Box
        style={{
          backgroundImage: `url(${courseDetails?.courseThumbnail})`,
          backgroundSize: '100%',
          width: '100%',
          height: '220px',
          backgroundRepeat: 'no-repeat',
          border: `1px solid ${theme.palette.grey[500]}`
        }}
      ></Box>
      <Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <Box sx={{ marginY: '10px' }}>
              <Typography variant='h5' textAlign={'center'}>
                {courseDetails?.courseTitle}
              </Typography>
            </Box>
            <Box sx={{ marginY: '10px', padding: '10px' }}>
              <Typography variant='body' textAlign={'center'}>
                {courseDetails?.courseDescription}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0px' }}>
          <Button style={{ padding: '10px 25px' }} variant={'outlined'}>
            Enroll Now
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default CourseCard
