import { Typography, Box, Button, Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const CourseCard = ({ courseDetails }) => {
  const theme = useTheme()

  return (
    <Card style={{ minHeight: '460px', width: 'auto' }}>
      <Box
        style={{
          backgroundImage: `url(${courseDetails?.courseThumbnail})`,
          backgroundSize: '100%',
          width: 'auto',
          height: '220px',
          backgroundRepeat: 'no-repeat',
          backgroundSize:'cover'
        }}
      ></Box>
      <Box style={{display: 'flex', flexDirection:'column', justifyContent:'flex-end'}}>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <Box sx={{ marginY: '10px' }}>
              <Typography variant='h5' textAlign={'center'}>
                {courseDetails?.courseTitle}
              </Typography>
            </Box>
            <Box sx={{ marginY: '10px', padding: '10px', width:'100%' }}>
              <Typography sx={{fontSize:'0.9rem', textAlign:'center' }} variant='body' textAlign={'center'}>
                {courseDetails?.courseDescription}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0px 0px' }}>
          <Button style={{ padding: '10px 25px' }} variant={'outlined'}>
            Enroll Now
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default CourseCard
