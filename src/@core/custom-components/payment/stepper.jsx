import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { getActiveIndex } from '../../utils/helpers'
import { Typography } from '@mui/material'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 35,
  height: 35,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  })
}))

function ColorlibStepIcon({ active, completed, Icon }) {
  return <ColorlibStepIconRoot ownerState={{ completed, active }}>{Icon()}</ColorlibStepIconRoot>
}

const stepsLocal = [
  {
    title: 'Select campaign settings',
    active: false,
    completed: false,
    icon: () => <SettingsIcon />
  },
  {
    title: 'Create an ad group',
    active: false,
    completed: false,
    icon: () => <GroupAddIcon />
  },
  {
    title: 'Create an ad',
    active: false,
    completed: false,
    icon: () => <VideoLabelIcon />
  }
]

export default function CustomStepper({ steps = stepsLocal }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Stepper alternativeLabel activeStep={getActiveIndex(steps)} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              StepIconComponent={() =>
                ColorlibStepIcon({
                  active: label.active,
                  completed: label.completed,
                  Icon: !label.completed ? label.icon : () => <CheckCircleIcon />
                })
              }
            >
              <Typography variant='caption'>{label.title}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  )
}
