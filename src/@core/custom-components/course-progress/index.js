import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Skeleton } from '@mui/material'

const SkeletonCourse = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Skeleton animation='wave' width='50%' />
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: '100%', marginTop: '8px' }}>
          <Skeleton animation='wave' width='50%' />
          <LinearProgress sx={{ borderRadius: 10 }} variant='determinate' color='success' value={0} />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

const Course = ({ courseName, progress, loading }) => {
  if (loading) {
    return <SkeletonCourse />
  }

  const accordionStyle = {
    width: '100%',
    boxShadow: 'none',
    padding: 0,
    border: '2px solid grey',
    marginTop: '10px',
    borderRadius: '15px'
  }

  const progressBarContainerStyle = {
    width: '100%',
    marginTop: '8px'
  }

  return (
    <Accordion style={accordionStyle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='body' sx={{ fontWeight: 500 }}>
          {courseName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={progressBarContainerStyle}>
          <Typography variant='caption' fontWeight={900}>
            Course Progress {progress}%
          </Typography>
          <LinearProgress sx={{ borderRadius: 10 }} variant='determinate' color='success' value={progress} />
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default Course
