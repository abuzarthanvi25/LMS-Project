import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const VideoModal = ({ src = '', open = () => {}, onClose = () => {}, videoLabel = '' }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 'auto',
          borderRadius: '10px'
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <video width='auto' controls>
                <source src={src} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
              <Typography textAlign={'center'} variant='body' component={'div'} gutterBottom>
                {videoLabel}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default VideoModal
