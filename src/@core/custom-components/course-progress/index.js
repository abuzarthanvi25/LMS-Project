import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Course = ({ courseName, progress }) => {
  // Inline styles
  const accordionStyle = {
    width: '100%',
    boxShadow: 'none', // Remove the box shadow if desired
    padding: 0,
    border: '2px solid grey',
    marginTop: '10px',
    borderRadius: '15px'
  }

  const progressBarContainerStyle = {
    width: '100%',
    marginTop: '8px' // Adjust spacing as needed
  }

  return (
    <Accordion style={accordionStyle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} IconButtonProps={{ edge: 'start' }}>
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
