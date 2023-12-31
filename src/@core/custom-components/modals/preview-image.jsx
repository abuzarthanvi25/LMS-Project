import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const ImageModal = ({ src = '', open = () => {}, onClose = () => {}, imageLabel = '' }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 500,
          borderRadius: '10px',
          backgroundColor: '#fff'
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <img src={src} alt={imageLabel} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
              <Typography textAlign={'center'} variant='body' component={'div'} gutterBottom>
                {imageLabel}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default ImageModal
