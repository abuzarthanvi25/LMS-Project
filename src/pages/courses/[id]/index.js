import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardContent } from '@mui/material'
import CourseDetailsComponent from 'src/@core/custom-components/course/course-details'

const CourseDetails = ({ courseList }) => {
  const router = useRouter()
  const [courseDetails, setCourseDetails] = useState(null)
  const id = router?.query?.id

  useEffect(() => handleGetCourseDetails(courseList), [id])

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
        <CourseDetailsComponent id={id} courseDetails={courseDetails} courseList={courseList} />
      </CardContent>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    courseList: state.courses.allCourses
  }
}

export default connect(mapStateToProps, null)(CourseDetails)
