import { Typography, Box, Button, Card, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { truncateString } from 'src/@core/utils/helpers'

const CourseCard = ({ courseDetails, handleAction = () => {}, actionTitle }) => {
  const theme = useTheme()

  const [isTooltipOpen, setTooltipOpen] = useState(false);

  const handleMouseEnter = () => {
    setTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };

  const handleEnrollStudent = () => {
    handleAction(courseDetails)
  }

  return (
    <Card style={{ minHeight: '400px', width: 'auto' }}>
      <Box
        style={{
          backgroundImage: `url(${courseDetails?.courseThumbnail})`,
          backgroundSize: '100%',
          width: 'auto',
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      ></Box>
      <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5px' }}>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <Box sx={{ marginTop: '10px' }}>
              <Typography variant='h6' textAlign={'center'}>
                {courseDetails?.courseTitle}
              </Typography>
            </Box>
            <Box
              sx={{  padding: '10px', width: '100%' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Tooltip open={isTooltipOpen} placement='top' title={courseDetails?.courseDescription} arrow>
                <Typography
                  sx={{ fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold' }}
                  variant='body'
                  textAlign={'center'}
                >
                  {truncateString(courseDetails?.courseDescription, 30)}
                </Typography>
              </Tooltip>
            </Box>
            <Box
              sx={{ width: '100%' }}
            >
              <Typography
                sx={{ fontSize: '1.2rem', textAlign: 'center', fontWeight: 'bold' }}
                textAlign={'center'}
              >
                ${courseDetails?.price}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={handleEnrollStudent} style={{ padding: '10px 25px', marginTop:'10px' }} variant={'outlined'}>
            {actionTitle}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default CourseCard
