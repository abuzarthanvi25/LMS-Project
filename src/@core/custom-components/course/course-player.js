import { useTheme } from '@emotion/react'
import { Box, Skeleton } from '@mui/material'

const CoursePlayer = ({ src, posterImg }) => {
  const theme = useTheme()
  return (
    <>
      {src ? (
        <Box style={{ width: '100%', maxHeight: '448px', maxWidth: '796px', width: 'auto' }}>
          <video
            poster={posterImg}
            key={src}
            style={{ borderRadius: '20px', objectFit: 'cover', maxWidth: '100%', height: '400px', width: '100%' }}
            width='auto'
            controls
          >
            <source src={src} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </Box>
      ) : (
        <Skeleton animation='wave' style={{ borderRadius: '20px' }} />
      )}
    </>
  )
}

export default CoursePlayer
