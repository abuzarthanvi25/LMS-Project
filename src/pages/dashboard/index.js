import { Box } from '@mui/material'
import CourseCardList from '../../@core/custom-components/course/course-list'
import { connect } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { get } from 'lodash'
import { ROLES } from 'src/configs/role-constants'
import { getAllCoursesRequest, getCoursesStudentRequest } from 'src/store/reducers/courseReducer'
import { getTeacherStatisticsRequest, getAdminStatisticsRequest } from 'src/store/reducers/dashboardReducer'
import { bindActionCreators, unwrapResult } from '@reduxjs/toolkit'
import { showFaliureToast } from 'src/configs/app-toast'
import CustomModal from 'src/@core/custom-components/modals/custom-modal'
import PaymentForm from 'src/@core/custom-components/payment/payment-form'
import TeacherStatistics from 'src/@core/custom-components/dashboard/teacher-statistics'
import AdminStatistics from 'src/@core/custom-components/dashboard/admin-statistics'
import PaymentSummary from 'src/@core/custom-components/payment/payment-summary'

const Dashboard = ({
  userDetails,
  courseList,
  getAllCoursesRequest,
  getCoursesStudentRequest,
  teacherStatistics,
  getTeacherStatisticsRequest,
  getAdminStatisticsRequest,
  adminStatistics
}) => {
  const Role = get(userDetails, 'data.role', '')
  const token = get(userDetails, 'token', null)

  const [courseListLocal, setCourseListLocal] = useState([])
  const [teacherStatisticsLocal, setTeacherStatisticsLocal] = useState(null)
  const [adminStatisticsLocal, setAdminStatisticsLocal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [courseToPayDetails, setCourseToPayDetails] = useState(null)
  const [isFreeCourse, setIsFreeCourse] = useState(false)
  const [stepFunctions, setStepFunctions] = useState(null)

  useEffect(() => {
    if (!!courseList?.length) {
      setCourseListLocal(courseList)
    }
  }, [courseList])

  useEffect(() => {
    if (teacherStatistics) {
      setTeacherStatisticsLocal(teacherStatistics)
    }
  }, [teacherStatistics])

  useEffect(() => {
    if (adminStatistics) {
      setAdminStatisticsLocal(adminStatistics)
    }
  }, [adminStatistics])

  useEffect(() => {
    handleGetAllCourses()
    handleGetTeacherStatistics()
    handleGetAdminStatistics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetEnrolledCourses = () => {
    try {
      if (token && Role == ROLES.student) {
        getCoursesStudentRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetTeacherStatistics = () => {
    try {
      if (token && Role == ROLES.teacher) {
        getTeacherStatisticsRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetAdminStatistics = () => {
    try {
      if (token && Role == ROLES.admin) {
        getAdminStatisticsRequest({ token })
          .then(unwrapResult)
          .then(() => setLoading(false))
          .catch(error => {
            showFaliureToast(error?.response?.data?.message)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEnrollStudent = courseDetails => {
    const price = get(courseDetails, 'price', null)
    if (price !== null && price === 0) {
      setIsFreeCourse(true)
    }
    setCourseToPayDetails(courseDetails)
  }

  const handleGetResponseCourses = () => {
    handleGetEnrolledCourses()
    handleGetAllCourses()
  }

  const handleRenderDashboardContent = (role = '') => {
    switch (role) {
      case ROLES.student:
        return (
          <CourseCardList
            actionTitle={'Enroll Now'}
            handleAction={handleEnrollStudent}
            courseList={courseListLocal}
            loading={loading}
          />
        )

      case ROLES.teacher:
        return <TeacherStatistics loading={loading} statistics={teacherStatisticsLocal} />

      case ROLES.admin:
        return <AdminStatistics loading={loading} statistics={adminStatisticsLocal} />

      default:
        return <></>
    }
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <CustomModal
        heading={'Course Payment'}
        open={courseToPayDetails ? true : false}
        onClose={() => {
          setCourseToPayDetails(null)
          setIsFreeCourse(false)
        }}
      >
        {isFreeCourse ? (
          <PaymentSummary
            onClose={() => {
              setCourseToPayDetails(null)
              setIsFreeCourse(false)
            }}
            handleGetAllCourses={handleGetResponseCourses}
            handleNextStep={() => {}}
            cardDetails={{}}
            details={courseToPayDetails}
            isFreeCourse={isFreeCourse}
          />
        ) : (
          <PaymentForm
            handleGetAllCourses={handleGetResponseCourses}
            onClose={() => setCourseToPayDetails(null)}
            details={courseToPayDetails}
          />
        )}
      </CustomModal>
      {handleRenderDashboardContent(Role)}
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    courseList: state.courses.allCourses,
    userDetails: state.auth.userDetails,
    teacherStatistics: state.dashboard.teacherStatistics,
    adminStatistics: state.dashboard.adminStatistics
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllCoursesRequest,
      getTeacherStatisticsRequest,
      getAdminStatisticsRequest,
      getCoursesStudentRequest
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
