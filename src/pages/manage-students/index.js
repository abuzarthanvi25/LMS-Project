import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { getAllStudentsRequest } from '../../store/reducers/adminReducer'
import { connect } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { showFaliureToast } from 'src/configs/app-toast'
import CustomTable from '../../@core/custom-components/custom-tables'

const ManageStudents = ({ getAllStudentsRequest, studentsList, token }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleGetStudentsList()
  }, [])

  const columns = [
    {
      label: 'Full Name',
      dataLabel: 'fullName'
    },
    {
      label: 'Email Address',
      dataLabel: 'emailAddress'
    },
    {
      label: 'Created At',
      dataLabel: 'createdAt'
    },
    {
      label: 'Updated At',
      dataLabel: 'updatedAt'
    }
  ]

  const handleGetStudentsList = () => {
    try {
      if (token) {
        setLoading(true)
        getAllStudentsRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => showFaliureToast(error?.response?.data?.message))
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Box>
        <Grid container>
          <Grid sx={{ padding: '12px 28px' }} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography variant='h4'>All Students</Typography>
          </Grid>
          <Grid item md={12}>
            <CustomTable columns={columns} isLoading={loading} rows={studentsList} />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.userDetails?.token,
    studentsList: state.admin.studentsList,
    rehydrated: state._persist.rehydrated
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllStudentsRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudents)
