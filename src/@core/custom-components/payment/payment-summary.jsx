import { Box, Grid, Typography, Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { coursePaymentRequest } from "../../../store/reducers/courseReducer"
import { unwrapResult } from '@reduxjs/toolkit';
import { showFaliureToast, showSuccessToast } from 'src/configs/app-toast';

const PaymentSummary = ({ details, cardDetails, token, coursePaymentRequest, handleNextStep, onClose }) => {

  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    try {
      if (token) {
        setLoading(true)

        const [MM, YYYY] = cardDetails?.expiry.split("/");

        if (MM && YYYY) {
          const coursePaymentBody = {
            courseId: details?._id,
            cardNumber: cardDetails?.cardNumber,
            expMonth: MM,
            expYear: YYYY,
            cvc: cardDetails?.cvc
          }

          coursePaymentRequest({ token, body: coursePaymentBody })
            .then(unwrapResult)
            .then((res) => {
              setLoading(false)
              handleNextStep()
              showSuccessToast(res?.data?.message)
              setTimeout(() => onClose(), 800)
            })
            .catch(error => {
              showFaliureToast(error?.response?.data?.message)
              setLoading(false)
            })
        }

      }
    } catch (error) {
      setLoading(false)
    }

  }

  return (
    <Box>
      <Typography variant='h6' sx={{ textAlign: 'center', marginY: '10px', fontWeight: 'bolder' }}>Your Current Payment Summary</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box>
                <img width={'90%'} height={'160px'} src={details?.courseThumbnail} alt={details?.courseTitle} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box sx={{ marginY: '8px' }}>
                <Typography variant='body' style={{ fontWeight: 'bold', fontSize: '1rem' }}>Course Title :</Typography>
                <Typography style={{ fontWeight: '500', fontSize: '0.7rem' }}>{details?.courseTitle}</Typography>
              </Box>
              <Box sx={{ marginY: '8px' }}>
                <Typography variant='body' style={{ fontWeight: 'bold', fontSize: '1rem' }}>Course Description :</Typography>
                <Typography style={{ fontWeight: '500', fontSize: '0.7rem' }}>{details?.courseDescription}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant='h5' sx={{ textAlign: 'center', fontWeight: '800' }}>Subtotal: ${details?.price}</Typography>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item md={12}>
          <Button sx={{minWidth: '160px'}} onClick={handlePayment} variant='contained'>{loading ? <CircularProgress style={{color: '#fff'}} size={20} /> : 'Confirm Payment'}</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.userDetails?.token
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      coursePaymentRequest,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSummary)
