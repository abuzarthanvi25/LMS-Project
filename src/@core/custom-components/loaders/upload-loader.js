import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CircularProgress, Grid, Paper, Typography } from '@mui/material'

const texts = ['Uploading Course...', 'Please wait...', 'Almost there...']

const CustomLoader = ({ loadingTexts = texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prevIndex => (prevIndex + 1) % loadingTexts.length)
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [loadingTexts])

  return (
    <Paper
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh' // Set minimum height to 100% of the viewport height
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={5}>
          <Grid
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            item
            xs={12}
            sm={6}
            md={6}
            lg={12}
            xl={12}
          >
            <CircularProgress size={180} color='secondary' />
          </Grid>
          <Grid
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
            item
            xs={12}
            sm={6}
            md={6}
            lg={12}
            xl={12}
          >
            <Typography
              variant='body3'
              component={'p'}
              style={{ marginTop: 16, fontSize: '48px', textAlign: 'center' }}
            >
              {loadingTexts[currentTextIndex]}
            </Typography>
          </Grid>
        </Grid>
      </motion.div>
    </Paper>
  )
}

export default CustomLoader
