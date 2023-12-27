import React from 'react'
import { styled } from '@mui/system'
import { CircularProgress, Backdrop } from '@mui/material'

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.primary.main
}))

const FullPageLoader = ({ isLoading }) => {
  return (
    <StyledBackdrop open={isLoading}>
      <CircularProgress size={100} />
    </StyledBackdrop>
  )
}

export default FullPageLoader
