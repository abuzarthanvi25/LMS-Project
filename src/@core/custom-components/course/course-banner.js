import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const CourseBanner = ({
  bannerDesc = 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
  bannerTitle = 'lorem lorem lorem'
}) => {
  const theme = useTheme()

  return (
    <Box
      style={{
        margin: '10px',
        padding: '10px',
        border: ` 2px solid ${theme.palette.grey[500]}`,
        borderRadius: '15px'
      }}
    >
      <Typography variant='h6' fontWeight={'bolder'}>
        {bannerTitle}
      </Typography>
      <Typography sx={{ fontSize: '0.9rem' }} variant='body'>
        {bannerDesc}
      </Typography>
    </Box>
  )
}

export default CourseBanner
