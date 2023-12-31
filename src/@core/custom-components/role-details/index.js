import { Modal, Card, CardContent, Button, Grid, Typography, Box, Chip, CircularProgress } from '@mui/material'
import React from 'react'

const RoleDetails = ({ open = false, onClose = () => {}, details = {}, onApprove = () => {}, loading = false }) => {
  return (
    <Modal className={'selectionModal'} open={open} onClose={onClose} centered>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 500,
          borderRadius: '10px'
        }}
      >
        <CardContent>
          <Typography textAlign={'center'} variant='h4'>
            Teacher Details
          </Typography>
          <Grid sx={{ marginY: 5 }} container spacing={2}>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>Full Name</strong>
                </Typography>
                <Typography>{details?.fullName}</Typography>
              </Box>
            </Grid>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>email Address</strong>
                </Typography>
                <Typography>{details?.emailAddress}</Typography>
              </Box>
            </Grid>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>Role</strong>
                </Typography>
                <Typography>{details?.role}</Typography>
              </Box>
            </Grid>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>Education</strong>
                </Typography>
                <Typography>{details?.education}</Typography>
              </Box>
            </Grid>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>Subject</strong>
                </Typography>
                <Typography>{details?.subject}</Typography>
              </Box>
            </Grid>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>Created At</strong>
                </Typography>
                <Typography>{details?.createdAt}</Typography>
              </Box>
            </Grid>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>Updated At</strong>
                </Typography>
                <Typography>{details?.updatedAt}</Typography>
              </Box>
            </Grid>
            <Grid sx={{ marginY: 1 }} item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <strong>Is Verified</strong>
                </Typography>
                <Chip
                  label={details?.isVerified ? 'Approved' : 'Unapproved'}
                  color={details?.isVerified ? 'success' : 'error'}
                  sx={{
                    height: 24,
                    fontSize: '0.75rem',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { fontWeight: 500 }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  onApprove(), onClose()
                }}
              >
                {loading ? (
                  <CircularProgress size={20} />
                ) : details?.isVerified ? (
                  `Unapprove ${details?.role}`
                ) : (
                  `Approve ${details?.role}`
                )}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default RoleDetails
