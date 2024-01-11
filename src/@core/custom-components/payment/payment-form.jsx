import { Alert, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import CustomStepper from './stepper'
import DetailsIcon from '@mui/icons-material/ListOutlined'
import CardDetailsIcon from '@mui/icons-material/CreditCardOutlined'
import { areStepsCompleted, getActiveIndex, handleBack, handleNext } from 'src/@core/utils/helpers'
import CardDetails from './card-details'
import PaymentSummary from './payment-summary'

const DetailsForm = ({ details, onClose }) => {

  const [steps, setSteps] = useState([
    {
      title: 'Card Details',
      active: true,
      completed: false,
      icon: () => <CardDetailsIcon />
    },
    {
      title: 'Confirmation',
      active: false,
      completed: false,
      icon: () => <DetailsIcon />
    }
  ])
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleNextStep = () => handleNext(steps, setSteps);
  const handleBackStep = () => handleBack(steps, setSteps);

  const handleRenderSection = () => {
    const currentStep = getActiveIndex(steps)
    if (!areStepsCompleted(steps)) {
      switch (currentStep) {
        case 0: return <><CardDetails handleNextStep={handleNextStep} cardDetails={cardDetails} setCardDetails={setCardDetails} /></>
        case 1: return <><PaymentSummary onClose={onClose} handleNextStep={handleNextStep} cardDetails={cardDetails} details={details} /></>
        default: return null
      }
    }

    return <>
      <Box sx={{marginY: '20px'}}>
        <Alert variant="filled" severity="success">
          You are now enrolled on the course: {details?.courseTitle}
        </Alert>
      </Box>
    </>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleBackStep} >Back</Button>
        <Button onClick={handleNextStep} >Next</Button>
      </Box>
      <CustomStepper steps={steps} />
      {handleRenderSection()}
    </Box>
  )
}

export default DetailsForm
