import React, { useEffect, useRef, useState } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Typography } from '@mui/material'
import DatePicker from 'react-multi-date-picker'
import EventIcon from '@mui/icons-material/Event'

const CardDetails = ({ setCardDetails, cardDetails, handleNextStep }) => {
  const [state, setState] = useState({
    focus: ''
  })

  useEffect(() => {
    formik.setValues({ ...cardDetails })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDetails])

  const datePickerRef = useRef()

  const formik = useFormik({
    initialValues: {
      name: '',
      cardNumber: '',
      expiry: '',
      cvc: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, 'Invalid Name')
        .required('Name is required'),
      cardNumber: Yup.string()
        .min(16, 'Card number must be 16 digits')
        .max(16, 'Card number must be 16 digits')
        .matches(/^\d{16}$/, 'Must be 16 digits')
        .required('Card number is required'),
      expiry: Yup.string().required('Expiry date is required'),
      cvc: Yup.string()
        .matches(/^\d+$/, 'Invalid CVC number')
        .min(3, '3 numbers please.')
        .max(3, 'Invalid CVC')
        .required('CVC is required')
    }),
    onSubmit: values => {
      // Handle form submission
      setCardDetails(values)
      handleNextStep()
    }
  })

  const handleInputFocus = fieldName => {
    setState({ focus: fieldName })
  }

  const handleMonthInput = monthNumber => {
    if (!monthNumber) return 0

    if (monthNumber < 10) {
      return `0${monthNumber}`
    }

    return monthNumber
  }

  const handleGetExpiryValue = () => {
    if (formik.values.expiry) {
      const [MM] = formik.values.expiry.split('/')

      if (MM) {
        const date = new Date().setMonth(MM - 1)

        return date
      }
    }

    return new Date()
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={12} lg={6} xl={6}>
              <Cards
                number={formik.values.cardNumber}
                expiry={formik.values.expiry}
                cvc={formik.values.cvc}
                name={formik.values.name}
                focused={state.focus}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6} xl={6}>
              <Grid container spacing={2}>
                <Grid style={{ margin: '5px 0px' }} item xs={12}>
                  <TextField
                    type='text'
                    size='small'
                    name='name'
                    label='Name'
                    onFocus={() => handleInputFocus('name')}
                    fullWidth
                    required
                    {...formik.getFieldProps('name')}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid style={{ margin: '5px 0px' }} item xs={12}>
                  <TextField
                    type='number'
                    size='small'
                    name='cardNumber'
                    defaultValue={cardDetails.cardNumber}
                    label='Card Number'
                    required
                    {...formik.getFieldProps('cardNumber')}
                    onFocus={() => handleInputFocus('number')}
                    fullWidth
                    error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                    helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                  />
                </Grid>
                <Grid style={{ margin: '5px 0px' }} item xs={6}>
                  <TextField
                    type='number'
                    size='small'
                    name='cvc'
                    label='CVC'
                    defaultValue={cardDetails.cvc}
                    {...formik.getFieldProps('cvc')}
                    onFocus={() => handleInputFocus('cvc')}
                    fullWidth
                    required
                    error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                    helperText={formik.touched.cvc && formik.errors.cvc}
                  />
                </Grid>
                <Grid style={{ margin: '5px 0px' }} item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Button onClick={() => datePickerRef.current.openCalendar()}>
                      <EventIcon style={{ fontSize: '30px' }} />
                    </Button>
                    <Typography
                      onClick={() => datePickerRef.current.openCalendar()}
                      size='small'
                      sx={{ cursor: 'pointer' }}
                      component={'span'}
                      variant='caption'
                    >
                      Card Expiry
                    </Typography>
                  </Box>
                  <DatePicker
                    ref={datePickerRef}
                    name='expiry'
                    style={{ visibility: 'hidden', overflow: 'auto' }}
                    placeholder='Valid Thru (MM/YY)'
                    calendarPosition='top'
                    {...formik.getFieldProps('expiry')}
                    value={handleGetExpiryValue()}
                    minDate={new Date()}
                    onlyMonthPicker
                    onChange={e => {
                      handleInputFocus('expiry')
                      formik.setFieldValue('expiry', `${handleMonthInput(e?.month?.number)}/${e?.year}`)
                    }}
                    format={'MM/YYYY'}
                  />
                  {formik.touched.expiry && formik.errors.expiry ? (
                    <Typography color='error' variant='caption'>
                      {formik.errors.expiry}
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={12}>
              <Button style={{ padding: '6px 30px' }} type='submit' variant='contained' color='primary'>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  )
}

export default CardDetails
