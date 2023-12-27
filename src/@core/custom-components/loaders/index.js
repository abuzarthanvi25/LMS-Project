import React from 'react'
import { styled } from '@mui/system'
import { CircularProgress, Backdrop } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.primary.main
}))

console.log('a')

const FullPageLoader = ({ isLoading }) => {
  return (
    <div
      style={{
        height: '97vh',
        width: '97vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress size={100} />
    </div>
  )
}

FullPageLoader.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default FullPageLoader
