import { Box, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { getAllTeachersRequest, verifyTeacherRequest } from '../../store/reducers/adminReducer'
import { connect } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { showFaliureToast, showSuccessToast } from 'src/configs/app-toast'
import CustomTable from '../../@core/custom-components/custom-tables'
import RoleDetails from 'src/@core/custom-components/role-details'

const ManageTeachers = ({ getAllTeachersRequest, verifyTeacherRequest, teachersList, token }) => {
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState(null)

  useEffect(() => {
    handleGetTeachersList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      label: 'Education',
      dataLabel: 'education'
    },
    {
      label: 'Subject',
      dataLabel: 'subject'
    },
    {
      label: 'Is Verified',
      dataLabel: 'isVerified'
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

  const handleGetTeachersList = () => {
    try {
      if (token) {
        setLoading(true)
        getAllTeachersRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
            setLoading(false)
          })
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleApprove = details => {
    try {
      if (token) {
        setLoading(true)
        verifyTeacherRequest({ token, id: details.id })
          .then(unwrapResult)
          .then(res => {
            showSuccessToast(res?.data?.message)
            handleGetTeachersList()
            setLoading(false)
          })
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
            setLoading(false)
          })
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Box>
        <RoleDetails
          details={details}
          open={details && !loading ? true : false}
          onClose={() => setDetails(null)}
          onApprove={() => handleApprove(details)}
          loading={loading}
        />
        <Grid container>
          <Grid sx={{ padding: '12px 28px' }} item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Typography variant='h4'>All Teachers</Typography>
          </Grid>
          <Grid item sm={12} xs={12} md={12} lg={12} xl={12}>
            <CustomTable
              onClickRow={row => {
                if(!row?.isVerified){
                  setDetails({
                    id: row._id,
                    fullName: row.fullName,
                    emailAddress: row.emailAddress,
                    role: row.role,
                    education: row.education,
                    subject: row.subject,
                    isVerified: row.isVerified,
                    createdAt: new Date(row.createdAt).toDateString(),
                    updatedAt: new Date(row.updatedAt).toDateString()
                  })
                }
              }
              }
              columns={columns}
              isLoading={loading}
              rows={teachersList}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.userDetails?.token,
    teachersList: state.admin.teachersList,
    rehydrated: state._persist.rehydrated
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllTeachersRequest,
      verifyTeacherRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeachers)
