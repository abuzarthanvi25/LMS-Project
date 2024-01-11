import { Box, Grid, Typography, Card } from '@mui/material'
import CourseCardList from '../../@core/custom-components/course/course-list'
import { connect } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { get } from 'lodash'
import { ROLES } from 'src/configs/role-constants'
import { getAllCoursesRequest } from 'src/store/reducers/courseReducer'
import { unwrapResult } from '@reduxjs/toolkit'
import { showFaliureToast } from 'src/configs/app-toast'
import CustomModal from "src/@core/custom-components/modals/custom-modal"
import PaymentForm from 'src/@core/custom-components/payment/payment-form'

const Dashboard = ({ userDetails, courseList }) => {
  const Role = get(userDetails, 'data.role', '');
  const token = get(userDetails, 'token', null);

  const [courseListLocal, setCourseListLocal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseToPayDetails, setCourseToPayDetails] = useState(null)

  useEffect(() => {
    if (!!courseList.length) {
      setCourseListLocal(courseList);
    }
  }, [courseList])

  useEffect(() => {
    handleGetAllCourses();
  }, [Role])

  const handleGetAllCourses = () => {
    try {
      if (token && Role == ROLES.student) {
        getAllCoursesRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
          })
      }
    } catch (error) { }
  }

  const handleEnrollStudent = (courseDetails) => {
    setCourseToPayDetails(courseDetails)
  }


  const handleRenderDashboardContent = (role = '') => {
    switch (role) {
      case ROLES.student:
        return (
          <CourseCardList handleEnroll={handleEnrollStudent} courseList={courseListLocal} loading={loading} />
        )
      case ROLES.teacher:
        return <></>
      case ROLES.admin:
        return <></>
      default:
        return <></>
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <CustomModal open={courseToPayDetails ? true : false} onClose={() => setCourseToPayDetails(null)}>
        <PaymentForm onClose={() => setCourseToPayDetails(null)} details={courseToPayDetails} />
      </CustomModal>
      {handleRenderDashboardContent(Role)}
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    courseList: state.courses.allCourses,
    userDetails: state.auth.userDetails
  }
}

export default connect(mapStateToProps, null)(Dashboard)
