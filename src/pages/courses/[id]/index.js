import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardContent } from '@mui/material'
import CourseDetailsComponent from 'src/@core/custom-components/course/course-details'
import { get } from 'lodash'
import { ROLES } from 'src/configs/role-constants'
import { removeDuplicatesById } from 'src/@core/utils/helpers'

const CourseDetails = ({ courseList, allCoursesAdmin, userDetails }) => {
  const router = useRouter()
  const [courseDetails, setCourseDetails] = useState(null)
  const id = router?.query?.id
  const Role = get(userDetails, 'data.role', '')

  const handleList = () => {
    if (!Role) return removeDuplicatesById(courseList)

    if (Role == ROLES.student) {
      return removeDuplicatesById(courseList)
    }

    if (Role == ROLES.admin) {
      return removeDuplicatesById(allCoursesAdmin)
    }
  }

  useEffect(() => handleGetCourseDetails(handleList()), [id])

  const handleGetCourseDetails = courseList => {
    if (!id || !courseList) return null

    const course = courseList.find(course => course?._id == id)
    if (course) {
      setCourseDetails(course)
    }

    return null
  }

  return (
    <Card>
      <CardContent>
        <CourseDetailsComponent id={id} courseDetails={courseDetails} courseList={handleList()} />
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    courseList: state.courses.allCoursesStudent,
    allCoursesAdmin: state.courses.allCoursesAdmin,
    userDetails: state.auth.userDetails
  }
}

export default connect(mapStateToProps, null)(CourseDetails)
